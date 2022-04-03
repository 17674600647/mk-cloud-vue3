<template>
  <div style="height:100%;width:100%">
    <MdEditor :update="true" :modeConfig="'preview'" :editShow="true"></MdEditor>
  </div>
</template>

<script>
import MdEditor from '@/components/aboutNotes/MdEditor.vue'

export default {
  name: "BrowseNotes",
  props: {
  },
  components: {MdEditor},
  setup() {

  }
}
</script>

<style scoped>

</style>