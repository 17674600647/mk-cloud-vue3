<template>
  <div class="search-div" :style="searchDiv">
    <div style="position: relative;height:5%;width:100%;">
    </div>
    <div style="position: relative;height:90%;width:100%">
      <div class="search2div">
        <div>
          <el-input
              v-model="searchNoteDTO.searchContent"
              placeholder="Please input"
              class="input-with-select"
              :clearable="true"
              :size="'large'"
              @input="searchTitle"
          >
            <template #append>
              <el-button :icon="Search" @click="SearchNote()">搜索</el-button>
            </template>
          </el-input>
          <el-card class="box-cardX" v-show="showCard">
            <el-card class="el-Xcard" :shadow="'hover'" v-for="item in noteList" @click="changeSearchContent(item)">
              <span class="title-item">{{ item }}</span>
            </el-card>
          </el-card>
        </div>
        <div style="position: relative;top:10px">
          <el-card :shadow="'hover'" class="mknotes-card" v-for="item in notesData" @click="browseNote(item) ">
            <span class="mknote-span">{{ item.title }}</span>
            <el-divider content-position="right" style="margin:0px;top:5px;">发布时间：<span style="color: red">{{item.createTime}}</span></el-divider>
            <span class="mknote-span-content">{{ item.content }}</span>
          </el-card>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="totalx"
              style="position: relative;top:5px"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, ref} from "vue";
import {SearchNotesDTO} from "@/utils/NotesValidatoes";
import {disShareOneNoteApi, searchShareNotesApi, searchShareNoteTitleApi} from "@/api/mk-base-api";
import {ElNotification} from "element-plus";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "SearchNote",
  setup() {
    const route = useRoute();
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const searchDiv = {
      backgroundImage: "url(" + require("../../assets/image/back_img.png") + ")",
      backgroundRepeat: "no-repeat",
    }
    const searchContent = ref('')
    const searchNoteDTO = ref<SearchNotesDTO>({
      currentPage: 0,
      pageSize: 7,
      searchContent: ""
    })
    const showCard = ref(false)
    /*文章标题list*/
    const noteList = ref();
    /*文章内容*/
    const notesData = ref()
    const totalx = ref();
    /*查询文章列表*/
    const SearchNote = () => {
      proxy.$axios.post(searchShareNotesApi, searchNoteDTO.value)
          .then((res: any) => {
            //查询成功
            if (res.data.code == 200) {
              ElNotification({
                title: 'Success',
                message: '查询成功~',
                type: 'success',
              })
              proxy.showCard = false;
              proxy.notesData = res.data.data.noteList;
              proxy.totalx = res.data.data.total;
            }
          })
    }
    const router = useRouter()
    const browseNote = (item: any) => {
      router.push({
            //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
            path: '/menu/BrowseNotes',
            query: {
              noteId: item.id
            }
          }
      );
    }
    const searchTitle = () => {
      if (searchNoteDTO.value.searchContent != '') {
        proxy.$axios.post(searchShareNoteTitleApi, searchNoteDTO.value)
            .then((res: any) => {
              //查询成功
              if (res.data.code == 200) {
                ElNotification({
                  title: 'Success',
                  message: '查询成功~',
                  type: 'success',
                })
                proxy.noteList = res.data.data.noteList;
                if (res.data.data.total > 0) {
                  proxy.showCard = true;
                }
              }
            })
      } else {
        proxy.showCard = false;
      }
    }
    const changeSearchContent = (content: string) => {
      searchNoteDTO.value.searchContent = content;
      proxy.showCard = false;
      SearchNote();
    }
    /*改变分页的页码的时候*/
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
      searchNoteDTO.value.currentPage = val - 1;
      SearchNote();
    }
    onMounted(() => {
      searchNoteDTO.value.searchContent = <string>route.query.searchContent;
      SearchNote();
    })

    return {
      totalx,
      notesData,
      browseNote,
      changeSearchContent,
      searchContent,
      searchDiv,
      Search,
      searchNoteDTO,
      SearchNote,
      searchTitle,
      noteList,
      showCard,
      handleCurrentChange
    };
  }
}
</script>

<style scoped>
.mknote-span-content{
  position:relative;
  font-size:15px;
  margin-left: 20px;
  margin-top: 10px;
  height:60px;
  word-break: normal;
  width: 90%;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mknote-span{
  font-size:20px;
  margin-left: 20px;
  display: block;
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mknotes-card {
  position: relative;
  /*width: calc(100% - 80px);*/
  width: 100%;
  height: 110px;
  margin-top: 5px;
  --el-card-padding: 0px;
}

.search-div {
  position: relative;
  width: 100%;
  height: 100%;
}

.search2div {
  position: relative;
  width: 50%;
  height: 100%;
  border: 1px solid black;
  margin: 0 auto;
  bottom: 0;
  z-index: 30;
}

.box-cardX {
  position: absolute;
  width: calc(100% - 85px);
  height: 218px;
  top: 45px;
  --el-card-padding: 0;
  z-index: 30;
}

.el-Xcard {
  position: relative;
  height: 20px;
  --el-card-padding: 0;
  border: 0px;
  padding: 2px;
  padding-left: 10px;
  z-index: 30;
}

.title-item {
  cursor: pointer;
  font-size: 16px;
}

.title-item:hover {
  color: #0099ff;
}

</style>