type AxisValue = number | string

type FamilySpec = {
  familyName: string
  ital?: AxisValue[]
  wdth?: AxisValue[]
  wght?: AxisValue[]
}

type FontOptions = {
  families: FamilySpec[]
  text?: string
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
}

// TODO: NO LONGER USED

/**
 * Builds a font URL based on the provided options.
 * @param options The options for building the font URL.
 * @returns The generated font URL.
 */
export function buildFontURL(options: FontOptions): string {
  let url = 'https://fonts.googleapis.com/css2?family='

  // Iterate through font families
  options.families.forEach((family, index) => {
    url += family.familyName.replace(/ /g, '+')

    if (family.ital) {
      url += ':ital@'
      url += family.ital.sort().join(';')
    }
    if (family.wdth) {
      url += ':wdth@'
      url += family.wdth.sort().join(';')
    }
    if (family.wght) {
      url += ':wght@'
      url += family.wght.sort().join(';')
    }

    // Add separator if there are more families
    if (index < options.families.length - 1) {
      url += '&family='
    }
  })

  // Add display if it exists
  if (options.display) {
    url += `&display=${options.display ?? 'swap'}`
  }

  // Add text if it exists
  if (options.text) {
    url += `&text=${options.text}`
  }

  return url
}

// Example usage:
const url = buildFontURL({
  families: [
    {
      familyName: 'Open Sans',
      wght: [400, 500, 700],
    },
  ],
})
