import { css } from 'lit'

export const iconizedControlCss = css`
.iconized-control {
    position: relative;
    display: grid;
}

.iconized-control:has(.iconized-control__icon) .iconized-control__input {
    padding-right: 2.5rem/* 40px */;
    background: none;
}

.iconized-control .iconized-control__icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2.5rem;
    margin: auto;
    pointer-events: none;
    color: var(--bs-body-color);
}

.is-invalid + .iconized-control__icon {
    color: var(--bs-form-invalid-border-color);
}

.is-valid + .iconized-control__icon {
    color: var(--bs-form-valid-border-color);
}

.iconized-control__icon.clickable {
    pointer-events: auto;
    cursor: pointer;
}
`
