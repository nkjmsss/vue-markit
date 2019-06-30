import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'
import Emitter from './Utils/Emitter'
import { CodemirrorEvents } from './Events'
import './Styles/codemirror'
import toPascalCase from './Utils/toPascalCase'

export default class Editor extends Emitter {
  codemirror: Codemirror.EditorFromTextArea
  options: Codemirror.EditorConfiguration = {
    inputStyle: 'contenteditable',
    lineNumbers: true,
    lineNumberFormatter: line =>
      line === 1 ||
      (this.codemirror
        ? line === this.codemirror.getDoc().getCursor().line + 1
        : false) ||
      line % 10 === 0
        ? String(line)
        : '',
    lineWrapping: true,
    mode: 'gfm',
    tabSize: 2,
    styleActiveLine: true,
  }

  constructor(
    elt: HTMLTextAreaElement,
    options?: Codemirror.EditorConfiguration
  ) {
    super()

    this.codemirror = Codemirror.fromTextArea(elt, this.options)

    this.setOptions(options)
    this.setEmitEvents()
    this.registerEvents()
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

  setEmitEvents(): void {
    CodemirrorEvents.forEach(ev => {
      this.codemirror.on(ev, () => {
        this.emit(ev, this.codemirror)
      })
    })
  }

  registerEvents(): void {
    CodemirrorEvents.forEach(ev => {
      const handlerName = `handle${toPascalCase(ev)}`

      if (this[handlerName]) {
        this.on(ev, this[handlerName])
      }
    })
  }

  handleCursorActivity(c: Codemirror.EditorFromTextArea): void {
    // update current line position by re-binding 'this'
    if (this.options.lineNumberFormatter) {
      this.setOptions({
        lineNumberFormatter: this.options.lineNumberFormatter.bind({
          codemirror: c,
        }),
      })
    }
  }
}
