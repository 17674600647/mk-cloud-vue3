<template>
  <v-md-editor v-model="text"
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

</template>

<script lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {useRouter} from "vue-router";
import {picUploadApi} from "@/api/mk-other-api"
import {getUserInfo, Result} from "@/utils/CommonValidators";

export default {
  props: {
    modeConfig: {
      type: String,
      required: false,
      default: 'editable'
    },
    update:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props: any) {
    //是否为更新
    let update = props.update;
    const text = ref('');
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    //上传图片的方法
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
      //todo:完成文本的上传
      proxy.$axios.post("https://imissu.herokuapp.com/api/v1/auth/register", props.registerUser)
          .then((res: any) => {
            //注册成功
            proxy.$message({
              message: "注册成功",
              type: "success"
            });
            router.push("/");
          })
    }
    return {
      text, handleUploadImage, saveContent
    };
  },
};
</script>