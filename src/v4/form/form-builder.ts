import { Form } from './form-controller'
import { FormDefinition } from './form-definition'
import { FormFields, FormFieldsPatch, FormValue, FormValuePatch } from './trees'

export class FormBuilder {
  static build<T extends FormDefinition>(params: T): Form<T> {
    // Aquí va la implementación de la función, por ejemplo, la creación y configuración de elementos del DOM
    // ...
    return {
      value: {} as FormValue<T>, // Esto es solo un ejemplo, debes reemplazarlo con la implementación real
      fields: {} as FormFields<T>,
      patch: {} as (config: FormFieldsPatch<T>) => void,
      patchValues: {} as (config: FormValuePatch<T>) => void,
    }
  }
}
