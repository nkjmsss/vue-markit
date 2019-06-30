import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import Emitter from './Utils/Emitter'
import { CodemirrorEvents } from './Events'

export default class Editor extends Emitter {
  codemirror: Codemirror.EditorFromTextArea
  options: Codemirror.EditorConfiguration = {
    autofocus: true,
    inputStyle: 'contenteditable',
    lineWrapping: true,
    tabSize: 2,
    mode: 'gfm', // TODO create my own type
  }
  value!: string

  constructor(
    elt: HTMLTextAreaElement,
    options?: Codemirror.EditorConfiguration,
    value?: string
  ) {
    super()

    this.codemirror = Codemirror.fromTextArea(elt, this.options)

    this.setOptions(options)
    this.setValue(value)
    this.setEmitEvents()
  }

  setOptions(options: Codemirror.EditorConfiguration | undefined): void {
    if (!options) {
      return
    }

    Object.keys(options)
      .filter(key => this.options[key] !== options[key])
      .forEach(key => {
        this.codemirror.setOption(key, options[key])
        this.options[key] = options[key]
      })
  }

  setValue(value: string | undefined): void {
    if (!value) {
      return
    }

    this.value = value
    if (this.codemirror) {
      this.codemirror.setValue(this.value)
    }
  }

  setEmitEvents(): void {
    CodemirrorEvents.forEach(ev => {
      this.codemirror.on(ev, () => {
        this.emit(ev, this.codemirror)
      })
    })
  }
}
