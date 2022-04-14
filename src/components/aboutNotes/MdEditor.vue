<template xmlns="http://www.w3.org/1999/html">
  <div class="title-input-div">
    <el-input v-model="noteDto.title" placeholder="请输入你的标题" class="w-50 m-2" size="large"
              :disabled="editMode.controlBtn">
      <template #prepend><b>标题</b></template>
      <template #append>
        <div v-show="!editMode.controlBrowser">
          <el-button type="primary" icon="Edit" v-show="editMode.controlBtn" @click="btnClick"> 编 辑</el-button>
          <el-button type="primary" icon="Reading" v-show="!editMode.controlBtn" @click="btnClick"> 预 览</el-button>
        </div>
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
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>选择文章的分类: </span>
    <el-select
        v-model="noteDto.mkTypeNameList"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="选择你的分类或者新建~"
    >
      <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnSave()"
        >保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {picUploadApi} from "@/api/mk-other-api"
import {Result} from "@/utils/CommonValidators";
import {GetOneNoteDTO, ChangeMode, NoteDTO} from "@/utils/NotesValidatoes";
import {getNoteTypeApi, getOneNoteApi, saveNoteApi} from "@/api/mk-base-api";
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
    noteId: {
      type: String,
      required: false,
      default: ''
    },
    browser: {
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
    const dialogVisible = ref(false)
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const value = ref<string[]>([])
    const options = ref([])
    const editMode = ref<ChangeMode>({
      controlBtn: props.editShow,
      controlBrowser: props.browser,
      controlMode: props.modeConfig
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
      title: "",
      mkTypeNameList: []
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
              desc: '这里插入图片描述~',
              width: 'auto',
              height: 'auto',
            });
          })
    }
    const saveNotes = () => {
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


    const saveContent = (text: any, html: any) => {
      queryNoteTypes();
      if (noteDto.value.noteId == "") {
        proxy.dialogVisible = true
      } else {
        saveNotes()
      }
    }
    const btnSave = () => {
      proxy.dialogVisible = false;
      saveNotes();
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
    const queryNoteTypes = () => {
      proxy.$axios.post(getNoteTypeApi)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              proxy.options = res.data.data
            }
          })
    }

    onMounted(() => {
      let queryNoteID = route.query.noteId;
      if (queryNoteID != null && queryNoteID != "" && props.update == true) {
        noteDto.value.noteId = <string>queryNoteID;
        proxy.queryNotes(noteDto.value.noteId);
      }
      if (props.noteId != '') {
        noteDto.value.noteId = props.noteId;
        proxy.queryNotes(noteDto.value.noteId);
      }
    })
    return {
      handleUploadImage, saveContent, noteDto, queryNotes, btnClick, editMode, dialogVisible, value, options, btnSave
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