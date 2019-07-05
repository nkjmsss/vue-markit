import { Key } from 'ts-keycode-enum'
import { NodeBase } from '../Node'

export default class BulletList extends NodeBase {
  readonly isBlock = true
  readonly name = 'bullet-list'

  constructor(target: HTMLElement) {
    super(target)

    this.init()
  }

  private init(): void {}
}
