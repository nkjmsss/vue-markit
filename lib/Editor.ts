import { css, Interpolation } from 'emotion'
import {
  toPascalCase, //
  Emitter,
  EventBus,
} from './Utils'
import Store from './Store'
import Node from './Nodes/Node'
import {
  Paragraph, //
  BulletList,
} from './Nodes/Blocks'
import { KeyboardEvents } from './Nodes/Core'
import baseStyle from './Styles'

export interface EditorConfiguration {
  Nodes?: (typeof Node)[]
  StyleOverides: Interpolation
}

const EventList = [] as const

export default class Editor extends Emitter<(typeof EventList)[any]> {
  private coreNodes: (typeof Node)[] = [
    Paragraph, //
    KeyboardEvents,
  ]
  private options: Required<EditorConfiguration> = {
    Nodes: [
      BulletList, //
    ],
    StyleOverides: {},
  }
  private target: HTMLElement
  readonly state = new Store()
  readonly eventbus = new EventBus()

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
    EventList.forEach(ev => {
      const handlerName = `handle${toPascalCase(ev)}`

      if (this[handlerName]) {
        this.on(ev, this[handlerName].bind(this))
      }
    })
  }

  initNodes(): void {
    const styles = [baseStyle]

    this.coreNodes.concat(this.options.Nodes).forEach(cls => {
      const node = new cls(this.target, this.state, this.eventbus)
      styles.push(node.styles)
    })

    // override styles
    styles.push(this.options.StyleOverides)

    // finally, apply style to the target element
    this.target.classList.add(css(styles))
  }
}
