import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { css } from 'emotion'
import Editor, { EditorConfiguration } from '../Editor'

// TODO fix styles
const divStyle = css({
  border: '1px solid #bbb',
  // height: '80vh',
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
  options!: EditorConfiguration

  @Watch('options', {
    deep: true,
    immediate: true,
  })
  onOptionsChanged(newval: EditorConfiguration): void {
    if (this.editor) {
      this.editor.emit('optionChange', newval)
    }
  }

  mounted(): void {
    this.editor = new Editor(this.options)

    this.setEvents()
  }

  setEvents(): void {}

  render(h: CreateElement): VNode {
    return (
      <div class={divStyle} contenteditable>
        {this.value}
      </div>
    )
  }
}

export default VueMarkit
