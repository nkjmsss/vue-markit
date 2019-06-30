import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import '../Styles/codemirror'
import { css } from 'emotion'
import Editor from '../Editor'

// TODO fix styles
const divStyle = css({
  border: '1px solid #bbb',
  height: '60vh',
})

@Component
class VueMarkit extends Vue {
  editor: Editor | null = null

  @Prop({
    type: String,
    default: '',
  })
  value!: string

  @Prop({
    type: Object,
    default: () => ({}),
  })
  options!: Codemirror.EditorConfiguration

  @Watch('options', {
    deep: true,
    immediate: true,
  })
  onOptionsChanged(newval: Codemirror.EditorConfiguration): void {
    if (this.editor) {
      this.editor.emit('optionChange', newval)
    }
  }

  mounted(): void {
    this.editor = new Editor(
      this.$refs.textarea as HTMLTextAreaElement,
      this.options,
      this.value
    )

    this.setEvents()
  }

  setEvents(): void {
    const editor = this.editor

    if (editor) {
      editor.on('change', c => {
        this.$emit('input', c.getValue())
      })
      editor.on('optionChange', v => {
        editor.setOptions(v)
      })
    }
  }

  render(h: CreateElement): VNode {
    return (
      <div class={divStyle}>
        <textarea ref="textarea" />
      </div>
    )
  }
}

export default VueMarkit
