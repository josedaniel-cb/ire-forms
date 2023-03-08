import { html, HTMLTemplateResult } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { FormButton } from '../../core/buttons/form-button'
import { FormConfig } from '../../core/config'

export const renderExternalStyleSheets = () => html`
  ${FormConfig.stylesheets.map(
    (s) => html`
      <link
        rel="stylesheet"
        type="text/css"
        href="${s}"
      />
    `
  )}
`

export const renderButtons = (arr: FormButton[]) =>
  html`
    <div class="inline-flex flex-grow justify-end space-x-2">
      ${arr.map((b) => {
        let icon: HTMLTemplateResult | undefined
        if (b.icon) {
          const iconClass = `${FormConfig.icons} ${FormConfig.icons}-${b.icon}`
          icon = html` <i class="${iconClass}"></i> `
        }

        let label: HTMLTemplateResult | undefined
        if (b.label) {
          label = html`${b.label}`
        }

        // 'flex items-center': true,
        return html`
          <button
            class=${classMap({
              'rounded-full': b.rounded,
              'aspect-square': b.squareAspectRatio,
              [b.mode]: true,
            })}
            @click="${() => b.onClick()}"
          >
            ${icon}
            ${icon && label
              ? html`<span class="label-spacer"></span>`
              : undefined}
            ${label}
            <!-- <i class="rounded-full aspect-square items-center space"></i> -->
          </button>
        `
      })}
    </div>
  `
