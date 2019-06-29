import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import Emitter from './Utils/Emitter'
import Events, { codemirrorEvents } from './Events'

export default class Editor extends Emitter {
  codemirror: Codemirror.EditorFromTextArea
  options: Codemirror.EditorConfiguration = {
    autofocus: true,
    inputStyle: 'contenteditable',
    lineWrapping: true,
    tabSize: 2,
    value: '',
  }
  events = Events

  constructor(
    elt: HTMLTextAreaElement,
    options?: Codemirror.EditorConfiguration
  ) {
    super()

    this.setOptions(options || {})

    this.codemirror = Codemirror.fromTextArea(elt, this.options)

    this.setValue()
    this.setEmitEvents()
  }

  setOptions(options: Codemirror.EditorConfiguration): void {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  setValue(): void {
    if (this.codemirror) {
      this.codemirror.setValue(this.options.value)
    }
  }

  setEmitEvents(): void {
    this.events.forEach(ev => {
      if (codemirrorEvents.some(v => v === ev)) {
        this.codemirror.on(ev, () => {
          this.emit(ev, this.codemirror)
        })
      }
    })
  }
}
