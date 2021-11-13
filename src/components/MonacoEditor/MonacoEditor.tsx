/* eslint no-use-before-define: 0 */

import {defineComponent, ref, onMounted, watch, onBeforeUnmount, shallowRef} from 'vue'

import * as Monaco from 'monaco-editor'

import type {PropType} from 'vue'
import {createUseStyles} from 'vue-jss'

const useStyles = createUseStyles({
    container: {
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        width: '100%',
    },
    title: {
        backgroundColor: '#eee',
        padding: '10px 0',
        paddingLeft: 20,
    },
    code: {
        flexGrow: 1
    }
})

export default defineComponent({
    name:'monaco',
    props: {
        type: {
            type: String,
            default: "javascript"
        },
        code: {
            type: String as PropType<string>,
            required: true
        },
        onChange: {
            type: Function as PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>,
            default: (v: any) => {
                console.log(v)
            },
        },

    },
    setup(props) {
// must be shallowRef, if not, editor.getValue() won't work
        const editorRef = shallowRef()

        const containerRefs = ref()

        let _subscription: Monaco.IDisposable | undefined
        let __prevent_trigger_change_event = false

        onMounted(() => {
            const editor = editorRef.value = Monaco.editor.create(containerRefs.value, {
                value: props.code,
                language: props.type,
                formatOnPaste: true,
                tabSize: 2,
                minimap: {
                    enabled: false,
                },
            })

            _subscription = editor.onDidChangeModelContent((event) => {
                if (!__prevent_trigger_change_event) {
                    props.onChange(editor.getValue(), event);
                }
            });
        })

        onBeforeUnmount(() => {
            if (_subscription)
                _subscription.dispose()
        })

        watch(() => props.code, (v) => {
            const editor = editorRef.value
            const model = editor.getModel()
            if (v !== model.getValue()) {
                editor.pushUndoStop();
                __prevent_trigger_change_event = true
// pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
                model.pushEditOperations(
                    [],
                    [
                        {
                            range: model.getFullModelRange(),
                            text: v,
                        },
                    ]
                );
                editor.pushUndoStop();
                __prevent_trigger_change_event = false
            }
// if (v !== editorRef.value.getValue()) {
//   editorRef.value.setValue(v)
// }
        })

        const classesRef = useStyles()

        return () => {

            const classes = classesRef.value

            return (
                <div class={classes.container}>
                    <div class={classes.code} ref={containerRefs}/>
                </div>
            )
        }
    }
})
