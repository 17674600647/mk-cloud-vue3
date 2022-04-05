<template>
  <div style="position: relative;height:100%;width: 100%;float: left">
    <div style="position: relative;width: 100%;margin-right: 0px;height: 50px;" >
      <el-select v-model="userPageDTO.status" class="m-2" placeholder="选择帐号状态~" style="margin-left: 16px;float: right"
                 @change="handleSizeChange">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div style="width: 300px;float: right">
        <el-input
            v-model="userPageDTO.content"
            placeholder="搜索昵称或者用户名或者邮箱"
            class="input-with-select"
        >
          <template #append>
            <el-button :icon="Search" @click="searchByKeyword()"/>
          </template>
        </el-input>
      </div>
    </div>

    <el-scrollbar style="height: calc(100% - 110px);width: 100%" >
      <el-table :data='tableData' >
        <el-table-column type="index" label="序号" width="120"/>
        <el-table-column type="id" prop="id" label="用户ID" width="200"/>
        <el-table-column prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <div v-show="scope.row.status==0">
              <el-tag size="small" type="warning" plain>
                冻结
              </el-tag>
            </div>
            <div v-show="scope.row.status==1">
              <el-tag size="small" type="success" plain>
                正常
              </el-tag>
            </div>
            <div v-show="scope.row.status==-1">
              <el-tag size="small" type="danger" plain>
                封禁
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="管理" width="200">
          <template #default="scope">
             <span v-show="scope.row.status==-1||scope.row.status==0">
              <el-button type="success" size="small" @click="handleNormal(scope.$index, scope.row)">恢复正常</el-button>
            </span>
            <span v-show="scope.row.status==1">
              <el-button type="warning" size="small" @click="handleFreeze(scope.$index, scope.row)">冻结</el-button>
            </span>
            <span v-show="scope.row.status==1||scope.row.status==0" style="margin-left: 10px">
              <el-button type="danger" size="small" @click="handleDisabled(scope.$index, scope.row)">封禁</el-button>
           </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看
            </el-button>
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
        @size-change="handleSizeChange(1)"
    >
    </el-pagination>
  </div>
  <el-drawer v-model="drawerFlag" title="用户信息" :with-header="false" :show-close="true" size="40%"
             :destroy-on-close="true">
    <UserInfoById :user-id="userId"></UserInfoById>
  </el-drawer>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {shareOneNoteApi} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {GetOneNoteDTO} from "@/utils/NotesValidatoes";
import {useRouter} from "vue-router";
import {Search} from '@element-plus/icons-vue'
import {ElNotification} from "element-plus";
import {GetUserPageDTO, UpdateStatusDTO} from "@/utils/UserValidators";
import {getAllUsersByStatusApi, updateUserStatusApi} from "@/api/mk-user-api";
import UserInfoById from "@/components/admin/manage/UserInfoById.vue";

export default {
  name: "MyNotes",
  components: {
    UserInfoById
  },
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter()
    const tableData = ref()
    const total = ref()
    const background = ref(true)
    const currentPage = ref(1)
    const drawerFlag = ref(false)
    const userPageDTO = ref<GetUserPageDTO>({
      status: 2,
      currentPage: 10,
      content: "",
      pageSize: 1
    })

    const handleSizeChange = (val: number) => {
      handleCurrentChange(1);
    }
    const handleCurrentChange = (val: number) => {
      userPageDTO.value.currentPage = val;
      userPageDTO.value.pageSize = pageSize.value;
      console.log("开始查询:")
      console.log(userPageDTO.value)
      proxy.$axios.post(getAllUsersByStatusApi, userPageDTO.value)
          .then((res: Result) => {
            if (res.data.code == 200) {
              proxy.tableData = res.data.data.noteList;
              proxy.total = res.data.data.total;
            }
          })
    }
    const pageSize = ref(10)
    const userId = ref()

    const handleEdit = (index: number, row: any) => {
      console.log(index, row.id)
      proxy.drawerFlag = true;
      proxy.userId = row.id;
    }
    /**
     * 冻结
     * @param index
     * @param row
     */
    const handleFreeze = (index: number, row: any) => {
      ChangeStatus(index, row, 0);
    }
    /**
     * disabled禁用
     * @param index
     * @param row
     */
    const handleDisabled = (index: number, row: any) => {
      ChangeStatus(index, row, -1);
    }
    /**
     * 恢复normal
     * @param index
     * @param row
     */
    const handleNormal = (index: number, row: any) => {
      ChangeStatus(index, row, 1);
    }
    const searchByKeyword = () => {
      userPageDTO.value.currentPage=1;
      handleCurrentChange(userPageDTO.value.currentPage);
    }

    const ChangeStatus = (index: number, row: any, status: number) => {
      console.log(index, row)
      const updateDTO = ref<UpdateStatusDTO>({
        status: 0,
        userId: ""
      })
      updateDTO.value.userId = row.id;
      updateDTO.value.status = status;
      proxy.$axios.post(updateUserStatusApi, updateDTO.value)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '操作成功~',
                type: 'success',
              })
              handleCurrentChange(userPageDTO.value.currentPage);
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
              handleCurrentChange(userPageDTO.value.currentPage);
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
    const options = [{label: '封禁', value: -1},
      {label: '冻结', value: 0},
      {label: '正常', value: 1},
      {label: '全部', value: 2}];
    onMounted(() => {
      console.log("初始化查询数据..")
      proxy.handleCurrentChange(1);
    })
    return {
      handleFreeze,
      handleDisabled,
      handleNormal,
      options,
      userPageDTO,
      tableData,
      handleCurrentChange,
      background,
      pageSize,
      currentPage,
      handleSizeChange,
      total,
      handleEdit,
      handleShare,
      showShareBtn,
      drawerFlag,
      userId,
      Search,
      searchByKeyword
    };
  }
}
</script>

<style scoped>

</style>