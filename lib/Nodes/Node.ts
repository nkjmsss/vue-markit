import { Interpolation } from 'emotion'
import {
  Emitter, //
  EventBus,
} from '../Utils'
import Store from '../Store'

type NodeEvents = {}

export default class Node extends Emitter<NodeEvents> {
  readonly functional?: boolean
  readonly isBlock?: boolean
  readonly name?: string
  protected readonly target: HTMLElement
  protected readonly state: Store
  protected readonly eventbus: EventBus
  styles: Interpolation = {}

  constructor(target: HTMLElement, state: Store, eventbus: EventBus) {
    super()

    this.target = target
    this.state = state
    this.eventbus = eventbus
  }
}

export abstract class NodeBase extends Node {
  abstract readonly isBlock: boolean
  abstract readonly name: string
}

export abstract class FunctionalNode extends Node {
  readonly functional = true
}

export { Node }
