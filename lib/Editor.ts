import { css, Interpolation } from 'emotion'
import {
  Emitter, //
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

export type EditorConfiguration = {
  Nodes: (typeof Node)[]
  StyleOverides: Interpolation
}

type EditorEvents = {}

export default class Editor extends Emitter<EditorEvents> {
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

    if (options) {
      this.setOptions(options)
    }
    this.init()
    this.registerEvents()
    this.initNodes()
  }

  init(): void {
    this.target.contentEditable = 'true'
  }

  setOptions(options: Partial<EditorConfiguration>): void {
    const keys = Object.keys(options) as (keyof EditorConfiguration)[]

    keys
      .filter(key => this.options[key] !== options[key])
      .forEach(<K extends keyof EditorConfiguration>(key: K) => {
        this.options[key] = options[key] as EditorConfiguration[K]
      })
  }

  registerEvents(): void {}

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
