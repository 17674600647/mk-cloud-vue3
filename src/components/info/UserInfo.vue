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
            <el-button size="small">
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
            <el-button size="small" @click="updateBtn(1)">
              <el-icon :size="15">
                <edit/>
              </el-icon>
              修改昵称
            </el-button>
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
            <el-button size="small" @click="updateBtn(2)">
              <el-icon :size="15">
                <edit/>
              </el-icon>
              修改年龄
            </el-button>
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
            <el-button size="small" @click="updateBtn(4)">
              <el-icon :size="15">
                <edit/>
              </el-icon>
              修改签名
            </el-button>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Lock/>
                </el-icon>
                密 码
              </div>
            </template>
            <el-button size="small" @click="updateBtn(5)">
              <el-icon :size="15">
                <edit/>
              </el-icon>
              修改密码
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-main>
  </el-container>
  <el-dialog v-model="dialogFormVisible" title="提示：" :top="'30vh'" :width="500" :center="true" :show-close="false"
             @closed="dialogClose">
    <el-form
        ref="ruleFormRef"
        :model="mkUserUpdate"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="昵称" v-show="mkUserUpdate.flag===1">
        <el-input
            v-model="mkUserUpdate.nickName"
            placeholder="请输入你的新昵称~"
        ></el-input>
      </el-form-item>

      <el-form-item label="年龄" v-show="mkUserUpdate.flag===2">
        <el-input-number
            v-model="mkUserUpdate.age"
            :min="1"
            :max="150"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="签名" prop="pass" v-show="mkUserUpdate.flag===4">
        <el-input
            v-model="mkUserUpdate.describe"
            :rows="2"
            type="textarea"
            placeholder="写个签名吧~"
        />
      </el-form-item>
      <el-form-item label="原始密码" v-show="mkUserUpdate.flag===5">
        <el-input
            v-model="mkUserUpdate.oldPassword"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密 码" v-show="mkUserUpdate.flag===5">
        <el-input
            v-model="mkUserUpdate.password"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-show="mkUserUpdate.flag===5">
        <el-input
            v-model="mkUserUpdate.checkPass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!--按钮-->
        <div style="width: 100%;float: right">
          <el-button type="primary" @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="updateInfo">
            确认
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {getUserInfoApi, headerPicUploadApi, updateInfoApi} from "@/api/mk-user-api";
import {ElNotification} from "element-plus";
import {Result, StorageTokenStr} from "@/utils/CommonValidators";
import {updateUserInfo, UserInfo} from "@/utils/UserValidators";

export default {
  name: "UserInfo",
  setup() {
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
    const updateInfo = () => {
      if (mkUserUpdate.value.flag == 5) {
        if (mkUserUpdate.value.password !== mkUserUpdate.value.checkPass) {
          ElNotification({
            title: 'Error',
            message: '两次密码不匹配~',
            type: 'error',
          })
          return;
        }
      }
      proxy.$axios.post(updateInfoApi, mkUserUpdate.value)
          .then((res: Result) => {
            //保存成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '修改成功~',
                type: 'success',
              })
              flashData();
              proxy.dialogFormVisible = false;
            }
          })
    }
    const updateBtn = (flag: number) => {
      proxy.dialogFormVisible = true
      mkUserUpdate.value.flag = flag;
    }
    const dialogClose = () => {
      mkUserUpdate.value.password = '';
      mkUserUpdate.value.oldPassword = '';
      mkUserUpdate.value.checkPass = '';
    }

    return {
      userInfo,
      flashData,
      headerPicUploadApi,
      uploadPicSuccess,
      headerPic,
      uploadPicError,
      beforeUpload,
      dialogFormVisible,
      mkUserUpdate,
      updateInfo,
      updateBtn,
      dialogClose
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