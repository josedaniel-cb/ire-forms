import { FormBuilder } from './form/form-builder'

const form = FormBuilder.build({
  fields: {
    textField: FormBuilder.text({
      label: 'A text input field',
    }),
    selectField: FormBuilder.select({
      label: 'A select field',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
    }),
    multipleSelectField: FormBuilder.multiSelect({
      label: 'A select field',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    }),
    aFieldSet: FormBuilder.fieldset({
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
    }),
  },
})

form.fields.multipleSelectField // MultiSelectFieldProps<string>
form.value.multipleSelectField // string[]

form.value.aFieldSet.nestedMultipleSelectField // string[]
form.fields.aFieldSet.nestedMultipleSelectField.value // string[]
form.fields.aFieldSet.aFieldSet.nestedMultipleSelectField // MultiSelectFieldProps<string>

form.patchFields({
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