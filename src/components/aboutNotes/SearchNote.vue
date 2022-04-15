<template>
  <div class="search-div" :style="searchDiv">
    <div style="position: relative;height:20%;width:100%;">
    </div>
    <div style="position: relative;height:80%;width:100%">
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
      </div>
      <div class="search3div">
        <el-card class="box-card">
          <el-scrollbar >
            <el-table :data="tableData.noteTitleList" style="width: 100%;" @row-click="rowClick">
              <el-table-column prop="title" label="文章标题"/>
              <el-table-column prop="hotScore" label="热度" width="100"/>
            </el-table>
          </el-scrollbar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, ref} from "vue";
import {LeaderboardVO, SearchNotesDTO} from "@/utils/NotesValidatoes";
import {
  getQueryLeaderboardApi,
  searchShareNoteTitleApi
} from "@/api/mk-base-api";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {Result} from "@/utils/CommonValidators";

export default {
  name: "SearchNote",
  setup() {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const router = useRouter();
    const tableData = ref<LeaderboardVO>({
      noteTitleList: undefined
    })
    const searchDiv = {
      backgroundImage: "url(" + require("../../assets/image/back_img.png") + ")",
      backgroundRepeat: "no-repeat",
    }
    const searchContent = ref('')
    const searchNoteDTO = ref<SearchNotesDTO>({
      currentPage: 0,
      pageSize: 10,
      searchContent: ""
    })
    const showCard = ref(false)
    const noteList = ref();
    const SearchNote = () => {
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: '/menu/SearchTheNotes',
        query: {
          searchContent: searchNoteDTO.value.searchContent
        }
      });
      proxy.showCard = false
    }
    const searchTitle = () => {
      if (searchNoteDTO.value.searchContent != '') {
        proxy.$axios.post(searchShareNoteTitleApi, searchNoteDTO.value)
            .then((res: any) => {
              //查询成功
              if (res.data.code == 200) {
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
    const rowClick = (row: any, column: any, event: any) => {
      let routeData = router.resolve({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: '/menu/BrowseOthersNotes',
        query: {
          noteId: row.id
        }
      })
      window.open(routeData.href, '_blank')
    }
    const getQueryLeaderboard = () => {
      proxy.$axios.post(getQueryLeaderboardApi)
          .then((res: Result) => {
            //查询成功
            if (res.data.code == 200) {
              tableData.value.noteTitleList = res.data.data
            }
          })
    }
    onMounted(() => {
      getQueryLeaderboard();
    })
    return {
      rowClick,
      tableData,
      changeSearchContent,
      searchContent,
      searchDiv,
      Search,
      searchNoteDTO,
      SearchNote,
      searchTitle,
      noteList,
      showCard,
    };
  }
}
</script>

<style scoped>
.search-div {
  position: relative;
  width: 100%;
  height: 100%;
}

.search2div {
  position: relative;
  width: 50%;
  height: 30px;
  margin: 0 auto;
  bottom: 0;
  z-index: 30;
}

.box-cardX {
  position: absolute;
  width: calc(100% - 85px);
  height: 206px;
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
  font-size: 15px;
}

.title-item:hover {
  color: #0099ff;
}

.search3div {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;

}

.box-card {
  position: absolute;
  width: 600px;
  height: 300px;
  top: 40%;
  left: 50%;
  margin-top: -100px;
  margin-left: -300px;
  z-index: 31;
}
</style>