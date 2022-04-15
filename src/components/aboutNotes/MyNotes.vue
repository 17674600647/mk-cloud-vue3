<template>
  <div style="position: relative;height:100%">
    <el-select v-model="noteDto.noteTypeId" class="m-2" placeholder="选择文章分类" style="margin-right: 16px"
               @change="selectBtn()">
      <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.id"
      />
    </el-select>
    <br>
    <br>
    <el-scrollbar style="height: calc(100% - 70px)">
      <el-table :data='tableData'>
        <el-table-column type="index" label="序号" width="70"/>
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column prop="shareStatus" label="分享状态" width="100">
          <template #default="scope">
            <div v-show="scope.row.shareStatus==-1">
              <el-button size="small" @click="handleShare(scope.$index, scope.row)" type="primary">
                去分享
              </el-button>
            </div>
            <div v-show="scope.row.shareStatus==1">
              <el-button size="small" type="success">
                已分享
              </el-button>
            </div>
            <div v-show="scope.row.shareStatus==0">
              <el-button size="small" type="warning">
                待审核
              </el-button>
            </div>
            <div v-show="scope.row.shareStatus==2">
              <el-button size="small" type="danger" @click="handleShare(scope.$index, scope.row)">
                重新提交
              </el-button>
            </div>
          </template>
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
import {deleteOneNoteApi, getNotesApi, getNoteTypeApi, getOneNoteApi, shareOneNoteApi} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {GetNotesDTO, GetNotesDTO2, GetOneNoteDTO} from "@/utils/NotesValidatoes";
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
    const noteDto = ref<GetNotesDTO2>({
      currentPage: 10,
      noteTypeId: "2314324231234",
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
      handleCurrentChange(1);
      queryNoteTypes()
    })
    const handleEdit = (index: number, row: any) => {
      console.log(index, row.id)
      let routeData = router.resolve({
        path: '/menu/BrowseNotes',
        query: {
          noteId: row.id,
        }
      })
      window.open(routeData.href, '_blank')
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
    const handleShare = (index: number, row: any) => {
      console.log(index, row)
      const getOneNoteDTO = ref<GetOneNoteDTO>({
        noteId: row.id
      })
      proxy.$axios.post(shareOneNoteApi, getOneNoteDTO.value)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '分享申请已经提交~，待审核~',
                type: 'success',
              })
              handleCurrentChange(noteDto.value.currentPage);
            }
          })
    }
    const options = ref([])
    const queryNoteTypes = () => {
      proxy.$axios.post(getNoteTypeApi)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              proxy.options = res.data.data
            }
          })
    }
    const selectBtn = () => {
      handleCurrentChange(1);
    }
    const showShareBtn = (status: any) => {
      if (status == 1) {
        return false;
      }
      if (status == 0) {
        return false;
      }
      if (status == -1) {
        return true;
      }

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
      handleDelete,
      handleShare,
      showShareBtn,
      options,
      noteDto,
      selectBtn
    };
  }
}
</script>

<style scoped>

</style>