// import { FormUITheme, FormUIThemes } from './form-builder-ui-theme'

export interface FormBuilderUIAttributes {
  // theme: FormUITheme
  stylesheets: string[]
  icons: string
}

export class FormBuilderUI implements FormBuilderUIAttributes {
  // theme: FormUITheme
  stylesheets: string[]
  icons: string

  constructor(args: FormBuilderUIAttributes) {
    // this.theme = args.theme
    this.stylesheets = args.stylesheets
    this.icons = args.icons
  }

  static default(): FormBuilderUI {
    return new FormBuilderUI({
      // theme: FormUIThemes.mosaic(),
      stylesheets: [
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
      ],
      icons: 'bi',
    })
  }

  patch(args: Partial<FormBuilderUIAttributes>): void {
    Object.entries(args).forEach(([key, value]) => {
      this[key as keyof FormBuilderUIAttributes] = value as never
    })
  }
}
