import { Component, Vue, Prop } from 'vue-property-decorator'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import { VNode, CreateElement } from 'vue'
import Editor from '../Editor'

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

  mounted(): void {
    this.editor = new Editor(this.$refs.textarea as HTMLTextAreaElement, {
      ...this.options,
      value: this.value,
    })

    this.setEvents()
  }

  setEvents(): void {
    if (this.editor) {
      this.editor.on('change', c => {
        this.$emit('input', c.getValue())
      })
    }
  }

  render(h: CreateElement): VNode {
    return (
      <div>
        <textarea ref="textarea" />
      </div>
    )
  }
}

export default VueMarkit
