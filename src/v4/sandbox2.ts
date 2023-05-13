import { Form } from './form/form-controller'
import {
  FormFields,
  FormParams,
  FormFieldsPatch,
  FormValuePatch,
  FormValue,
} from './form/trees'

function defineForm<T extends FormParams>(config: T): Form<T> {
  // Aquí va la implementación de la función, por ejemplo, la creación y configuración de elementos del DOM
  // ...
  return {
    value: {} as FormValue<T>, // Esto es solo un ejemplo, debes reemplazarlo con la implementación real
    fields: {} as FormFields<T>,
    patch: {} as (config: FormFieldsPatch<T>) => void,
    patchValues: {} as (config: FormValuePatch<T>) => void,
  }
}

const form = defineForm({
  fields: {
    textField: {
      type: 'text',
      label: 'A text input field',
    },
    selectField: {
      type: 'select',
      label: 'A select field',
      defaultValue: 1,
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
    },
    multipleSelectField: {
      type: 'multi-select',
      label: 'A select field',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },
    aFieldSet: {
      fields: {
        nestedTextField: {
          type: 'text',
          label: 'A nexted text input field',
        },
        nestedSelectField: {
          type: 'select',
          label: 'A nested select field',
          defaultValue: 1,
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ],
        },
        nestedMultipleSelectField: {
          type: 'multi-select',
          label: 'A nested select field',
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ],
        },
        aFieldSet: {
          fields: {
            nestedTextField: {
              type: 'text',
              label: 'A nexted text input field',
            },
            nestedSelectField: {
              type: 'select',
              label: 'A nested select field',
              defaultValue: 1,
              options: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
              ],
            },
            nestedMultipleSelectField: {
              type: 'multi-select',
              label: 'A nested select field',
              options: [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ],
            },
          },
        },
      },
    },
  },
})

form.fields.multipleSelectField
form.value.multipleSelectField

form.value.aFieldSet.nestedMultipleSelectField
form.fields.aFieldSet.nestedMultipleSelectField.state.value
form.fields.aFieldSet.aFieldSet.nestedMultipleSelectField

form.patch({
  aFieldSet: {
    aFieldSet: {
      nestedMultipleSelectField: {
        options: [{ label: 'label', value: 'value' }],
      },
    },
  },
})

form.patchValues({
  aFieldSet: {
    aFieldSet: {
      nestedMultipleSelectField: ['value'],
    },
  },
})

export const a = 1
