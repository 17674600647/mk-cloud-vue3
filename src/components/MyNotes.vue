<template>
  <div style="position: relative;height:100%">
    <el-scrollbar style="height: calc(100% - 70px)">
      <el-table :data='tableData' height="600px" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="文章识别ID" width="200">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间">
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
import {getNotesApi} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {GetNotesDTO} from "@/utils/NotesValidatoes";

export default {
  name: "MyNotes",
  components: {},
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const tableData = ref()
    const total = ref()
    const background = ref(true)
    const currentPage = ref(1)
    const noteDto = ref<GetNotesDTO>({
      currentPage: 10,
      pageSize: 1
    })
    const handleSizeChange = (val: number) => {
      proxy.handleCurrentChange(noteDto.value.currentPage);
    }
    const handleCurrentChange = (val: number) => {
      noteDto.value.currentPage = val;
      noteDto.value.pageSize = pageSize.value;
      console.log("开始查询:")
      console.log(noteDto.value)
      proxy.$axios.post(getNotesApi, noteDto.value)
          .then((res: Result) => {
            //保存成功
            if (res.data.code == 200) {
              proxy.tableData = res.data.data.noteList;
              proxy.total = res.data.data.total;
              proxy.$message({
                message: "查询成功",
                type: "success"
              });
            }
          })
    }
    const pageSize = ref(10)
    onMounted(() => {
      console.log("初始化查询数据..")
      proxy.handleCurrentChange(1);
    })

    return {tableData, handleCurrentChange, background, pageSize, currentPage,handleSizeChange,total};
  }
}
</script>

<style scoped>

</style>