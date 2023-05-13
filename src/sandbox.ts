type FormFieldType = 'text-input' | 'select' | 'multi-select'

interface FormFieldBase {
  type: FormFieldType
  label: string
}

interface TextInputField extends FormFieldBase {
  type: 'text-input'
}

interface SelectField<T> extends FormFieldBase {
  type: 'select'
  defaultValue: T
  options: Array<{ label: string; value: T }>
}

interface MultiSelectField<T> extends FormFieldBase {
  type: 'multi-select'
  options: Array<{ label: string; value: T }>
}

interface FieldSet<T extends FormConfig> {
  fields: T['fields']
}

type FormField =
  | TextInputField
  | SelectField<any>
  | MultiSelectField<any>
  | FieldSet<any>

type FormConfig = {
  fields: Record<string, FormField>
}

type FormValueTree<T extends FormConfig> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextInputField
    ? string
    : T['fields'][K] extends SelectField<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectField<infer R>
    ? R[]
    : T['fields'][K] extends FieldSet<infer F>
    ? FormValueTree<F>
    : never
}

type FormFieldsTree<T extends FormConfig> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextInputField
    ? TextInputField
    : T['fields'][K] extends SelectField<infer R>
    ? SelectField<R>
    : T['fields'][K] extends MultiSelectField<infer R>
    ? MultiSelectField<R>
    : T['fields'][K] extends FieldSet<infer F>
    ? FormFieldsTree<F>
    : never
}

function defineForm<T extends FormConfig>(config: T): {
  value: FormValueTree<T>
  fields: FormFieldsTree<T>
} {
  // Aquí va la implementación de la función, por ejemplo, la creación y configuración de elementos del DOM
  // ...
  return {
    value: {} as FormValueTree<T>, // Esto es solo un ejemplo, debes reemplazarlo con la implementación real
    fields: {} as FormFieldsTree<T>,
  }
}

const form = defineForm({
  fields: {
    textField: {
      type: 'text-input',
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
          type: 'text-input',
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
})

form.value.selectField
form.fields.multipleSelectField

export const a = 1
