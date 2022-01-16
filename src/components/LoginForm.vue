<template>
  <el-form
      ref="loginForm"
      label-width="100px"
      class="LoginForm sign-in-form"
      :model="loginUser"
      :rules="rules"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input
          v-model="loginUser.email"
          placeholder="Enter Email"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="loginUser.password"
          type="password"
          placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" @click="handleLogin('loginForm')">登 录</el-button>
    </el-form-item>
    <!--          找回密码-->
    <div class="tiparea">
      <p>忘记密码?<a>立即找回</a></p>
    </div>
  </el-form>
</template>

<script lang="ts">
import {getCurrentInstance} from "vue";

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
  setup(){
    //@ts-ignore
    const {ctx} = getCurrentInstance();
    //触发登录方法
    const handleLogin = (formName:string) => {
      ctx.$refs[formName].validate((valid:boolean) => {
        // 提交
        if (valid) {
          alert("sumbit!");
        } else {
          console.log("error~");
          return false;
        }
      })
    }
    return { handleLogin};
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