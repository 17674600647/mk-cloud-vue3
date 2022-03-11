<template xmlns="http://www.w3.org/1999/html">
  <div class="title-input-div">
    <el-input v-model="noteDto.title" placeholder="请输入你的标题" class="w-50 m-2" size="large" @blur="blurServe" :disabled="editMode.controlBtn">
      <template #prepend><b>标题</b></template>
      <template #append>
        <el-button type="primary" icon="Edit" v-show="editMode.controlBtn" @click="btnClick"> 编 辑</el-button>
        <el-button type="primary" icon="Reading" v-show="!editMode.controlBtn" @click="btnClick"> 预 览</el-button>
      </template>
    </el-input>
  </div>
  <br>
  <div class="editor-div">
    <v-md-editor v-model="noteDto.content"
                 :disabled-menus="[]"
                 @upload-image="handleUploadImage"
                 @save="saveContent"
                 height="100%"
                 :include-level="[1,2,3,4,5,6]"
                 :mode="editMode.controlMode"
                 placeholder="在这里开始吧~"
    >
    </v-md-editor>

  </div>


</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {picUploadApi} from "@/api/mk-other-api"
import {Result} from "@/utils/CommonValidators";
import {GetOneNoteDTO, ChangeMode, NoteDTO} from "@/utils/NotesValidatoes";
import {getOneNoteApi, saveNoteApi} from "@/api/mk-base-api";
import {ElNotification} from "element-plus";

export default {
  props: {
    modeConfig: {
      type: String,
      required: false,
      default: 'editable'

    },
    update: {
      type: Boolean,
      required: false,
      default: false
    },
    editShow: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: false,
      default: false
    }
  },
  setup(props: any) {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const editMode = ref<ChangeMode>({
      controlBtn: props.editShow,
      controlMode: props.modeConfig,
    })
    const btnClick = () => {
      //@ts-ignore
      editMode.value.controlBtn = !editMode.value.controlBtn;
      console.log(editMode.value.controlBtn)
      if (editMode.value.controlBtn) {
        editMode.value.controlMode = 'preview'
      } else {
        editMode.value.controlMode = 'editable'
      }
    }
    //上传图片的方法
    const noteDto = ref<NoteDTO>({
      content: "",
      noteId: "",
      title: ""
    })
    //@ts-ignore
    const handleUploadImage = (event: any, insertImage: any, files: File[]) => {
      let formData = new FormData();
      formData.append('file', files[0]);
      console.log(files[0])
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      proxy.$axios.post(picUploadApi, formData, config)
          .then((res: any) => {
            console.log(res.data);
            // 此处只做示例
            insertImage({
              url: res.data.data,
              desc: '七龙珠',
              width: 'auto',
              height: 'auto',
            });
          })
    }
    const blurServe = (event: any) => {
      saveContent(null, null);
    }

    const saveContent = (text: any, html: any) => {
      console.log(noteDto.value);
      //todo:完成文本的上传时候处理文件
      proxy.$axios.post(saveNoteApi, noteDto.value)
          .then((res: Result) => {
            //保存成功
            if (res.data.code == 200) {
              noteDto.value.noteId = res.data.data;
              ElNotification({
                title: 'Success',
                message: '保存成功',
                type: 'success',
              })
            }
          })
    }

    const queryNotes = (noteId: string) => {
      const getOneNoteDTO = ref<GetOneNoteDTO>({
        noteId: noteId
      })
      proxy.$axios.post(getOneNoteApi, getOneNoteDTO.value)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              noteDto.value.title = res.data.data.title;
              noteDto.value.content = res.data.data.content;
              noteDto.value.noteId = res.data.data.id;
            }
          })
    }
    onMounted(() => {
      let queryNoteID = route.query.noteId;
      noteDto.value.noteId = <string>queryNoteID;
      if (queryNoteID != null && queryNoteID != "" && props.update == true) {
        proxy.queryNotes(noteDto.value.noteId);
      }
    })
    return {
      handleUploadImage, saveContent, noteDto, queryNotes, blurServe, btnClick, editMode
    };
  },
};
</script>
<style scoped>
.editor-div {
  position: relative;
  height: calc(100% - 70px);
}
</style>