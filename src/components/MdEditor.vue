<template>
  <v-md-editor v-model="text"
               :disabled-menus="[]"
               @upload-image="handleUploadImage"
               @save="saveContent"
               @blurb="saveContent"
               height="100%"
               :include-level="[1,2,3,4,5,6]"
               :model="modeConfig"
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
    }
  },
  setup(props: any) {
    const text = ref('');
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    //上传图片的方法
    const handleUploadImage = (event: any, insertImage: any, files: any) => {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      let formData = new FormData();
      let mkUser = getUserInfo();

      formData.append("file", files);
      console.log(files);
      //todo:完成图片的上传
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };  //添加请求头
      proxy.$axios.post(picUploadApi, formData, config)
          .then((res: Result) => {
            console.log(res.data);
          })


      // 此处只做示例
      insertImage({
        url:
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
        desc: '七龙珠',
        width: 'auto',
        height: 'auto',
      });
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