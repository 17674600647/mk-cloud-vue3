<template>
  <el-form
      ref="registerForm"
      label-width="100px"
      class="registerForm sign-up-form"
      :model="registerUser"
      :rules="registerRules"
  >
    <el-form-item label="账号" prop="username">
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
import {useRouter} from "vue-router";

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
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    //注册提交方法
    const handleRegister = (formName: any) => {
      proxy.$refs[formName].validate((valid: boolean) => {
        // 提交
        if (valid) {
          proxy.$axios.post("https://imissu.herokuapp.com/api/v1/auth/register", props.registerUser)
              .then((res: any) => {
                //注册成功
                proxy.$message({
                  message: "注册成功",
                  type: "success"
                });
                router.push("/");
              })
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