<template>
  <el-scrollbar>
    <el-menu :default-openeds="['0','1','2','3']">
      <el-breadcrumb separator="/">
        <el-page-header :icon="ArrowLeft" content="返回" @back="goBack"/>
      </el-breadcrumb>
      <el-divider/>
      <el-sub-menu index="1" v-show="role===1">
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
      <el-sub-menu index="2" v-show="role===1">
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
            <router-link to="/menu/CollectionNotes">
              我收藏的
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-4">
            <router-link to="/menu/myDeleteNotes">
              最近删除
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3" v-show="role===1">
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
        </el-menu-item-group>
      </el-sub-menu>
      <!--管理员权限-->
      <el-sub-menu index="4" v-show="role===2">
        <template #title>
          <el-icon>
            <setting/>
          </el-icon>
          运营审核
        </template>
        <el-menu-item-group>
          <template #title>运营管理</template>
          <el-menu-item index="4-1">
            <router-link to="/menu/UserTable">
              用户管理
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-3">
            <router-link to="/menu/NotesTable">
              文章管理
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link to="/menu/NotesTableAudit">
              文章审核
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="5" v-show="role===2">
        <template #title>
          <el-icon>
            <setting/>
          </el-icon>
          运营数据
        </template>
        <el-menu-item-group>
          <template #title>运营管理</template>
          <el-menu-item index="5-1">
            <router-link to="/menu/AdminDataReport">
              数据中心
            </router-link>
          </el-menu-item>
          <el-menu-item index="5-1">
            <router-link to="/menu/LogsTable">
              日志中心
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    <div class="div-out">
      <el-button type="info" :icon="ArrowLeftBold" @click="signOut()">退出登录</el-button>
    </div>
  </el-scrollbar>
</template>
<script lang="ts">
import {Message, Setting, ArrowLeftBold} from '@element-plus/icons-vue'
import {ArrowLeft} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {Result, StorageAuthStr, StorageTokenStr} from "@/utils/CommonValidators";

import {getUserAuthApi, signOutApi} from "@/api/mk-user-api";

export default {
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    }
    const role = ref();
    const queryRole = () => {
      proxy.$axios.post(getUserAuthApi)
          .then((res: Result) => {
            if (res.data.code == 200) {
              proxy.role = res.data.data.role
            }
          })
    }
    onMounted(() => {
      queryRole();
    })
    const signOut = () => {
      proxy.$axios.post(signOutApi)
          .then((res: Result) => {
            if (res.data.code == 200) {
              localStorage.removeItem(StorageTokenStr)
              sessionStorage.removeItem(StorageAuthStr)
              proxy.$message({
                message: res.data.message,
                type: "success"
              });
              router.push("/")
            }
          })
    }
    return {
      role,
      ArrowLeft,
      Message,
      Setting,
      goBack,
      ArrowLeftBold,
      signOut
    }
  }
}

</script>

<style scoped>
.div-out {
  position: absolute;
  bottom: 0px;
}
</style>