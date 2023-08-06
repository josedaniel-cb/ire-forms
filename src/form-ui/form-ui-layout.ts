class FormUILayoutStyles {
  static autoGrid(minSize: string): string {
    return `--auto-grid-min-size: ${minSize}`
  }

  static flexGridRem(params: {
    minWidth?: number
    proportion?: number
  }): string {
    const minWidth = `${
      params.minWidth !== undefined ? params.minWidth : 16
    }rem`
    const proportion = `${
      (params.proportion !== undefined ? params.proportion : 1 / 3) * 100
    }%`
    return `--proportion: ${proportion}; --min-width: ${minWidth}`
  }
}

enum FormUILayoutClasses {
  singleColumn = 'single-column',
  autoGrid = 'auto-grid',
  flexGrid = 'flex-grid',
  centeredFlexGrid = 'flex-grid centered',
}

export type FormUILayout = {
  classes: string
  styles: string
}

export class FormUILayouts {
  static readonly singleColumn: FormUILayout = {
    classes: FormUILayoutClasses.singleColumn,
    styles: '',
  }

  static readonly autoGrid: FormUILayout = {
    classes: FormUILayoutClasses.autoGrid,
    styles: '',
  }

  static autoGridRem(minSize: number): FormUILayout {
    return {
      classes: FormUILayoutClasses.autoGrid,
      styles: FormUILayoutStyles.autoGrid(`${minSize}rem`),
    }
  }

  static readonly flexGrid: FormUILayout = {
    classes: FormUILayoutClasses.flexGrid,
    styles: '',
  }

  static flexGridRem(params: {
    minWidth?: number
    proportion?: number
    centered?: boolean
  }): FormUILayout {
    const centered = params.centered ?? false
    return {
      classes: centered
        ? FormUILayoutClasses.centeredFlexGrid
        : FormUILayoutClasses.flexGrid,
      styles: FormUILayoutStyles.flexGridRem(params),
    }
  }

  static readonly centeredFlexGrid: FormUILayout = {
    classes: FormUILayoutClasses.centeredFlexGrid,
    styles: '',
  }
}
