<template>
  <el-container class="box-container">
    <el-aside class="box-aside">
      <el-card class="box-card">
        <el-avatar :size="200" :src="userInfo.picUrl" :alt="'还未上传头像~'"></el-avatar>
      </el-card>
    </el-aside>
    <el-main class="box-main">
      <el-card class="box-card-main">
        <el-descriptions
            class="margin-top"
            title="我的信息"
            :column="1"
            :size="'large'"
            border
        >
          <template #extra>
            <el-button type="primary" @click="flashData">
              <el-icon :size="20">
                <Loading/>
              </el-icon>
              刷 新
            </el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user/>
                </el-icon>
                昵称
              </div>
            </template>
            {{ userInfo.nickName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Message/>
                </el-icon>
                邮箱
              </div>
            </template>
            {{ userInfo.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Coin/>
                </el-icon>
                年龄
              </div>
            </template>
            <el-tag size="large">{{ userInfo.age }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Clock/>
                </el-icon>
                注册时间
              </div>
            </template>
            <el-tag size="large">{{ userInfo.createTime }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <MoreFilled/>
                </el-icon>
                个性签名
              </div>
            </template>
            {{ userInfo.describe }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {getUserInfoByIdApi, headerPicUploadApi} from "@/api/mk-user-api";
import {ElNotification} from "element-plus";
import {Result, StorageTokenStr} from "@/utils/CommonValidators";
import {GetUserByIdDTO, updateUserInfo, UserInfo} from "@/utils/UserValidators";

export default {
  name: "UserInfoById",
  props: {
    userId:{
      type:String,
      require:true,
    }
  },
  setup(props:any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const dialogFormVisible = ref(false);
    const userInfo = ref<UserInfo>({
      nickName: '',
      describe: '',
      age: 0,
      createTime: '',
      email: '',
      picUrl: null
    })
    const userIdDTO=ref<GetUserByIdDTO>({
      userId: ""
    })
    onMounted(() => {
      getUserInfo();
    })
    const getUserInfo = () => {
      userIdDTO.value.userId=props.userId;
      proxy.$axios.post(getUserInfoByIdApi,userIdDTO.value )
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '查询成功~',
                type: 'success',
              })
              let info = res.data.data;
              userInfo.value.createTime = info.createTime;
              mkUserUpdate.value.email = userInfo.value.email = info.email;
              mkUserUpdate.value.nickName = userInfo.value.nickName = info.nickName;
              mkUserUpdate.value.describe = userInfo.value.describe = info.describe;
              userInfo.value.picUrl = info.picUrl;
              mkUserUpdate.value.age = userInfo.value.age = res.data.data.age;
            }
          })
    }
    const flashData = () => {
      getUserInfo();
    }
    const uploadPicError = () => {
      ElNotification({
        title: 'Error',
        message: '上传头像失败~',
        type: 'error',
      })
    }
    const headerPic = ref({
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem(StorageTokenStr)
    })
    const mkUserUpdate = ref<updateUserInfo>({
      age: 0,
      oldPassword: "",
      describe: "",
      checkPass: "",
      password: "",
      email: "",
      nickName: "",
      flag: 0
    })
    return {
      userInfo,
      flashData,
      headerPicUploadApi,
      headerPic,
      uploadPicError,
      dialogFormVisible,
      mkUserUpdate
    };
  }
}
</script>

<style scoped>
.box-aside {
  position: relative;
  width: 250px;
  overflow: hidden;
  height: 100%;
}

.box-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box-main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
}

.margin-top {
  position: relative;
  width: 70%;
  height: 70%;
}

.box-card-main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.box-card {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>