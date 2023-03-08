type FormButtonMode = 'text' | 'filled' | 'outline'

export class FormButton {
  icon?: string
  readonly label?: string
  readonly mode: FormButtonMode
  readonly squareAspectRatio: boolean
  readonly rounded: boolean
  onClick: () => void

  protected constructor(args: FormButtonArgs) {
    this.icon = args.icon
    this.label = args.label
    this.mode = args.mode
    this.squareAspectRatio = args.squareAspectRatio
    this.rounded = args.rounded
    this.onClick = args.onClick
  }

  static build(args: FormButtonArgs) {
    return new FormButton(args)
  }
}

export interface FormButtonArgs {
  icon?: string
  label?: string
  mode: FormButtonMode
  rounded: boolean
  squareAspectRatio: boolean
  onClick: () => void
}

export interface FormButtonExternalArgs {
  label?: string
  icon?: string
  mode?: FormButtonMode
  rounded?: boolean
  squareAspectRatio?: boolean
  onClick: () => void
}

export const makeIconButtonArgs = (
  args: FormButtonExternalArgs
): FormButtonArgs => ({
  ...args,
  mode: args.mode ?? 'text',
  rounded: args.rounded ?? true,
  squareAspectRatio: args.squareAspectRatio ?? true,
})

export const makeButtonArgs = (
  args: FormButtonExternalArgs
): FormButtonArgs => ({
  ...args,
  mode: args.mode ?? 'filled',
  rounded: args.rounded ?? false,
  squareAspectRatio: args.squareAspectRatio ?? false,
})
