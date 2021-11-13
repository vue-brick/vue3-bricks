import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    boxColor: {
        type: StringConstructor[];
        default: string;
    };
    boxWidth: {
        type: NumberConstructor;
        default: number;
    };
    lineWidth: {
        type: NumberConstructor;
        default: number;
    };
    startColor: {
        type: StringConstructor[];
        default: string;
    };
    startLength: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    duration: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, {
    width: Ref<number>;
    height: Ref<number>;
    flyBoxDom: any;
    path: import("vue").ComputedRef<string>;
    pathId: string;
    radialGradientId: string;
    maskId: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    boxColor: string;
    boxWidth: number;
    lineWidth: number;
    startColor: string;
    startLength: string | number;
    duration: string | number;
} & {}>, {
    boxColor: string;
    boxWidth: number;
    lineWidth: number;
    startColor: string;
    startLength: string | number;
    duration: string | number;
}>;
export default _default;
