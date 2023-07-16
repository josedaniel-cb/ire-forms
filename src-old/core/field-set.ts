import {
  AbstractFieldController,
  AbstractFieldExternalParams,
} from '../controllers/abstract-field'
import { FieldArgs } from '../controllers/fields-map'
import { FormController } from '../controllers/form'
import { buildFieldController } from './field-builder'

export type Layout = { classes: string; styles: string }

export class FieldSet {
  readonly form: FormController
  readonly fields: (AbstractFieldController | FieldSet)[]
  readonly legend?: string
  readonly classes?: string
  readonly styles?: string
  readonly layout?: Layout

  constructor(params: FieldGroupParams) {
    this.form = params.form
    this.fields = Object.keys(params.fields).map((key) => {
      const child = params.fields[key]
      if ('fields' in child) {
        const externalParams = child as FieldSetExternalParams
        return new FieldSet({
          ...externalParams,
          form: this.form,
        })
      }
      const externalParams = child as AbstractFieldExternalParams<any, any>
      return buildFieldController(externalParams, this.form, key)
    })
    this.legend = params.legend
    this.classes = params.classes
    this.styles = params.styles
    this.layout = params.layout
  }

  toList(): AbstractFieldController[] {
    return this._toList(this.fields)
  }

  private _toList(
    fields: (AbstractFieldController | FieldSet)[],
  ): AbstractFieldController[] {
    const array: AbstractFieldController[] = []

    fields.forEach((child) => {
      if (child instanceof FieldSet) {
        array.push(...this._toList(child.fields))
      } else {
        array.push(child as AbstractFieldController)
      }
    })

    return array
  }
}

interface FieldSetExternalParams {
  fields: {
    [key: string]: FieldArgs | FieldSetExternalParams
  }
  legend?: string
  classes?: string
  styles?: string
  layout?: Layout
}

interface FieldGroupParams extends FieldSetExternalParams {
  form: FormController
}

export type { FieldSetExternalParams, FieldGroupParams }
