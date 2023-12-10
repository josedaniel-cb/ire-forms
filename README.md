# ire-forms

**Lit Element Forms with Bootstrap Styles**

Enhance your web applications with ire-forms, a robust library that integrates Lit Element forms with Bootstrap CSS styles. Designed to be editor-friendly and compatible across various frameworks like React, Angular, Vue, and more, ire-forms offers a seamless experience for developers.

**Fast, Delightful Typing Experience**

Embrace a refined coding experience. Leveraging TypeScript's powerful typing features, this library seamlessly integrates with editor's intelligent code suggestions and auto-completion.

## Usage

To create a form controller, utilize the `FormBuilder` as follows:

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

Next, use it to render an ire-form element in your component, such as in `ExampleForm.vue`:

```html
<template>
  <ire-form :controller="form" />
</template>
```

Remember that `ire-form` is a Web Component, so ensure you import `"ire-forms"` in the same component or file where you intend to use it.

Accessing the values can be done as follows:

```ts
form.value.firstName // string
form.fields.firstName.value // string
```

You can also modify the state in the following manner:

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

You have the option to subscribe to value and rendering changes:

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

Alternatively, you can subscribe in the following manner:

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

Ensure field validity and create custom validators

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

The table below provides an overview of the primary properties for the available fields:

| Field                            | `FormBuilder` function | Value type  | HTML referent             |
| -------------------------------- | ---------------------- | ----------- | ------------------------- |
| `TextFieldDefinition`            | `text`                 | `string`    | `<input type="text">`     |
| `NativeSelectFieldDefinition<T>` | `nativeSelect`         | `T \| null` | `<select>`                |
| `RadiosFieldDefinition<T>`       | `radios`               | `T \| null` | `<input type="radio">`    |
| `ChipsFieldDefinition<T>`        | `chips`                | `T[]`       | Custom `<select>`         |
| `CheckboxesFieldDefinition<T>`   | `checkboxes`           | `T[]`       | `<input type="checkbox">` |
| `FileFieldDefinition`            | `file`                 | `File[]`    | `<input type="file">`     |

### Text

The `TextField` is responsible for controlling the `<input>` element.

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

`NativeSelectField` manages the `<select>` element, and `RadiosField` handles `<input type="radio">` elements. They are both designed for single select fields.

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

`ChipsField` is a custom controller for `<select>` elements, and `CheckboxesField` manages `<input type="checkbox">` elements. Both are designed for multi-select fields.

You can choose from a variety of icons thanks to [last-icon](https://www.npmjs.com/package/last-icon).

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

`FileField` manages the `<input type="file">` element.

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

You can organize your fields into groups using `FormBuilder.fieldset`. When it comes to achieving responsiveness, the go-to choice is `FormUILayouts.autoGrid`.

So, for styles like these:

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

You can easily apply them like this:

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

Now you can keep your form layouts responsive without breaking a sweat! 😎
