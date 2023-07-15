import { html, HTMLTemplateResult } from 'lit'

export const renderStyleSheetLinks = (
  styleLinks: string[],
): HTMLTemplateResult => {
  return html`
    ${styleLinks.map(
      (link) => html`
        <link
          rel="stylesheet"
          type="text/css"
          href="${link}"
        />
      `,
    )}
  `
}
