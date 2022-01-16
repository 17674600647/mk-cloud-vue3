<template>
  <el-form
      ref="registerForm"
      label-width="100px"
      class="registerForm sign-up-form"
      :model="registerUser"
      :rules="registerRules"
  >
    <el-form-item label="账号" prop="nickname">
      <el-input
          v-model="registerUser.username"
          placeholder="请输入你的账号~"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="registerUser.password"
          type="password"
          placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
          v-model="registerUser.password2"
          type="password"
          placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
          v-model="registerUser.email"
          placeholder="Enter Email"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" @click="handleRegister('registerForm')">注 册</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts">
import {getCurrentInstance} from "vue";
export default {
  name: "RegisterForm",
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true
    }
  },
  setup() {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    //注册提交方法
    const handleRegister = (formName: any) => {
      proxy.$refs[formName].validate((valid: boolean) => {
        // 提交
        if (valid) {
          alert("sumbit!");
        } else {
          console.log("error~");
          return false;
        }
      })
    }
    return {handleRegister}
  }
}
</script>

<style scoped>

</style>