import { FormButton, FormButtonArgs } from './form-button'

export class FormButtonSet {
  readonly labelActions?: FormButton[]

  protected constructor(args: FormButtonSetArgs) {
    if (args.labelActions) {
      this.labelActions = args.labelActions.map((a) => FormButton.build(a))
    }
  }

  static build(args: FormButtonSetArgs) {
    return new FormButtonSet(args)
  }
}

export interface FormButtonSetArgs {
  labelActions?: FormButtonArgs[]
}
