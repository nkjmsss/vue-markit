import { css, Interpolation } from 'emotion'
import Emitter from './Utils/Emitter'
import { Events, EventName } from './Events'
import toPascalCase from './Utils/toPascalCase'
import Node from './Nodes/Node'
import {
  Paragraph, //
  BulletList,
} from './Nodes/Blocks'
import baseStyle from './Styles'

export interface EditorConfiguration {
  Nodes?: (typeof Node)[]
  StyleOverides: Interpolation
}

export default class Editor extends Emitter<EventName> {
  coreNodes: (typeof Node)[] = [Paragraph]
  options: Required<EditorConfiguration> = {
    Nodes: [
      BulletList, //
    ],
    StyleOverides: {},
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
    const styles = [baseStyle]

    this.coreNodes.concat(this.options.Nodes).forEach(cls => {
      const node = new cls(this.target)
      styles.push(node.styles)
    })

    // override styles
    styles.push(this.options.StyleOverides)

    // finally, apply style to the target element
    this.target.classList.add(css(styles))
  }
}
