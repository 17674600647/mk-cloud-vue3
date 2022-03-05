<template xmlns="http://www.w3.org/1999/html">
  <div class="title-input-div">
    <el-input v-model="titleX" placeholder="请输入你的标题" class="w-50 m-2" size="large">
      <template #prepend><b>标题</b></template>
    </el-input>
  </div>
  <br>
  <div class="editor-div">
    <v-md-editor v-model="noteDto.content"
                 :disabled-menus="[]"
                 @upload-image="handleUploadImage"
                 @save="saveContent"
                 @blurb="saveContent"
                 height="100%"
                 :include-level="[1,2,3,4,5,6]"
                 :model="modeConfig"
                 :update="update"
    >
    </v-md-editor>
  </div>


</template>

<script lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {useRouter} from "vue-router";
import {picUploadApi} from "@/api/mk-other-api"
import {getUserInfo, Result} from "@/utils/CommonValidators";
import {NoteDTO} from "@/utils/NotesValidatoes";
import {saveNoteApi} from "@/api/mk-base-api";

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
    titleX: {
      type: String,
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
    let titleX = ref<any>('');
    //是否为更新
    let update = props.update;
    const text = ref('');
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
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
          .then((res: Result) => {
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
    const saveContent = (text: any, html: any) => {
      noteDto.value.content = text;
      noteDto.value.title = titleX;
      console.log(noteDto.value);
      //todo:完成文本的上传时候处理文件
      proxy.$axios.post(saveNoteApi, noteDto.value)
          .then((res: Result) => {
            //保存成功
            if (res.data.code == 200)
              proxy.$message({
                message: "保存成功",
                type: "success"
              });
          })
    }
    return {
      text, handleUploadImage, saveContent, titleX, noteDto
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