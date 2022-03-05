<template>
  <div style="height:100%;width:100%">
    <MdEditor ref="mkEditor"></MdEditor>
  </div>
</template>

<script>
import MdEditor from '@/components/MdEditor.vue'
export default {
  name: "NewNote",
  components: {MdEditor}
}
</script>
<style scoped>
</style>