import { Key } from 'ts-keycode-enum'
import Node from '../Node'

export default class BulletList extends Node {
  constructor(target: HTMLElement) {
    super(target, 'block', 'bullet-list')

    this.init()
  }

  private init(): void {}
}
