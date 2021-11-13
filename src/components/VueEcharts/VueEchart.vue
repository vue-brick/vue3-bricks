<template>
  <div :class="[className, 'echarts']"></div>
</template>


<script lang="ts">
import {watch, ref, onMounted, defineComponent} from 'vue';
import Echarts from "echarts";
import {v4 as uuidv4} from 'uuid';


export default defineComponent({
  name: "VueEcharts",
  props: {
    options: Object
  },
  setup(props) {
    let dom: any;
    let chart: any;
    const className = `echarts${uuidv4()}`;
    const ininEcharts = () => {
      if (!chart) {
        dom = document.getElementsByClassName(className)[0];
        chart = Echarts.init(dom);
      }
      if (props.options) {
        chart.setOption(props.options, true)
      }
    };
    onMounted(() => {
      ininEcharts();
    });
    watch(() => props.options, (newV, preveV) => {
      ininEcharts();
    });
    return {
      className
    };
  }
});

</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
