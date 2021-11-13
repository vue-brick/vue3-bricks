/* eslint-disable */
import {App} from 'vue'

export {
    textDefaultProps, textStylePropNames, TextComponentProps,
    imageDefaultProps, imageStylePropsNames, ImageComponentProps,
    shapeDefaultProps, shapeStylePropsNames, ShapeComponentProps,
    AllComponentProps
} from './defaultProps'

import './main.css'   // 引入样式

import LText from './components/LText'
import LImage from './components/LImage'
import LShape from './components/LShape'
import IndexFeature from './components/IndexFeature'
import FlyBox from "./components/FlyBox";
import VueEcharts from "./components/VueEcharts";
import Container from "./components/Container";
import VueCountTo from "./components/VueCountTo";
import BaseScrollListPro from "./components/BaseScrollListPro"
// import monaco from "./components/MonacoEditor";

import timeNumber from "./components/timeNumber";

const components = [
    LText,
    LImage,
    LShape,
    IndexFeature,
    FlyBox,
    VueEcharts,
    Container,
    // monaco
    timeNumber,
    VueCountTo,
    BaseScrollListPro
]

const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    LText,
    LImage,
    LShape,
    IndexFeature,
    FlyBox,
    VueEcharts,
    Container,
    timeNumber,
    VueCountTo,
    BaseScrollListPro,
    // monaco,
    install
}
export default {
    install
}
