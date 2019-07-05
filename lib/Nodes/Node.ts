import { Interpolation } from 'emotion'
import Emitter from '../Utils/Emitter'
import Store from './Core/Store'

const storeInstance = new Store()

const NodeEvents = [
  'keydown', //
] as const

export interface Node extends Emitter<(typeof NodeEvents)[any]> {
  on(event: 'keydown', fn: (e: KeyboardEvent) => void)
}

export class Node extends Emitter<(typeof NodeEvents)[any]> {
  target: HTMLElement
  type!: 'block' | 'inline'
  name!: string
  state = storeInstance
  styles: Interpolation = {}

  constructor(target: HTMLElement) {
    super()

    this.target = target
    this._init()
    this._initStore()
  }

  private _init(): void {
    this.target.addEventListener('keydown', e => {
      this.emit('keydown', e)
    })
  }

  private _initStore(): void {
    if (!this.state.initialized) {
      this.state.initialized = true

      // do some staff
      // ex) register some events
    }
  }
}
