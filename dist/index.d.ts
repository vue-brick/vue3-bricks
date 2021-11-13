import { App } from 'vue';
export { textDefaultProps, textStylePropNames, TextComponentProps, imageDefaultProps, imageStylePropsNames, ImageComponentProps, shapeDefaultProps, shapeStylePropsNames, ShapeComponentProps, AllComponentProps } from './defaultProps';
import './main.css';
import LText from './components/LText';
import LImage from './components/LImage';
import LShape from './components/LShape';
import IndexFeature from './components/IndexFeature';
import FlyBox from "./components/FlyBox";
import VueEcharts from "./components/VueEcharts";
import Container from "./components/Container";
import VueCountTo from "./components/VueCountTo";
import BaseScrollListPro from "./components/BaseScrollListPro";
import timeNumber from "./components/timeNumber";
declare const install: (app: App) => void;
export { LText, LImage, LShape, IndexFeature, FlyBox, VueEcharts, Container, timeNumber, VueCountTo, BaseScrollListPro, install };
declare const _default: {
    install: (app: App<any>) => void;
};
export default _default;
