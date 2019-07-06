import { Key } from 'ts-keycode-enum'
import { NodeBase } from '../Node'
import Store from '../../Store'
import {
  EventBus, //
} from '../../Utils'

export default class BulletList extends NodeBase {
  readonly isBlock = true
  readonly name = 'bullet-list'

  constructor(target: HTMLElement, state: Store, eventbus: EventBus) {
    super(target, state, eventbus)

    this.init()
  }

  private init(): void {}
}
