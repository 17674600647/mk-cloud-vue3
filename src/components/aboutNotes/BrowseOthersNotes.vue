<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-main class="div_md">
        <MdEditor :update="true" :modeConfig="'preview'" :editShow="true" :browser="true"></MdEditor>
      </el-main>
      <el-aside class="div_info" width="200px">
        <el-card class="box-card">
          <el-avatar :size="200" :src="userInfo.picUrl" :alt="'还未上传头像~'"></el-avatar>
          <div style="width:100%;" align="center">
          </div>
          <el-descriptions
              class="margin-top"
              title="作者信息"
              :column="1"
              :size="'large'"
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <user/>
                  </el-icon>
                  昵称
                </div>
              </template>
              {{ userInfo.nickName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <Coin/>
                  </el-icon>
                  年龄
                </div>
              </template>
              <el-tag size="large">{{ userInfo.age }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <Clock/>
                  </el-icon>
                  注册时间
                </div>
              </template>
              <el-tag size="large">{{ userInfo.createTime }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <MoreFilled/>
                  </el-icon>
                  个性签名
                </div>
              </template>
              {{ userInfo.describe }}
            </el-descriptions-item>
          </el-descriptions>
          <div>
            <el-button circle  width="30" height="30">
              <el-icon size="30" color="gray">
                <star/>
              </el-icon>
            </el-button>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import MdEditor from '@/components/aboutNotes/MdEditor.vue'
import UserInfo from "@/components/info/UserInfo";
import {ref} from "vue";


export default {
  name: "BrowseNotes",
  components: {MdEditor, UserInfo},
  setup() {
    const userInfo = ref<UserInfo>({
      nickName: '',
      describe: '',
      age: 0,
      createTime: '',
      email: '',
      picUrl: null
    })
    return {userInfo}
  }
}
</script>

<style scoped>
.div_md {
  position: relative;
  height: 100%;
  width: 80%;
  min-width: 600px;
}

.common-layout {
  position: relative;
  height: 100%;
  width: 100%;
}

.div_info {
  position: relative;
  height: 100%;
  max-width: 250px;
  min-width: 250px;
  overflow: hidden;
  border: 1px solid red;
}

.box-card {
  position: relative;
  height: 100%;

}

</style>