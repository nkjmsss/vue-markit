import { Interpolation } from 'emotion'
import {
  Emitter, //
  Store,
  EventBus,
} from '../Utils'

const NodeEvents = [] as const

export default interface Node extends Emitter<(typeof NodeEvents)[any]> {}

export default class Node extends Emitter<(typeof NodeEvents)[any]> {
  readonly functional?: boolean
  readonly isBlock?: boolean
  readonly name?: string
  readonly target: HTMLElement
  readonly state: Store
  readonly eventbus: EventBus
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
