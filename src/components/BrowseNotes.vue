<template>
  <div style="height:100%;width:100%">
    <MdEditor :update="true"></MdEditor>
  </div>
</template>

<script>
import MdEditor from '@/components/MdEditor.vue'

export default {
  name: "BrowseNotes",
  components: {MdEditor},
  setup() {

  }
}
</script>

<style scoped>

</style>