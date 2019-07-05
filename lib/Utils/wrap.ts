export default function wrap(el: Node, wrapper: HTMLElement): void {
  if (el.parentNode) {
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
  }
}
