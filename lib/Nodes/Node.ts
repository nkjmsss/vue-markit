export class Node {
  target: HTMLElement
  type!: 'block' | 'inline'
  name!: string

  constructor(target: HTMLElement) {
    this.target = target
  }
}
