<template>
  <el-scrollbar>
    <el-menu :default-openeds="['1']">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <message/>
          </el-icon>
          我的信息
        </template>
        <el-menu-item-group>
          <template #title>这里写入用户ID</template>
          <el-menu-item index="1-1">基本信息</el-menu-item>
          <el-menu-item index="1-2">安全设置</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <icon-menu/>
          </el-icon>
          我的笔记
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/menu/myNotes">
              我的笔记
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/menu/newNote">
              新建笔记
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-3">我分享的</el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/menu/myDeleteNotes">
              最近删除
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <setting/>
          </el-icon>
          别人的笔记
        </template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
          <template #title>Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import {Message, Menu as IconMenu, Setting} from '@element-plus/icons-vue'

</script>

<style scoped>

</style>