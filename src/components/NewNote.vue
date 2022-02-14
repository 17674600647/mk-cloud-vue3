<template>
  <div class="NewNote">
    <div class="title-input-div">
      <el-input v-model="title" placeholder="请输入你的标题" class="w-50 m-2" size="large">
        <template #prepend><b>标题</b></template>
      </el-input>
    </div>
    <div class="note-edit-div">
      <MdEditor></MdEditor>
    </div>
  </div>

</template>

<script>
import MdEditor from '@/components/MdEditor.vue'
import {ref} from 'vue'


export default {
  name: "NewNote",
  components: {MdEditor},
  setup() {
    let title = ref('');
    return title;
  }
}
</script>

<style scoped>
.NewNote {
  position: relative;
  height: 100%;
  padding: 0;
}

.title-input-div {
  position: relative;
  height: 50px;
  margin-bottom: 2px;
}

.note-edit-div {
  position: relative;
  height: calc(100% - 50px);
}
</style>