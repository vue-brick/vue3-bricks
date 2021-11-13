<template>
  <div class="imooc-fly-box" ref="flyBoxDom">
    <svg :width="width" :height="height">
      <defs>
        <path :id="pathId"
              :d="path"
              fill="none"
        ></path>
        <mask :id="maskId">
          <circle :r="startLength" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
            <animateMotion :dur="`${duration}s`" :path="path" rotate="auto"
                           repeatCount="indefinite">

            </animateMotion>
          </circle>
        </mask>
        <radialGradient
            :id="radialGradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
      </defs>
      <!--边框底色盒子-->
      <use :stroke-width="boxWidth"
           :stroke="boxColor"
           :href="`#${pathId}`"/>
      <!--飞线-->
      <use :stroke-width="lineWidth"
           :stroke="startColor"
           :href="`#${pathId}`"
           :mask="`url(#${maskId})`"/>
    </svg>
    <div class="flex-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, Ref, onMounted, getCurrentInstance} from "vue";
import {v4 as uuisv4} from "uuid";

export default defineComponent({
  name: "FlyBox",
  props: {
    boxColor: {
      type: [String],
      default: "#235fa7"
    },
    boxWidth: {
      type: Number,
      default: 1
    },
    lineWidth: {
      type: Number,
      default: 3
    },
    startColor: {
      type: [String],
      default: "#4fd2dd"
    },
    startLength: {
      type: [String, Number],
      default: 50
    },
    duration: {
      type: [String, Number],
      default: 3
    }
  },
  setup() {
    const flyBoxDom = ref(null) as any

    const uuid = uuisv4();
    const width = ref(0);
    const height = ref(0);
    const refName = "FlyBox";

    //为了区别id
    const pathId = `${refName}-path-${uuid}`;
    const radialGradientId = `${refName}-radial-${uuid}`;
    const maskId = `${refName}-mask-${uuid}`;

    const path = computed(() => {
      return `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} z`;
    });
    const init = () => {
      width.value = flyBoxDom.value.clientWidth;
      height.value = flyBoxDom.value.clientHeight;
    };
    onMounted(() => {
      init();
    });
    return {
      width,
      height,
      flyBoxDom,
      path,
      pathId,
      radialGradientId,
      maskId,
    };
  }
});
</script>

<style lang="scss" scoped>
.imooc-fly-box {
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .flex-box-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}


</style>
