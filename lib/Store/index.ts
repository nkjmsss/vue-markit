import { StoreBase } from '../Utils'

export default class Store extends StoreBase<
  Store['state'],
  Store['mutations']
> {
  protected state: {
    childNodes: Node[]
  } = {
    childNodes: [],
  }

  protected readonly mutations = {
    setChildNodes: (payload: Store['state']['childNodes']) => {
      this.state.childNodes = payload
    },
  }

  constructor() {
    super()
    this.init()
  }
}
