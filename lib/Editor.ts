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
  }
  value: string = ''

  constructor(
    elt: HTMLTextAreaElement,
    options?: Codemirror.EditorConfiguration,
    value?: string
  ) {
    super()

    this.setOptions(options || {})

    this.codemirror = Codemirror.fromTextArea(elt, this.options)

    this.setValue(value)
    this.setEmitEvents()
  }

  setOptions(options: Codemirror.EditorConfiguration): void {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  setValue(value): void {
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
