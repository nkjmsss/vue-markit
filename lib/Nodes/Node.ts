import Store from './Core/Store'

const storeInstance = new Store()

interface NodeStore extends Store {
  on: (event: 'keydown', fn: (e: KeyboardEvent) => void) => this
}

export class Node {
  target: HTMLElement
  type!: 'block' | 'inline'
  name!: string
  state: NodeStore = storeInstance

  constructor(target: HTMLElement) {
    this.target = target
    this._initStore()
  }

  private _initStore(): void {
    if (!this.state.initialized) {
      this.state.initialized = true

      this.target.addEventListener('keydown', e => {
        this.state.emit('keydown', e)
      })
    }
  }
}
