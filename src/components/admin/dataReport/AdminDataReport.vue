<template>
  <el-card class="card_1">
    <el-progress type="dashboard"  status="warning" :percentage="percentage.notReviewed">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">待审核</span>
      </template>
    </el-progress>
    <el-progress type="dashboard"  status="exception" :percentage="percentage.notPassed">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">未通过</span>
      </template>
    </el-progress>
    <el-progress type="dashboard" status="exception" :percentage="percentage.notPassedRate">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">未通过比例</span>
      </template>
    </el-progress>
  </el-card>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {queryNoteDataReportApi} from "@/api/mk-base-api";
import {Result} from "@/utils/CommonValidators";
import {NoteDataReportVO} from "@/utils/NotesValidatoes";

export default {
  name: "AdminDataReport",
  setup() {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const percentage = ref<NoteDataReportVO>({
      notPassed: 0,
      notPassedRate: 0,
      notReviewed: 0
    });

    const queryNoteData = () => {
      proxy.$axios.post(queryNoteDataReportApi)
          .then((res: Result) => {
            if (res.data.code == 200) {
              percentage.value.notPassed=res.data.data.notPassed;
              percentage.value.notPassedRate=res.data.data.notPassedRate;
              percentage.value.notReviewed=res.data.data.notReviewed;
            }
          })
    }

    onMounted(() => {
      queryNoteData();
    })
    return {
      queryNoteData,
      percentage
    }
  }
}
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.card_1{
  position: relative;
  width: 100%;
  height: 100%;

}
</style>