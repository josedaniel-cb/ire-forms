# ire-forms

Lit Element forms with Bootstrap CSS styles. Let the editor guide you. As a Web Component, its compatible with React, Angular, Vue, and more.

Do you need super fast forms and deligful typing? You are in the right place.

## Usage

Use `FormBuilder` for creating a form controller.

```ts
import { FormBuilder } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    firstName: FormBuilder.text({
      label: "First Name",
      placeholder: "Enter your first name",
    }),
    birthDate: FormBuilder.text({
      label: "Birth Date",
      inputType: "date",
      max: "2024-01-01",
    }),
    resume: FormBuilder.file({
      label: "Resume",
      accept: ".pdf,.doc,.docx",
    }),
  },
})
```

Then use it for rendering an `ire-form` element.

`ExampleForm.vue`

```html
<template>
  <ire-form :controller="form" />
</template>
```

Remember `ire-form` is a Web Component, so you need to ensure to import `"ire-forms"` in the same component or file you will use it.

You can access to the values this way.

```ts
form.value.firstName // string
form.fields.firstName.value // string
```

You can also change the state

```ts
form.fields.age.patch({
  value: "Daniel",
  placeholder: "Your name",
})

// Or accessing to the proxies
form.fields.firstName.value = "Daniel"
form.fields.firstName.uiState.placeholder = "Your name"
```

## Events

You can subscribe to value and rendering changes

```ts
import { FormBuilder } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    firstName: FormBuilder.text({
      ...
      onValueStateChange: ({ value, validationResult }) => {
        console.log(value) // string
        console.log(validationResult.errorMessage) // string | null
      },
      onUiStateChange: ({ htmlElement }) => {
        console.log(htmlElement) // IreTextElement
        htmlElement?.addEventListener('click', () => {
          console.log('Clicked!')
        })
      }
    }),
    ...
  },
})
```

Its possible to subscribe in a (?) way

```ts
form.fields.firstName.valueStateChanges.subscribe(
  ({ value, validationResult }) => {
    console.log(value) // string
    console.log(validationResult.errorMessage) // string | null
  },
)

form.fields.firstName.uiStateChanges.subscribe(({ htmlElement }) => {
  console.log(htmlElement) // IreTextElement
  htmlElement?.addEventListener("click", () => {
    console.log("Clicked!")
  })
})
```

## Validation

Check fields validity and create custom validators

```ts
import { FormBuilder } from 'ire-forms'

const form = FormBuilder.build({
  fields: {
    age: FormBuilder.text({
      ...
      validators: [
        (value) => {
          if (Number.parseInt(value) === 20) {
            return 'Age cannot be 20'
          }
        }
      ]
    })
  }
})

const submit = () => {
  if (!form.isValid) {
    alert('Form is not valid')
  }

  console.log(form.value) // { age: string }
}
```

## Fields

The following table shows the main properties of the available fields.

| Field                            | `FormBuilder` function | Value type  | HTML referent             |
| -------------------------------- | ---------------------- | ----------- | ------------------------- |
| `TextFieldDefinition`            | `text`                 | `string`    | `<input type="text">`     |
| `NativeSelectFieldDefinition<T>` | `nativeSelect`         | `T \| null` | `<select>`                |
| `RadiosFieldDefinition<T>`       | `radios`               | `T \| null` | `<input type="radio">`    |
| `ChipsFieldDefinition<T>`        | `chips`                | `T[]`       | Custom `<select>`         |
| `CheckboxesFieldDefinition<T>`   | `checkboxes`           | `T[]`       | `<input type="checkbox">` |
| `FileFieldDefinition`            | `file`                 | `File[]`    | `<input type="file">`     |

### Text

`TextField` is the controls `<input>` element.

