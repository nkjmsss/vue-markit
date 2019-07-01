import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/selection/active-line'
import './Modes/alacarte-md'
import { ModeConfigurarion as ModeConfigurarionBase } from './Modes/types'
import Emitter from './Utils/Emitter'
import { CodeMirrorEvents } from './Events'
import './Styles/codemirror'
import toPascalCase from './Utils/toPascalCase'

export interface EditorConfiguration extends CodeMirror.EditorConfiguration {
  mode?: ModeConfigurarion | string
}

interface ModeConfigurarion extends ModeConfigurarionBase {
  name: string
}

export default class Editor extends Emitter {
  codemirror: CodeMirror.EditorFromTextArea
  options: EditorConfiguration = {
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
    mode: {
      name: 'alacarte-md',
      // highlightFormatting: true,
    },
    tabSize: 2,
    styleActiveLine: true,
  }

  constructor(
    elt: HTMLTextAreaElement,
    options?: CodeMirror.EditorConfiguration
  ) {
    super()

    this.codemirror = CodeMirror.fromTextArea(elt, this.options)

    this.setOptions(options)
    this.setEmitEvents()
    this.registerEvents()
  }

  setOptions(options: CodeMirror.EditorConfiguration | undefined): void {
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
    CodeMirrorEvents.forEach(ev => {
      this.codemirror.on(ev, () => {
        this.emit(ev, this.codemirror)
      })
    })
  }

  registerEvents(): void {
    CodeMirrorEvents.forEach(ev => {
      const handlerName = `handle${toPascalCase(ev)}`

      if (this[handlerName]) {
        this.on(ev, this[handlerName])
      }
    })
  }

  handleCursorActivity(c: CodeMirror.EditorFromTextArea): void {
    if (
      this.options.lineNumberFormatter &&
      c.getOption('lineNumberFormatter')
    ) {
      this.setOptions({
        lineNumberFormatter: c.getOption('lineNumberFormatter'),
      })
    }
  }
}
