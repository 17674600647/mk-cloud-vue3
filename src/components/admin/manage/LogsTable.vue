<template>
  <div style="position: relative;height:100%;width: 100%;float: left">
    <div style="position: relative;width: 100%;margin-right: 0px;height: 50px;" >
      <el-select v-model="logsDTO.level" class="m-2" placeholder="选择帐号状态~" style="margin-left: 16px;float: right"
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
            v-model="logsDTO.keyWords"
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
      <el-table :data='tableData'>
        <el-table-column type="index" label="序号" width="70"/>
        <el-table-column prop="userId" label="操作的用户ID" ></el-table-column>
        <el-table-column prop="actionMark" label="操作标记" ></el-table-column>
        <el-table-column prop="createTime" label="操作时间" ></el-table-column>
        <el-table-column prop="level" label="操作敏感度" >
          <template #default="scope">
            <div v-show="scope.row.level==1">
              <el-tag size="small" type="success" plain>
                低
              </el-tag>
            </div>
            <div v-show="scope.row.level==2">
              <el-tag size="small" type="warning" plain>
                中
              </el-tag>
            </div>
            <div v-show="scope.row.level==3">
              <el-tag size="small" type="danger" plain>
                高
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="actionMsg" label="操作描述" ></el-table-column>
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
import {queryLogsApi} from "@/api/mk-other-api";
import {LogsDTO} from "@/utils/LogsValidators";

export default {
  name: "LogsTable",
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
    const logsDTO = ref<LogsDTO>({
      currentPage: 1,
      level: 0,
      keyWords: "",
      pageSize: 20
    })

    const handleSizeChange = (val: number) => {
      handleCurrentChange(1);
    }
    const handleCurrentChange = (val: number) => {
      logsDTO.value.currentPage = val;
      logsDTO.value.pageSize = pageSize.value;
      console.log("开始查询:")
      console.log(logsDTO.value)
      proxy.$axios.post(queryLogsApi, logsDTO.value)
          .then((res: Result) => {
            if (res.data.code == 200) {
              proxy.tableData = res.data.data.logList;
              proxy.total = res.data.data.total;
            }
          })
    }
    const pageSize = ref(20)
    const searchByKeyword = () => {
      logsDTO.value.currentPage=1;
      handleCurrentChange(logsDTO.value.currentPage);
    }
    const options = [
      {label: '全部', value: 0},
      {label: '低', value: 1},
      {label: '中', value: 2},
      {label: '高', value: 3}
    ];
    onMounted(() => {
      console.log("初始化查询数据..")
      proxy.handleCurrentChange(1);
    })
    return {
      options,
      logsDTO,
      tableData,
      handleCurrentChange,
      background,
      pageSize,
      currentPage,
      handleSizeChange,
      total,
      Search,
      searchByKeyword
    };
  }
}
</script>

<style scoped>

</style>