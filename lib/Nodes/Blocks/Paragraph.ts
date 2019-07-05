import { Key } from 'ts-keycode-enum'
import Node from '../Node'
import { wrap } from '../../Utils/wrap'
import { paragraph } from '../../Styles'

export default class Paragraph extends Node {
  styles = paragraph

  constructor(target: HTMLElement) {
    super(target, 'block', 'paragraph')

    this.init()
    this.registerKeyEvents()
  }

  private init(): void {
    document.execCommand('defaultParagraphSeparator', false, 'p')
    this.insertFirstParagraph()
    this.wrapTextNode()
  }

  private registerKeyEvents(): void {
    this.eventbus.on('keydown', e => {
      console.log(e)
      switch (e.keyCode) {
        case Key.Backspace:
          // don't allow removing first p tag
          if (!this.target.textContent && this.target.childNodes.length <= 1) {
            e.preventDefault()
          }
          break
      }
    })
  }

  private insertFirstParagraph(): void {
    if (!this.target.childNodes.length) {
      const p = document.createElement('p')
      const br = document.createElement('br')
      p.appendChild(br)
      this.target.appendChild(p)
    }
  }

  private wrapTextNode(): void {
    Array.from(this.target.childNodes).forEach(node => {
      if (node.nodeType === node.TEXT_NODE) {
        wrap(node, document.createElement('p'))
      }
    })
  }
}
