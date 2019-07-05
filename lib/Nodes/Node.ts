import { Interpolation } from 'emotion'
import Emitter from '../Utils/Emitter'
import Store from './Core/Store'
import EventBus from './Core/EventBus'

const storeInstance = new Store()
const eventbusInstanve = new EventBus()

const NodeEvents = [] as const

export default interface Node extends Emitter<(typeof NodeEvents)[any]> {}

export default class Node extends Emitter<(typeof NodeEvents)[any]> {
  target: HTMLElement
  type!: 'block' | 'inline'
  name!: string
  state = storeInstance
  eventbus = eventbusInstanve
  styles: Interpolation = {}

  constructor(target: HTMLElement) {
    super()

    this.target = target
    this._initEventBus()
    this._initStore()
  }

  private _initEventBus(): void {
    if (!this.eventbus.initialized) {
      this.eventbus.initialized = true

      this.target.addEventListener('keydown', e => {
        this.eventbus.emit('keydown', e)
      })
    }
  }

  private _initStore(): void {
    if (!this.state.initialized) {
      this.state.initialized = true

      // do some staff
      // ex) register some events
    }
  }
}
