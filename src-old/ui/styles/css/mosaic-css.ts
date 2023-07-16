import { css } from 'lit'

export const mosaicCss = css`
  * {
    transition-property: background-color, border-color;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  form {
    font-family: Inter;
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

  /* Tailwind legacy */

  *,
  ::after,
  ::before {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }

  /* Reset */
  *:focus {
    outline: none;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  /* [multiple],
  [type='date'],
  [type='datetime-local'],
  [type='email'],
  [type='month'],
  [type='number'],
  [type='password'],
  [type='search'],
  [type='tel'],
  [type='text'],
  [type='time'],
  [type='url'],
  [type='week'],
  select,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    --tw-shadow: 0 0 #0000;
  } */

  [type='checkbox'],
  [type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    border-width: 1px;
  }

  /* .form-control */
  .form-control {
    width: 100%;

    border-color: rgb(226 232 240);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    line-height: 1.25rem;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    border-radius: 0.25rem;

    border-width: 1px;
    background-color: rgb(255 255 255);
    font-size: 0.875rem;
    line-height: 1.5715;
    color: rgb(30 41 59);
  }

  /* .form-password, .form-file   */

  .form-password,
  .form-file {
    position: relative;
  }

  .form-password .form-control,
  .form-file .form-control {
    padding-right: 2.25rem;
  }

  .form-password .icon,
  .form-file .icon {
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;
    aspect-ratio: 1 / 1;

    /* background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-eye-slash' viewBox='0 0 16 16'>  <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z'/>  <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z'/>  <path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z'/></svg>"); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;

    cursor: pointer;

    transition-property: all;
    transition-duration: 200ms;
  }

  .form-password .icon {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-eye-slash' viewBox='0 0 16 16'>  <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z'/>  <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z'/>  <path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z'/></svg>");
  }

  .form-password.obscure .icon {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-eye' viewBox='0 0 16 16'><path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'/><path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/></svg>");
  }

  .form-password .icon:hover {
    opacity: 0.5;
  }

  .form-file .icon {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-earmark-arrow-up' viewBox='0 0 16 16'>  <path d='M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z'/>  <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z'/></svg>");
  }

  .form-file .form-control {
    cursor: pointer;
  }

  .form-file:hover .icon {
    opacity: 0.5;
  }

  /* .form-select */

  .form-select {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;

    width: 100%;

    /* background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); */
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgb(148, 163, 184)' class='bi bi-caret-down' viewBox='0 0 16 16'>  <path d='M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z'/></svg>");

    /* background-position: right 0.5rem center; */
    background-position: right 0.7rem center;
    background-repeat: no-repeat;
    /* background-size: 1.5em 1.5em; */
    background-size: 1rem;
    -webkit-print-color-adjust: exact;

    border-width: 1px;
    background-color: rgb(255 255 255);
    font-size: 0.875rem;
    line-height: 1.5715;
    color: rgb(30 41 59);

    border-radius: 0.25rem;

    border-color: rgb(226 232 240);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    line-height: 1.25rem;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    padding-right: 2.5rem;
  }

  /* .form-check */

  .form-check {
    display: flex;
    align-items: center;
  }

  .form-check-input {
    border-width: 1px;
    background-color: rgb(255 255 255);
    font-size: 0.875rem;
    line-height: 1.5715;
    color: rgb(30 41 59);

    border-width: 1px;
    border-color: rgb(203 213 225);
    color: rgb(99 102 241);
  }

  .form-check-input[type='checkbox'] {
    border-radius: 0.25rem;
  }

  .form-check-input[type='radio'] {
    border-radius: 50%;
  }

  .form-check-label {
    margin: 0;
    margin-left: 0.5rem;

    font-size: 0.875rem;
    line-height: 1.5715;
    color: rgb(30, 41, 59);
  }

  /* :hover */
  .form-control:hover,
  .form-select:hover {
    border-color: rgb(203 213 225);
  }

  /* :focus */
  .form-control:focus,
  .form-select:focus {
    border-color: rgb(165 180 252);
  }

  /* :checked */

  .form-check-input:checked {
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .form-check-input[type='checkbox']:checked {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-check' viewBox='0 0 16 16'>  <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>");
  }

  .form-check-input[type='radio']:checked {
    background-size: 2rem;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-dot' viewBox='0 0 16 16'>  <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/></svg>");
  }

  /* ::placeholder */
  .form-control::placeholder,
  .form-select::placeholder {
    color: rgb(148 163 184);
  }

  /* :disabled */
  .form-control:disabled,
  .form-control[readonly],
  .form-select:disabled,
  .form-select[readonly] {
    border-color: rgb(226 232 240);
    background-color: rgb(241 245 249);
    color: rgb(148 163 184);
  }

  .form-check-input:disabled {
    border-color: rgb(226, 232, 240);
    background-color: rgb(241, 245, 249);
  }

  .form-check-input[type='checkbox'][disabled]:checked {
    /* background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(148 163 184)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e"); */
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgb(148 163 184)' class='bi bi-check' viewBox='0 0 16 16'>  <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>");
  }

  /* is-invalid */
  .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: rgb(253 164 175);
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgb(244, 63, 94)' class='bi bi-exclamation-circle' viewBox='0 0 16 16'>  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>  <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    /* background-size: 1rem; */
    padding-right: 2.5rem;
  }

  .form-password .form-control.is-invalid,
  .form-file .form-control.is-invalid {
    background-position: right 2.7rem center;
    padding-right: 4.5rem;
  }

  .form-control[type='date'].is-invalid,
  .form-control[type='time'].is-invalid {
    /* background-position: right 2.7rem center; */
    padding-right: 2.5rem;
  }

  /* .invalid-input-message */
  .invalid-input-message {
    color: rgb(244 63 94);
    font-size: 0.75rem;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  /* button */
  button {
    display: inline-flex;
    align-items: center;

    /* color: rgb(71 85 105); */
    line-height: 1;
    font-weight: 500;
    line-height: 1.25em;

    padding: 0.5em 0.75em;
    border-radius: 0.25rem;

    cursor: pointer;

    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  button.text {
    color: rgb(99 102 241);
    background-color: transparent;
    box-shadow: none;
  }

  button.filled {
    color: white;
    background-color: rgb(99 102 241);
  }

  button.outline {
    color: rgb(99 102 241);
    background-color: transparent;
    border-color: rgb(226 232 240);
    border-width: 1px;
  }

  button.text:hover {
    background-color: rgb(0 0 0 / 0.1);
  }

  button.filled:hover {
    background-color: rgb(79 70 229);
  }

  button.outline:hover {
    border-color: rgb(165 180 252);
  }

  button .label-spacer {
    width: 0.5em;
  }

  .form-label button {
    height: 100%;
    font-size: 0.75rem;
    padding: 0.125em 0.5em;
  }

  /* .custom-select-panel */
  .custom-select-panel {
    position: absolute;
    left: 0;
    top: 0;
    /* bottom: 2rem; */
    z-index: 2147483647;

    max-height: 7rem;
    width: 100%;
    overflow-y: auto;

    background-color: white;
    border: 1px solid rgb(206, 212, 218);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .custom-select-panel .item {
    cursor: default;
  }

  .custom-select-panel .item {
    padding: 0.25em 0.5em;
    color: rgb(71, 85, 105);
    font-size: 0.875rem;
  }

  .custom-select-panel .item:hover {
    color: white;
    background-color: #0d6efd;
  }

  .custom-select-panel .item.selected {
    color: white;
    background-color: #0d6efd;
  }

  .custom-select-panel .empty-message {
    padding: 1rem;
    text-align: center;
  }

  /* fieldset */

  fieldset {
    border: 1px solid rgb(206, 212, 218);
    border-radius: 0.25rem;
    padding: 0.75rem;
  }

  fieldset.no-border {
    border-width: 0;
    padding: 0;
  }

  legend {
    color: rgb(148, 163, 184);
    font-size: 0.75rem;
  }
`
