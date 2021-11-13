<template>
  <div class="base-scroll-list" :id="id">

    <div class="base-scroll-list-header"
         :style="{
          color:`${atcualConfig.headerColor}`,
         backgroundColor:atcualConfig.headerBg,
         height:`${atcualConfig.headerHeight}px`,
         fontSize:`${atcualConfig.headerFontSize}px`}"
    >
      <div class="header-item base-scroll-list-text" v-for="(headerItem,i) in headerData" :key="headerItem + i"
           :style="{
              width:`${cloumnWidths[i]}px`,
              ...headerStyle[i],
           }"
           :align="aligns[i]"
           v-html="headerItem">

      </div>
    </div>
    <div class="base-scroll-list-rows-wrapper" :style="{height:`${height - atcualConfig.headerHeight}px`}">
      <div class="base-scroll-list-rows" v-for="(rowData,index) in currentRowData" :key="rowData.data + index "
           :style="{
       color:`${atcualConfig.rowColor}`,
        fontSize:`${atcualConfig.rowFontSize}px`,
        backgroundColor: rowData.rowIndex % 2 === 0? rowBg[0] : rowBg[1],
        height: `${rowHeights[index]}px`,
        lineHeight: `${rowHeights[index]}px`
    }">
        <div class="base-scroll-list-columns base-scroll-list-text " v-for="(colData,colIndex) in rowData.data "
             :key="colData + colIndex"
             :align="aligns[colIndex]"
             v-html="colData" :style="{
              width:`${cloumnWidths[colIndex]}px`,
              ...rowStyle[colIndex],
           }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from "uuid";
import useScreen from "../../hooks/useScreen";
import { ref, watch} from "vue";
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";

const defaultConfig = {
  //标题数据
  headerData: [],
  //标题样式
  headerStyle: [],
  //标题背景色
  headerBg: "rgb(255,255,255)",
  //标题的高度
  headerHeight: 35,
  //是否展示序号
  headerIndex: false,
  //序号展示内容
  headerIndexContent: "#",
  //序号的样式
  headerIndexStyle: {width: "50px"},
  //数据项,二维数组
  data: [],
  //需要显示多少行数据
  rowNum: 10,
  //行样式
  rowStyle: [],
  //行中序号列样式
  rowIndexStyle: {width: "50px"},
  //行背景色
  rowBg: [],
  //行居中方式
  aligns: [],
  //标题的字体大小
  headerFontSize: 28,
  //行中的字体大小
  rowFontSize: 28,
  //标题的的颜色
  headerColor: "blue",
  //行的颜色
  rowColor: 'red',
  //动画移动个数
  moveNum: 1,
  //动画时长S
  duration: 2000,

  //序号列的数据内容
  headerIndexData: []
}

