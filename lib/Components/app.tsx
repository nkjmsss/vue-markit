import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import Editor, { EditorConfiguration } from '../Editor'

@Component
class VueMarkit extends Vue {
  editor: Editor | null = null

  @Prop({
    type: String,
    default: '',
  })
  value!: string

  // TODO
  // @Prop({
  //   type: String,
  //   default: 'What do you feel?',
  // })
  // placeholder!: string

  @Prop({
    type: Object,
    default: () => ({}),
  })
  options!: EditorConfiguration

  @Watch('options', {
    deep: true,
    immediate: true,
  })
  onOptionsChanged(newval: EditorConfiguration): void {}

  mounted(): void {
    this.editor = new Editor(
      this.$refs.target as HTMLElement,
      this.value,
      this.options
    )

    this.setEvents()
  }

  setEvents(): void {}

  render(h: CreateElement): VNode {
    return <article ref="target"></article>
  }
}

export default VueMarkit
