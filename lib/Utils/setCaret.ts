type range = { start: number; end: number } | 'all'

function setCaret(node: HTMLElement, position: 'before' | 'after'): void
function setCaret(node: HTMLElement, position: 'inside', range?: range): void
function setCaret(
  node: HTMLElement,
  position: 'before' | 'after' | 'inside',
  range?: range
): void {
  const Selection = window.getSelection()
  const Range = document.createRange()

  switch (position) {
    case 'before':
      Range.setStartBefore(node)
      Range.collapse(true)
      break

    case 'after':
      Range.setStartAfter(node)
      Range.collapse(true)
      break

    case 'inside':
      switch (range) {
        // move caret to the last of the node
        case undefined:
          Range.setStart(node, node.childNodes.length)
          Range.collapse(true)
          break

        // select all inside of the node
        case 'all':
          Range.selectNodeContents(node)
          break

        default:
          Range.setStart(node, range.start)
          Range.setEnd(node, range.end)
          break
      }
  }

  if (Selection) {
    Selection.removeAllRanges()
    Selection.addRange(Range)
  }
}

export default setCaret