export default {
  name: 'scrollList',
  props: {
    //用户传入的config数据
    config: {
      type: Object,
      default: () => ({})

    }
  },
  setup(props) {
    //生成id,并获取容器的宽高
    const id = `base-scroll-list-${uuidv4()}`
    const {width, height} = useScreen(id)
    //获取用户传入的参数
    const atcualConfig = ref({})
    const headerData = ref([])
    const headerStyle = ref([])
    const cloumnWidths = ref([])
    const rowBg = ref([])
    //每行数据
    const rowsData = ref([])
    const rowHeights = ref([])
    const rowNum = ref(defaultConfig.rowNum)
    const rowStyle = ref([])
    const aligns = ref([])
    const duration = ref(0)
    //行高
    let avgHeight;
    //真正需要渲染的数据
    const currentRowData = ref([])
    //动画指针
    const currentIndex = ref(0)
    //是否开启动画
    const isAnimationStart = ref(true)
    //处理标题函数
    const handleHeader = (config) => {
      const _headerData = cloneDeep(config.headerData)
      const _headerStyle = cloneDeep(config.headerStyle)
      const _rowsData = cloneDeep(config.data)
      const _rowStyle = cloneDeep(config.rowStyle)
      const _aligns = cloneDeep(config.aligns)
      const _duration = cloneDeep(config.duration)

      //如果没有长度就不需要渲染
      if (config.headerData.length === 0) {
        return
      }
      //如果需要加序号
      if (config.headerIndex) {
        //吧序号内容加入到data信息首位
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
        _rowStyle.unshift(config.rowIndexStyle)
        _aligns.unshift("center")
        //添加序号数字
        _rowsData.forEach((item, index) => {
          if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]) {
            item.unshift(config.headerIndexData[index])
          }
        })
      }

      // 动态计算header中每一列的宽度
      let usedWidth = 0
      let usedColumnNum = 0
      // 判断是否自定义width
      _headerStyle.forEach(style => {
        // 如果自定义width，则按照自定义width进行渲染
        if (style.width) {
          usedWidth += +style.width.replace("px", "")
          usedColumnNum++
        }
      })
      const avgWith = (width.value - usedWidth) / (_headerData.length - usedColumnNum)
      const _cloumnWidths = new Array(_headerData.length).fill(avgWith)
      //传入的宽度加入cloumnWidths中
      _headerStyle.forEach((item, index) => {
        if (item.width) {
          _cloumnWidths[index] = +item.width.replace("px", "")
        }
      })
      cloumnWidths.value = _cloumnWidths
      headerData.value = _headerData
      headerStyle.value = _headerStyle


      rowStyle.value = _rowStyle
      aligns.value = _aligns
      duration.value = _duration
      const {rowNum} = config
      //如果实际数大于需要展示数据,而且实际数据小于需要展示数据两倍
      if (_rowsData.length > rowNum && _rowsData.length < rowNum * 2) {
        //让rowData扩容为两倍
        const newData = [..._rowsData, ..._rowsData]
        rowsData.value = newData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      }
    }


    const handelRow = (config) => {
      //更新rowNum
      rowNum.value = config.rowNum
      const {headerHeight} = config
      const unuseHeight = height.value - headerHeight

      //如果rowNum大于实际数据长度,则显示数据长度为准  , 如果rowNum小于于实际数据长度,则显示rowNum长度为准
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length
      }

      avgHeight = unuseHeight / rowNum.value
      //显示平均每行的高度
      rowHeights.value = new Array(rowNum.value).fill(avgHeight)
      //获取行背景色
      if (config.rowBg) {
        rowBg.value = config.rowBg
      }

    }
    const startAnimation = async () => {
      if (!isAnimationStart.value) return
      const config = atcualConfig.value
      const { rowNum, moveNum} = config
      const totalLength = rowsData.value.length
      //如果实际数据小于需要展示数据,就没有动画
      if (totalLength < rowNum) {
        return
      }
      //动画指针
      const index = currentIndex.value
      // ["1"."2","3","4","5"]
      // ["2","3","4","5","1"]
      const _rowsData = cloneDeep(rowsData.value)

      //切分到指针以后的数据
      const rows = _rowsData.splice(index)
      rows.push(..._rowsData.splice(0, index))

      currentRowData.value = rows
      currentIndex.value += moveNum
      //将 所有行的高度还原
      rowHeights.value = new Array(totalLength).fill(avgHeight)
      const waitTime = 300
      if (!isAnimationStart.value) return
      await new Promise(resolve => setTimeout(resolve, waitTime))

      //将moveNum行高还原,splice(0,2,...[0,0])
      rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0))
      //是否达到最后一行数据
      const isLast = currentIndex.value - totalLength
      if (isLast >= 0) {
        currentIndex.value = isLast
      }
      if (!isAnimationStart.value) return
      //sleep
      await new Promise(resolve => setTimeout(resolve, duration.value - waitTime))
      await startAnimation()
    }
    const stopAnimation = () => {
      isAnimationStart.value = false
    }
    const update = () => {
      stopAnimation()
      //合并传入的config和默认的config,放在前面的会被后面覆盖交集
      const _atcualConfig = assign(defaultConfig, props.config)
      //赋值列表数据
      rowsData.value = _atcualConfig.data || []
      handleHeader(_atcualConfig)
      handelRow(_atcualConfig)
      atcualConfig.value = _atcualConfig
      isAnimationStart.value = true
      //开启动画
      startAnimation()

    }
    watch(() => props.config, () => {
      update()
    })


    return {
      id,
      height,
      rowHeights,
      headerData,
      headerStyle,
      cloumnWidths,
      rowsData,
      rowStyle,
      rowBg,
      aligns,
      //用户传入配置和默认配置混合
      atcualConfig,
      currentRowData
    }
  }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;

  .base-scroll-list-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;

  }

  .base-scroll-list-header {

    display: flex;
    align-items: center;

    .header-item {

    }
  }

  .base-scroll-list-rows-wrapper {
    overflow: hidden;

    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;

      .base-scroll-list-columns {
        height: 100%;
      }
    }
  }


}
</style>
