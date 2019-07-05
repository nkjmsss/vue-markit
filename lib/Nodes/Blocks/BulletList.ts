import { Key } from 'ts-keycode-enum'
import Node from '../Node'

export default class BulletList extends Node {
  constructor(target: HTMLElement) {
    super(target)

    this.type = 'block'
    this.name = 'bulletlist'

    this.init()
  }

  private init(): void {}
}
