<template>
  <div style="position: relative;height:100%">
    <el-select v-model="noteDto.shareStatus" class="m-2" placeholder="选择帐号状态~" style="margin-right: 16px"
               @change="handleShareStatusChange">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-scrollbar style="height: calc(100% - 70px)">
      <el-table :data='tableData'> stripe>
        <el-table-column type="index" label="序号" width="70"/>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column prop="shareStatus" label="分享状态" width="100">
          <template #default="scope">
            <div v-show="scope.row.shareStatus==-1">
              <el-tag size="small" type="info">
                未分享
              </el-tag>
            </div>
            <div v-show="scope.row.shareStatus==1">
              <el-tag size="small" type="success">
                已分享
              </el-tag>
            </div>
            <div v-show="scope.row.shareStatus==0">
              <el-tag size="small" type="warning">
                待审核
              </el-tag>
            </div>
            <div v-show="scope.row.shareStatus==2">
              <el-tag size="small" type="danger">
                审核未通过
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >查看
            </el-button>
            </span>
            <span v-show="showDeleteBtn" style="margin-left: 10px">
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
            </span>
            <span v-show="!showDeleteBtn" style="margin-left: 10px">
              <el-popconfirm
                  confirm-button-text=" 恢 复 "
                  cancel-button-text=" 取 消 "
                  icon-color="red"
                  title="是否恢复?"
                  @confirm="handleRecover(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button
                      size="small"
                      type="primary"
                  >恢 复
                  </el-button>
                </template>
              </el-popconfirm>
            </span>
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
  <el-drawer v-model="drawerFlag" title="用户信息" :with-header="false" :show-close="true" size="40%"
             :destroy-on-close="true">
    <div style="width: 100%;height: calc(100% - 70px)">
      <MdEditorDrawer :note-id="browseNoteId"></MdEditorDrawer>
    </div>
    <span><el-button type="success" @click="updateNoteShareStatus(1)">审核通过</el-button></span>
    <span style="margin-left: 10px"><el-button type="danger" @click="updateNoteShareStatus(2)">审核失败</el-button></span>
  </el-drawer>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {
  adminDeleteOneApi,
  adminRecoverOneApi,
  getNotesByStatusApi,
  shareOneNoteApi,
  updateNoteStatusApi
} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {GetNotesByShareStatusDTO, GetOneNoteDTO, UpdateNoteStatusDTO} from "@/utils/NotesValidatoes";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import MdEditorDrawer from "@/components/admin/manage/MdEditorDrawer.vue";

export default {
  name: "MyNotes",
  components: {MdEditorDrawer},
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter()
    const tableData = ref()
    const total = ref()
    const background = ref(true)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const browseNoteId = ref()
    const showDeleteBtn = ref(true)
    const noteDto = ref<GetNotesByShareStatusDTO>({
      currentPage: 1,
      shareStatus: 3,
      pageSize: 10
    })
    const drawerFlag = ref(false)

    const handleShareStatusChange = (val: any) => {
      handleCurrentChange(1);
      if (noteDto.value.shareStatus == -2) {
        proxy.showDeleteBtn = false;
      } else {
        proxy.showDeleteBtn = true;
      }
    }

    const handleSizeChange = (val: number) => {
      handleCurrentChange(1);
      if (noteDto.value.shareStatus == -2) {
        proxy.showDeleteBtn = false;
      } else {
        proxy.showDeleteBtn = true;
      }
    }
    const handleCurrentChange = (val: number) => {
      noteDto.value.currentPage = val;
      noteDto.value.pageSize = pageSize.value;
      console.log("=-===============================页面：" + val)
      proxy.$axios.post(getNotesByStatusApi, noteDto.value)
          .then((res: Result) => {
            if (res.data.code == 200) {
              proxy.tableData = res.data.data.noteList;
              proxy.total = res.data.data.total;
            }
          })
    }
    onMounted(() => {
      console.log("初始化查询数据..")
      proxy.handleCurrentChange(1);
    })
    const handleEdit = (index: number, row: any) => {
      console.log(index, row.id)
      proxy.drawerFlag = true;
      proxy.browseNoteId = row.id;
    }
    /**
     * 恢复一篇文章
     * @param index
     * @param row
     */
    const handleRecover = (index: number, row: any) => {
      console.log(index, row)
      const getOneNoteDTO = ref<GetOneNoteDTO>({
        noteId: row.id
      })
      proxy.$axios.post(adminRecoverOneApi, getOneNoteDTO.value)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '恢复成功~',
                type: 'success',
              })
              handleCurrentChange(noteDto.value.currentPage);
            }
          })
    }
    const handleDelete = (index: number, row: any) => {
      console.log(index, row)
      const getOneNoteDTO = ref<GetOneNoteDTO>({
        noteId: row.id
      })
      proxy.$axios.post(adminDeleteOneApi, getOneNoteDTO.value)
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
    const options = [
      {label: '已删除', value: -2},
      {label: '未分享', value: -1},
      {label: '待审核', value: 0},
      {label: '已分享', value: 1},
      {label: '未通过', value: 2},
      {label: '全 部', value: 3}];
    const updateNoteShareStatus = (status: number) => {
      const updateStatusDTO = ref<UpdateNoteStatusDTO>({
        noteId: "",
        shareStatus: 0
      })
      updateStatusDTO.value.noteId = proxy.browseNoteId;
      updateStatusDTO.value.shareStatus = status;
      proxy.$axios.post(updateNoteStatusApi, updateStatusDTO.value)
          .then((res: Result) => {
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '审核完成~',
                type: 'success',
              })
              proxy.drawerFlag=false;
              handleCurrentChange(noteDto.value.currentPage);
            }
          })
    }
    return {
      updateNoteShareStatus,
      noteDto,
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
      drawerFlag,
      browseNoteId,
      showDeleteBtn,
      handleShareStatusChange,
      handleRecover
    };
  }
}
</script>

<style scoped>

</style>