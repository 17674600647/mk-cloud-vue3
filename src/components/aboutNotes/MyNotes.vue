<template>
  <div style="position: relative;height:100%">
    <el-scrollbar style="height: calc(100% - 70px)">
      <el-table :data='tableData' > stripe>
        <el-table-column type="index" label="序号" width="70"/>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看
            </el-button>
            <el-popconfirm
                confirm-button-text=" 删 除 "
                cancel-button-text=" 取 消 "
                icon-color="red"
                title="是否删除?"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="background"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {deleteOneNoteApi, getNotesApi, getOneNoteApi} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {GetNotesDTO, GetOneNoteDTO} from "@/utils/NotesValidatoes";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";

export default {
  name: "MyNotes",
  components: {},
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter()
    const tableData = ref()
    const total = ref()
    const background = ref(true)
    const currentPage = ref(1)
    const noteDto = ref<GetNotesDTO>({
      currentPage: 10,
      pageSize: 1
    })
    const handleSizeChange = (val: number) => {
      handleCurrentChange(1);
    }
    const handleCurrentChange = (val: number) => {
      noteDto.value.currentPage = val;
      noteDto.value.pageSize = pageSize.value;
      console.log("开始查询:")
      console.log(noteDto.value)
      proxy.$axios.post(getNotesApi, noteDto.value)
          .then((res: Result) => {
            if (res.data.code == 200) {
              proxy.tableData = res.data.data.noteList;
              proxy.total = res.data.data.total;
            }
          })
    }
    const pageSize = ref(10)
    onMounted(() => {
      console.log("初始化查询数据..")
      proxy.handleCurrentChange(1);
    })
    const handleEdit = (index: number, row: any) => {
      console.log(index, row.id)
      router.push({
            //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
            path: '/menu/BrowseNotes',
            query: {
              noteId: row.id
            }
          }
      );
    }
    const handleDelete = (index: number, row: any) => {
      console.log(index, row)
      const getOneNoteDTO = ref<GetOneNoteDTO>({
        noteId: row.id
      })
      proxy.$axios.post(deleteOneNoteApi, getOneNoteDTO.value)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '删除成功~',
                type: 'success',
              })
              handleCurrentChange(noteDto.value.currentPage);
            }
          })

    }
    return {
      tableData,
      handleCurrentChange,
      background,
      pageSize,
      currentPage,
      handleSizeChange,
      total,
      handleEdit,
      handleDelete
    };
  }
}
</script>

<style scoped>

</style>