<template>
  <el-form
      ref="registerForm"
      label-width="100px"
      class="registerForm sign-up-form"
      :model="registerUser"
      :rules="registerRules"
  >
    <b style="font-size:34px">注 册</b>
    <br>
    <br>
    <br>
    <el-form-item label="账号" prop="username">
      <el-input
          v-model="registerUser.username"
          placeholder="请设置你的账号(可用于登录)~"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="registerUser.password"
          type="password"
          placeholder="设置一下密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
          v-model="registerUser.password2"
          type="password"
          placeholder="请再次输入你设置的密码~"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
          v-model="registerUser.email"
          placeholder="请填写你的邮箱(可用于登录)~"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="checkCode">
      <el-input
          v-model="registerUser.checkCode"
          placeholder="请输入验证码~"
          style="width:40%"
      ></el-input>
      <el-button type="primary" style="margin-left:20px">发送验证码</el-button>
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
          //todo 需要抽取路径
          proxy.$axios.post("http://192.168.0.108:11300/mkuser/basic/register", props.registerUser)
              .then((res: any) => {
                console.log(res)
                //注册成功
                if(res.data.code ==200){
                  proxy.$message({
                    message: res.data.message,
                    type: "success"
                  });
                  router.push("/");
                }else {
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
    return {handleRegister}
  }
}
</script>

<style scoped>


</style>