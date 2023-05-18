import { FormDefinition } from './form-definition'
import { FormValue, FormValuePatch, FormFields, FormFieldsPatch } from './trees'

export interface Form<T extends FormDefinition> {
  fields: FormFields<T>
  value: FormValue<T>
  patch(patch: FormFieldsPatch<T>): void
  patchValues(patch: FormValuePatch<T>): void
}

export class FormController<T extends FormDefinition> implements Form<T> {
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

  patchValues(patch: FormValuePatch<T>): void {
    throw new Error('Method not implemented.')
  }
}
