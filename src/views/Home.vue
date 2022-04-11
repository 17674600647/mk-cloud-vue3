<template>
  <el-carousel height="10000">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <div class="index">首页</div>
  <button>
    <router-link to="/login">登录页</router-link>
  </button>
  <br>
  <button>
    <router-link to="/menu">笔记编辑页</router-link>
  </button>
</template>
<script>


export default {
  name: "Home",
};
</script>
<style scoped>
</style>