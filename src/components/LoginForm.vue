<template>
  <el-form
      ref="loginForm"
      label-width="100px"
      class="LoginForm sign-in-form"
      :model="loginUser"
      :rules="rules"
  >
    <b style="font-size:34px">登 录</b>
    <br>
    <br>
    <br>
    <el-form-item label="账号/邮箱" prop="email">
      <el-input
          v-model="loginUser.account"
          placeholder="请输入 邮箱/账号 登录~"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="loginUser.password"
          type="password"
          placeholder="请输入密码~"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" @click="handleLogin('loginForm')">登 录</el-button>
    </el-form-item>
    <!--          找回密码-->
<!--    <div class="tiparea">
      <p>忘记密码?<a>立即找回</a></p>
    </div>-->
  </el-form>
</template>

<script lang="ts">
import {getCurrentInstance} from "vue";
import {userLoginApi} from "@/api/mk-user-api";
import {Result, saveStorage, StorageAuthStr, StorageTokenStr} from "@/utils/CommonValidators";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "LoginForm",
  props: {
    loginUser: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    //触发登录方法
    const handleLogin = (formName: string) => {
      proxy.$refs[formName].validate((valid: boolean) => {
        // 提交
        if (valid) {
          proxy.$axios.post(userLoginApi, props.loginUser)
              .then((res: Result) => {
                //发送成功
                if (res.data.code == 200) {
                  saveStorage(res);
                  proxy.$message({
                    message: res.data.message,
                    type: "success"
                  });
                  if (route.query.auth=="0"){
                      router.go(-1);
                  }else {
                    router.push("/menu")
                  }
                } else {
                  proxy.$message({
                    message: res.data.message,
                    type: "error"
                  });
                }

              })
        } else {
          console.log("error~");
          return false;
        }
      })
    }
    return {handleLogin};
  }
}
</script>

<style scoped>
/* 控制login & register显示 */
form {
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

.submit-btn {
  width: 100%;
}

/* register */
.LoginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
</style>