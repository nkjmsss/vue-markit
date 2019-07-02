import Emitter from './Utils/Emitter'
import { Events } from './Events'
import toPascalCase from './Utils/toPascalCase'

export interface EditorConfiguration {}

export default class Editor extends Emitter {
  options: EditorConfiguration = {}

  constructor(options?: EditorConfiguration) {
    super()

    this.setOptions(options)
    this.registerEvents()
  }

  setOptions(options: EditorConfiguration | undefined): void {
    if (!options) {
      return
    }

    Object.keys(options)
      .filter(key => this.options[key] !== options[key])
      .forEach(key => {
        this.options[key] = options[key]
      })
  }

  registerEvents(): void {
    Events.forEach(ev => {
      const handlerName = `handle${toPascalCase(ev)}`

      if (this[handlerName]) {
        this.on(ev, this[handlerName])
      }
    })
  }
}
