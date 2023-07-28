import { bootstrapCss } from './theme-css/bootstrap-css'
import { mosaicCss } from './theme-css/mosaic-css'
import { CSSResult } from 'lit'

export class FormUIThemes {
  static readonly mosaic = () => new FormUITheme(mosaicCss)
  static readonly bootstrap = () => new FormUITheme(bootstrapCss)
}

export class FormUITheme {
  readonly css: CSSResult

  constructor(css: CSSResult) {
    this.css = css
  }
}
