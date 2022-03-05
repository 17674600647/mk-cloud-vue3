<template>
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
  components: {},
};
</script>
<style scoped>
</style>