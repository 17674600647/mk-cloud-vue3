<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-aside width="200px" class="el-aside">
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-main class="el-main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu.vue'

export default {
  name: "MarkDownED",
  components: {AsideMenu}
}
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>