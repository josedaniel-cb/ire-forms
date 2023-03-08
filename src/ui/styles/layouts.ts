import { Layout } from '../../core/field-set'

export class LayoutStyles {
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

export class LayoutClasses {
  static readonly singleColumn = 'single-column'
  static readonly autoGrid = 'auto-grid'
  static readonly flexGrid = 'flex-grid'
  static readonly centeredFlexGrid = 'flex-grid centered'
}

export class Layouts {
  static readonly singleColumn: Layout = {
    classes: LayoutClasses.singleColumn,
    styles: '',
  }

  static readonly autoGrid: Layout = {
    classes: LayoutClasses.autoGrid,
    styles: '',
  }

  static autoGridRem(minSize: number): Layout {
    return {
      classes: LayoutClasses.autoGrid,
      styles: LayoutStyles.autoGrid(`${minSize}rem`),
    }
  }

  static readonly flexGrid: Layout = {
    classes: LayoutClasses.flexGrid,
    styles: '',
  }

  static flexGridRem(params: {
    minWidth?: number
    proportion?: number
    centered?: boolean
  }): Layout {
    const centered = params.centered ?? false
    return {
      classes: centered
        ? LayoutClasses.centeredFlexGrid
        : LayoutClasses.flexGrid,
      styles: LayoutStyles.flexGridRem(params),
    }
  }

  static readonly centeredFlexGrid: Layout = {
    classes: LayoutClasses.centeredFlexGrid,
    styles: '',
  }
}
