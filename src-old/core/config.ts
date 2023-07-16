import { CSSResult } from 'lit'
import { Themes } from '../ui/styles/themes'

export class FormConfig {
  // static theme = Themes.bootstrap
  static theme = Themes.mosaic

  static stylesheets: string[] = []

  static icons = ''

  // static get theme() {
  //   return FormConfig.#data.theme ?? Themes.bootstrap
  // }

  // static get stylesheets() {
  //   return FormConfig.#data.stylesheets ?? []
  // }

  // static get icons() {
  //   return FormConfig.#data.icons ?? ''
  // }

  // static readonly #data: {
  //   theme?: CSSResult
  //   stylesheets?: string[]
  //   icons?: string
  // } = {}

  static set(args: {
    theme?: CSSResult
    stylesheets?: string[]
    icons?: string
  }) {
    if (args.theme) {
      FormConfig.theme = args.theme
    }
    if (args.stylesheets) {
      FormConfig.stylesheets = args.stylesheets
    }
    if (args.icons) {
      FormConfig.icons = args.icons
    }
  }
}