```ts
import { FormBuilder } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    age: FormBuilder.text({
      label: "Age",
      inputType: "number",
      min: "18",
      max: "120",
      step: "1",
    }),
  },
})

// Change state
form.fields.age.value = "21"
form.fields.age.uiState.placeholder = "Enter your age"
form.fields.age.patch({
  value: "22",
  placeholder: "Enter your age",
})
```

### Select and Radios

`NativeSelectField` controls `<select>` element and `RadiosField` controls `<input type="radio">` elements. They are single select fields.

```ts
import { FormBuilder } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    fruit: FormBuilder.nativeSelect({
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple 🍎" },
        { value: "banana", label: "Banana 🍌" },
        { value: "orange", label: "Orange 🍊" },
      ],
    }),
  },
})

// Change value
form.fields.fruit.value = "banana" // 🍌
form.fields.fruit.valueState.index = 2 // 🍊

// Add a new option
form.fields.fruit.patch({
  options: [
    ...form.fields.fruit.valueState.options,
    { value: "watermelon", label: "Watermelon 🍉" },
  ],
})
```

### Chips and Checkboxes

`ChipsField` is a custom `<select>` element controller and `CheckboxesField` controls `<input type="checkbox">` elements. Both are multi select fields.

You can choose tons of icons thanks to [last-icon](https://www.npmjs.com/package/last-icon).

```ts
import { FormBuilder, Icon, html } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    fruit: FormBuilder.chips({
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple 🍎" },
        { value: "banana", label: "Banana 🍌" },
        { value: "orange", label: "Orange 🍊" },
      ],
      removeIcon: Icon.bootstrap("x-circle-fill"),
    }),
    animal: FormBuilder.checkboxes({
      label: "Animals",
      options: [
        { value: 1, label: "Cat 🐈" },
        { value: 2, label: "Dog 🐕" },
        { value: 3, label: "Mouse 🐁" },
      ],
      optionHtmlTemplateBuilder: (option, index) => {
        // Use Lit Element html template
        return html`<span>${index + 1} ${option.label}</span>`
      },
    }),
  },
})

// Change value
form.fields.fruit.value = ["banana"] // [🍌]

// Add a new option
form.fields.animal.patch({
  options: [
    ...form.fields.animal.valueState.options,
    { value: 4, label: "Fish 🐟" },
  ],
})
```

### File

`FileField` controls `<input type="file">` element.

```ts
import { FormBuilder } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    fruit: FormBuilder.file({
      label: "Fruits",
      buttonText: "Select a file",
      multiple: true, // false by default
      accept: "image/*",
    }),
  },
})

// Change value
form.fields.fruit.value = [someFile] // File[] even if not multiple

// Change UI
form.fields.fruit.uiState.placeholder = "Choose a fruit"
```

## Responsiveness

You can group fields by using `FormBuilder.fieldset`. `FormUILayouts.autoGrid` is the easiest way to have responsiveness.

So, this styles

```css
.auto-grid {
  --auto-grid-min-size: 10rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--auto-grid-min-size)), 1fr)
  );
  grid-auto-flow: dense;
}
```

could be applied this way

```ts
import { FormBuilder, FormUILayouts } from "ire-forms"

const form = FormBuilder.build({
  fields: {
    personalInfo: FormBuilder.fieldset({
      uiConfig: {
        layout: FormUILayouts.autoGrid, // 10rem
      },
      fields: {
        firstName: FormBuilder.text({
          label: "First Name",
        }),
        lastName: FormBuilder.text({
          label: "Last Name",
        }),
      },
    }),
    skills: FormBuilder.fieldset({
      uiConfig: {
        layout: FormUILayouts.autoGridRem(22), // 22rem
      },
      fields: {
        languages: FormBuilder.chips({
          label: "Languages",
          options: [
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
          ],
        }),
        frameworks: FormBuilder.checkboxes({
          label: "Frameworks",
          options: [
            { value: "react", label: "React" },
            { value: "angular", label: "Angular" },
            { value: "vue", label: "Vue" },
          ],
        }),
      },
    }),
  },
})
```
