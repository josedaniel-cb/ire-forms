import { css } from 'lit'

export const iconizedControlCss = css`
.iconized-control {
    position: relative;
    display: grid;
}

.iconized-control:has(.iconized-control__icon) .iconized-control__input {
    padding-right: 2.5rem/* 40px */;
}

.iconized-control .iconized-control__icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2.5rem;
    margin: auto;
    pointer-events: none;
    color: rgb(148, 163, 184);
}

.is-invalid + .iconized-control__icon {
    color: red;
}

.iconized-control__icon.clickable {
    pointer-events: auto;
    cursor: pointer;
}
`
