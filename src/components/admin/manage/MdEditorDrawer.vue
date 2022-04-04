<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-main class="div_md">
        <MdEditor :update="true" :modeConfig="'preview'" :editShow="true" :browser="true" :note-id="noteId"></MdEditor>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import MdEditor from '@/components/aboutNotes/MdEditor.vue'
import {getCurrentInstance, onMounted, ref} from "vue";
import {getNotesOwnerInfoApi} from "@/api/mk-user-api";
import {ElNotification} from "element-plus/es";
import {Result} from "@/utils/CommonValidators";
import {useRoute} from "vue-router";
import {UserInfo} from "@/utils/UserValidators";
import {GetOneNoteDTO} from "@/utils/NotesValidatoes";


export default {
  name: "BrowseNotes",
  props: {
    noteId: {
      type: String,
      require: true,
      default: ''
    }
  },
  components: {MdEditor},
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const userInfo = ref<UserInfo>({
      nickName: '',
      describe: '',
      age: 0,
      createTime: '',
      email: '',
      picUrl: null
    })
    const route = useRoute();
    const getNotesOwnerInfo = () => {
      const noteIdOth = ref<GetOneNoteDTO>({
        noteId: ""
      })
      noteIdOth.value.noteId = <string>route.query.noteId;
      if (noteIdOth.value.noteId == null) {
        return;
      }
      proxy.$axios.post(getNotesOwnerInfoApi, noteIdOth.value)
          .then((res: Result) => {
            //保存成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '查询用户成功~',
                type: 'success',
              })
            }
            let dataX = res.data.data;
            userInfo.value.nickName = dataX.nickName;
            userInfo.value.describe = dataX.describe;
            userInfo.value.age = dataX.age;
            userInfo.value.createTime = dataX.createTime;
            userInfo.value.picUrl = dataX.picUrl;
          })
    }
    onMounted(() => {
      getNotesOwnerInfo();
    })
    return {
      userInfo

    }
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

}

.box-card {
  position: relative;
  height: 100%;

}

</style>