import * as Monaco from 'monaco-editor';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    code: {
        type: PropType<string>;
        required: true;
    };
    onChange: {
        type: PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>;
        default: (v: any) => void;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    code: string;
    type: string;
    onChange: (value: string, event: Monaco.editor.IModelContentChangedEvent) => void;
} & {}>, {
    type: string;
    onChange: (value: string, event: Monaco.editor.IModelContentChangedEvent) => void;
}>;
export default _default;
