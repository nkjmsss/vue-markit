import { Component, Vue } from 'vue-property-decorator'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

@Component
class VueMarkit extends Vue {
  codemirror: Codemirror.EditorFromTextArea | undefined = void 0

  mounted() {
    this.codemirror = Codemirror.fromTextArea(this.$refs
      .textarea as HTMLTextAreaElement)
  }

  render(h) {
    return (
      <div>
        <textarea ref="textarea" />
      </div>
    )
  }
}

export default VueMarkit
