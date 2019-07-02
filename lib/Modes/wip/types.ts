export interface ModeConfigurarion {
  allowAtxHeaderWithoutSpace?: boolean
  highlightFormatting?: boolean
  maxBlockquoteDepth?: number
  taskLists?: boolean
  strikethrough?: boolean
  emoji?: boolean
  fencedCodeBlockHighlighting?: boolean
  xml?: boolean
  tokenTypeOverrides?: TokenTypes
}

export interface TokenTypes {
  header?: string
  code?: string
  quote?: string
  list1?: string
  list2?: string
  list3?: string
  hr?: string
  image?: string
  imageAltText?: string
  imageMarker?: string
  formatting?: string
  linkInline?: string
  linkEmail?: string
  linkText?: string
  linkHref?: string
  em?: string
  strong?: string
  strikethrough?: string
  emoji?: string
}

export type State = {
  [key in keyof TokenTypes]?: number
}
