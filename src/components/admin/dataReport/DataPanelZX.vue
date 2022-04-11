<template>
  <div ref="myChart" :style="{ width: '80%', height: '600px' }"></div>
</template>
<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted} from "vue";
import {ref} from "vue";
import * as echarts from "echarts";
import {DataReportVo, Result} from "@/utils/CommonValidators";
import {queryDataReportApi} from "@/api/mk-other-api";

export default defineComponent({
  name: "home",
  components: {},
  setup: function () {
    //@ts-ignore
    const {proxy} = getCurrentInstance();
    const dataReport = ref<DataReportVo>({
      days: ['xx'],
      loginNumbChange: [1],
      noteNumbChange: [1],
      shareNumbChange: [1],
      userNumbChange: [1]
    });

    const myChart = ref<HTMLElement>();  //也可以用const myChart = ref<any>();
    console.log(myChart);
    const myCharts = ref<any>();
    setTimeout(() => {
      proxy.$axios.post(queryDataReportApi)
          .then((res: Result) => {
            if (res.data.code == 200) {
              dataReport.value.days = res.data.data.days;
              dataReport.value.loginNumbChange = res.data.data.loginNumbChange
              dataReport.value.noteNumbChange = res.data.data.noteNumbChange
              dataReport.value.shareNumbChange = res.data.data.shareNumbChange
              dataReport.value.userNumbChange = res.data.data.userNumbChange
              setData1();
            }
          })
      const setData1 = () => {
        // 绘制图表
        myCharts.value = echarts.init(myChart.value!);
        myCharts.value.setOption({
          title: {
            text: '云笔记',
            subtext: '每日数据统计'
          },
          legend: {
            data: ['用户活跃度', '笔记总数量', '分享的笔记总数量', '用户总数量']
          },
          xAxis: {
            type: 'category',
            data: dataReport.value.days
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '用户活跃度',
              data: dataReport.value.loginNumbChange,
              type: 'line',
              smooth: true
            },
            {
              name: '笔记总数量',
              data: dataReport.value.noteNumbChange,
              type: 'line',
              smooth: true
            },
            {
              name: '分享的笔记总数量',
              data: dataReport.value.shareNumbChange,
              type: 'line',
              smooth: true
            },
            {
              name: '用户总数量',
              data: dataReport.value.userNumbChange,
              type: 'line',
              smooth: true
            }
          ]
        }, true);
      }
    }, 10);
    return {
      myChart,
    };
  }
});
</script>