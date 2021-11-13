<template>
  <div class="date-info" :style="styleObj">
    <div class="date-info__left" :style="{fontSize:`${timeFont}px`}">
      <div>{{ time[0] }}</div>
      <div class="secondHand">
        <span v-show="secondHandRef">:</span>
      </div>
      <div>{{ time[1] }}</div>
    </div>
    <div class="date-info__right" :style="{fontSize:`${dayFont}px`}">
      <div>{{ date }}</div>
      <div>{{ day }}</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "DateTime",
  props: {
    styleObj: Object,
    timeFont:Number,
    dayFont:Number,
  },
  setup(props) {
    const time = ref('')
    const date = ref('')
    const day = ref('')
    const secondHandRef = ref(true)
    const timeInterval = ref(0)

    const updateTime = () => {
      timeInterval.value = setInterval(function () {
        time.value = moment().format('HH:mm').split(':')
        secondHandRef.value = !secondHandRef.value
      }, 1000);
    }
    const momentNow = moment();
    date.value = momentNow.format('YYYY-MM-DD');
    const dayNameMapping = [
      '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ];
    day.value = dayNameMapping[momentNow.format('e')];
    updateTime();
    return {
      time,
      date,
      day,
      timeInterval,
      secondHandRef,
      ...props
    }
  }
})
</script>
<style lang="scss" scoped>
.date-info {
  display: flex;
  justify-content: center;
  align-items: center;


  .date-info__left {

    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date-info__right {

    line-height: 1.5em;
  }

  .secondHand {
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
