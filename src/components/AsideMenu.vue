<template>
  <el-scrollbar>
    <el-menu :default-openeds="['0','1','2','3']">
      <el-breadcrumb separator="/">
        <el-page-header :icon="ArrowLeft" content="返回" @back="goBack"/>
      </el-breadcrumb>
      <el-divider/>
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <Message/>
          </el-icon>
          我的信息
        </template>
        <el-menu-item-group>
          <template #title>码克荡云笔记</template>
          <el-menu-item index="1-1">
            <router-link to="/menu/userInfo">
              基本信息
            </router-link>
          </el-menu-item>
          <el-menu-item index="1-2">安全设置</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Lock/>
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
          <el-menu-item index="2-3">
            <router-link to="/menu/MySharedNotes">
              我分享的
            </router-link>
          </el-menu-item>
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
          分享宝库
        </template>
        <el-menu-item-group>
          <template #title>共同分享</template>
          <el-menu-item index="3-1">
            <router-link to="/menu/SearchNote">
              搜寻佳记
            </router-link>
          </el-menu-item>
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

<script lang="ts">
import {Message, Menu as IconMenu, Setting} from '@element-plus/icons-vue'
import {ArrowLeft} from '@element-plus/icons-vue'
import {getCurrentInstance} from "vue";
import {Menu} from "@element-plus/icons";
import {useRouter} from "vue-router";

export default {
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    }
    return {
      ArrowLeft,
      Message,
      Setting,
      goBack
    }
  }
}

</script>

<style scoped>

</style>