import Emitter from './Utils/Emitter'
import { Events } from './Events'
import toPascalCase from './Utils/toPascalCase'
import { Node } from './Nodes/Node'
import Paragraph from './Nodes/Blocks/Paragraph'

export interface EditorConfiguration {
  Nodes?: (typeof Node)[]
}

export default class Editor extends Emitter {
  coreNodes: (typeof Node)[] = [Paragraph]
  options: Required<EditorConfiguration> = {
    Nodes: [],
  }
  private target: HTMLElement

  // TODO initial value and paste event
  constructor(
    target: HTMLElement,
    value: string,
    options?: EditorConfiguration
  ) {
    super()

    this.target = target

    this.setOptions(options)
    this.init()
    this.registerEvents()
    this.initNodes()
  }

  init(): void {
    this.target.contentEditable = 'true'
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

  initNodes(): void {
    this.coreNodes.concat(this.options.Nodes).forEach(cls => {
      new cls(this.target)
    })
  }
}
