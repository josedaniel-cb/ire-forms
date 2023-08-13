import { css } from 'lit'

export const formFieldCss = css`
:host {
    display: grid;
}

.form-label {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.5715;
    margin-bottom: 0.25rem;
    color: rgb(71 85 105);
}

.text-danger {
    color: rgb(244 63 94);
}

.invalid-input-message {
    color: rgb(244 63 94);
    font-size: 0.75rem;
    line-height: 1.5;
    margin-top: 0.25rem;
}
`
