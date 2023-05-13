import {
  FormParams,
  FormValue,
  FormValuePatch,
  FormFields,
  FormFieldsPatch,
} from './trees'

export interface Form<T extends FormParams> {
  fields: FormFields<T>
  value: FormValue<T>
  patch(config: FormFieldsPatch<T>): void
  patchValues(values: FormValuePatch<T>): void
}

export class FormController<T extends FormParams> implements Form<T> {
  fields: FormFields<T>

  value: FormValue<T>

  constructor({
    fields,
  }: {
    fields: FormFields<T>
  }) {
    this.fields = fields
  }

  patch(patch: FormFieldsPatch<T>): void {
    throw new Error('Method not implemented.')
  }

  patchValues(values: FormValuePatch<T>): void {
    throw new Error('Method not implemented.')
  }
}
