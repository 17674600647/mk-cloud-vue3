<template>
  <el-container class="box-container">
    <el-aside class="box-aside">
      <el-card class="box-card">
        <el-avatar :size="200" :src="userInfo.picUrl" :alt="'还未上传头像~'"></el-avatar>
        <div style="width:100%;" align="center">

          <el-upload
              :action="headerPicUploadApi"
              :show-file-list="false"
              :auto-upload="true"
              :on-success="uploadPicSuccess"
              :on-error="uploadPicError"
              :headers="headerPic"
              :before-upload="beforeUpload"
              :name="'file'"
          >
            <el-button size="small" @click="">
              <el-icon :size="15">
                <edit/>
              </el-icon>
              更换头像
            </el-button>
          </el-upload>
        </div>
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
import {getUserInfoApi, headerPicUploadApi} from "@/api/mk-user-api";
import {ElNotification} from "element-plus";
import {Result, StorageTokenStr} from "@/utils/CommonValidators";
import {UserInfo} from "@/utils/UserValidators";
import {picUploadApi} from "@/api/mk-other-api";


export default {
  name: "UserInfo",
  setup() {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const userInfo = ref<UserInfo>({
      nickName: '',
      describe: '',
      age: 0,
      createTime: '',
      email: '',
      picUrl: null
    })
    onMounted(() => {
      getUserInfo();
    })
    const getUserInfo = () => {
      proxy.$axios.post(getUserInfoApi, null)
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
              userInfo.value.email = info.email;
              userInfo.value.nickName = info.nickName;
              userInfo.value.describe = info.describe;
              userInfo.value.picUrl = info.picUrl;
              userInfo.value.age = res.data.data.age;
            }
          })
    }
    const flashData = () => {
      getUserInfo();
    }
    const uploadPicSuccess = () => {
      ElNotification({
        title: 'Success',
        message: '上传头像成功~',
        type: 'success',
      })
    }
    const uploadPicError = () => {
      ElNotification({
        title: 'Error',
        message: '上传头像失败~',
        type: 'error',
      })
    }
    const beforeUpload = (file: any) => {
      console.log(file);
      let formData = new FormData();
      formData.append('file', file);
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      proxy.$axios.post(headerPicUploadApi, formData, config)
          .then((res: any) => {
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '头像修改成功~',
                type: 'success',
              })
              flashData();
            }
          })
      return false;
    }
    const headerPic = ref({
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem(StorageTokenStr)
    })
    return {userInfo, flashData, headerPicUploadApi, uploadPicSuccess, headerPic, uploadPicError, beforeUpload};
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