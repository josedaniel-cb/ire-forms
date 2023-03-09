import { css } from 'lit';
export const bootstrapCss = css `
  /* @import url('https://meyerweb.com/eric/tools/css/reset/reset.css');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'); */

  /* https://startbootstrap.com/theme/sb-admin-pro */

  /* Root */
  form {
    --bs-blue: #0061f2;
    --bs-indigo: #5800e8;
    --bs-purple: #6900c7;
    --bs-pink: #e30059;
    --bs-red: #e81500;
    --bs-orange: #f76400;
    --bs-yellow: #f4a100;
    --bs-green: #00ac69;
    --bs-teal: #00ba94;
    --bs-cyan: #00cfd5;
    --bs-white: white;
    --bs-gray: #69707a;
    --bs-gray-dark: #363d47;
    --bs-gray-100: #f2f6fc;
    --bs-gray-200: #e0e5ec;
    --bs-gray-300: #d4dae3;
    --bs-gray-400: #c5ccd6;
    --bs-gray-500: #a7aeb8;
    --bs-gray-600: #69707a;
    --bs-gray-700: #4a515b;
    --bs-gray-800: #363d47;
    --bs-gray-900: #212832;
    --bs-primary: #0061f2;
    --bs-secondary: #6900c7;
    --bs-success: #00ac69;
    --bs-info: #00cfd5;
    --bs-warning: #f4a100;
    --bs-danger: #e81500;
    --bs-light: #f2f6fc;
    --bs-dark: #212832;
    --bs-black: #000;
    --bs-white: white;
    --bs-red: #e81500;
    --bs-orange: #f76400;
    --bs-yellow: #f4a100;
    --bs-green: #00ac69;
    --bs-teal: #00ba94;
    --bs-cyan: #00cfd5;
    --bs-blue: #0061f2;
    --bs-indigo: #5800e8;
    --bs-purple: #6900c7;
    --bs-pink: #e30059;
    --bs-red-soft: #f1e0e3;
    --bs-orange-soft: #f3e7e3;
    --bs-yellow-soft: #f2eee3;
    --bs-green-soft: #daefed;
    --bs-teal-soft: #daf0f2;
    --bs-cyan-soft: #daf2f8;
    --bs-blue-soft: #dae7fb;
    --bs-indigo-soft: #e3ddfa;
    --bs-purple-soft: #e4ddf7;
    --bs-pink-soft: #f1ddec;
    --bs-primary-soft: #dae7fb;
    --bs-secondary-soft: #e4ddf7;
    --bs-success-soft: #daefed;
    --bs-info-soft: #daf2f8;
    --bs-warning-soft: #f2eee3;
    --bs-danger-soft: #f1e0e3;
    --bs-body-color: #69707a;
    --bs-body-bg: #f2f6fc;
    font-family: Roboto;
  }

  /* Fieldset */
  fieldset {
    border-radius: 0.5rem;
    border-color: var(--bs-body-color);
    /* border-color: blue; */
    border-width: 1px;
    padding: 0.75rem;
  }

  fieldset.no-border {
    border-width: 0;
    padding: 0;
  }

  legend {
    color: var(--bs-gray);
    font-size: 0.9em;
  }

  .form-child {
    /* margin-bottom: 0.75rem; */
  }

  .form-child:last-child {
    margin-bottom: 0rem;
  }

  /* Field */
  .form-label {
    display: inline-block;
    margin-bottom: 0.5rem;
    /* yo */
    /* margin-top: 1rem; */
  }

  .form-control {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-dark);
    background-color: white;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .form-control[type='date'] {
    line-height: 1.375;
  }
  .form-control:focus {
    color: var(--bs-body-color);
    background-color: white;
    border-color: transparent;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.25);
  }
  .form-control::placeholder {
    color: var(--bs-gray-500);
    opacity: 1;
  }
  .form-control:disabled,
  .form-control[readonly] {
    background-color: var(--bs-gray-200);
    opacity: 1;
  }
  textarea.form-control {
    min-height: calc(1em + 1.75rem + 2px);
  }
  .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: #e81500;
    padding-right: calc(1em + 1.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23e81500'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e81500' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.25em + 0.4375rem) center;
    background-size: calc(0.5em + 0.875rem) calc(0.5em + 0.875rem);
  }

  .form-select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    background-color: white;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23363d47' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.125rem center;
    background-size: 16px 12px;
    border: 1px solid #c5ccd6;
    border-radius: 0.35rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    appearance: none;
  }
  .form-select:focus {
    border-color: transparent;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.25);
  }
  .form-select[multiple],
  .form-select[size]:not([size='1']) {
    padding-right: 1.125rem;
    background-image: none;
  }
  .form-select:disabled {
    background-color: var(--bs-gray-200);
  }

  .form-check {
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5em;
    margin-bottom: 0.125rem;
  }
  .form-check .form-check-input {
    float: left;
    margin-left: -1.5em;
  }
  .form-check-input {
    width: 1em;
    height: 1em;
    margin-top: 0.25em;
    vertical-align: top;
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
  .form-check-input[type='checkbox'] {
    border-radius: 0.25em;
  }
  .form-check-input[type='radio'] {
    border-radius: 50%;
  }
  .form-check-input:active {
    filter: brightness(90%);
  }
  .form-check-input:focus {
    border-color: transparent;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.25);
  }
  .form-check-input:checked {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
  }
  .form-check-input:checked[type='checkbox'] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
  .form-check-input:checked[type='radio'] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
  }
  .form-check-input[type='checkbox']:indeterminate {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
  }
  .form-check-input:disabled {
    pointer-events: none;
    filter: none;
    opacity: 0.5;
  }
  .form-check-input[disabled] ~ .form-check-label,
  .form-check-input:disabled ~ .form-check-label {
    opacity: 0.5;
  }

  /* Buttons  */
  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    border-radius: 0.35rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn:hover {
    color: #69707a;
    text-decoration: none;
  }
  .btn:disabled {
    pointer-events: none;
    opacity: 0.65;
  }
  .btn-primary {
    color: white;
    background-color: var(--bs-blue);
    border-color: var(--bs-blue);
  }
  .btn-primary:hover {
    color: white;
    background-color: #0052ce;
    border-color: #004ec2;
  }
  .btn-primary:focus {
    color: white;
    background-color: #0052ce;
    border-color: #004ec2;
    box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
  }
  .btn-primary:active {
    color: white;
    background-color: #004ec2;
    border-color: #0049b6;
  }
  .btn-primary:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
  }
  .btn-primary:disabled {
    color: white;
    background-color: var(--bs-blue);
    border-color: var(--bs-blue);
  }

  /* General */
  .text-danger {
    color: var(--bs-danger);
  }

  .invalid-input-message {
    color: var(--bs-danger);
    font-size: 0.75em;
    line-height: 1.5rem;
  }

  button {
    padding: 0.5rem;
    border: 0;
    border-radius: 0.5rem;
  }

  button.text {
    background-color: transparent;
    color: black;
  }

  button.filled {
    background-color: var(--bs-primary);
    color: white;
  }

  button.outline {
    color: var(--bs-primary);
    background-color: transparent;
    border: solid 2px var(--bs-primary);
  }

  .label-spacer {
    width: 0.25rem;
  }

  .form-file {
    position: relative;
  }

  .form-file .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 2.5rem;
    background-color: var(--bs-gray-500);
    border-radius: 0 0.25rem 0.25rem 0;
    cursor: pointer;
    background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20class%3D%22bi%20bi-folder%22%20viewBox%3D%220%200%2016%2016%22%3E%0A%20%20%3Cpath%20d%3D%22M.54%203.87.5%203a2%202%200%200%201%202-2h3.672a2%202%200%200%201%201.414.586l.828.828A2%202%200%200%200%209.828%203h3.982a2%202%200%200%201%201.992%202.181l-.637%207A2%202%200%200%201%2013.174%2014H2.826a2%202%200%200%201-1.991-1.819l-.637-7a1.99%201.99%200%200%201%20.342-1.31zM2.19%204a1%201%200%200%200-.996%201.09l.637%207a1%201%200%200%200%20.995.91h10.348a1%201%200%200%200%20.995-.91l.637-7A1%201%200%200%200%2013.81%204H2.19zm4.69-1.707A1%201%200%200%200%206.172%202H2.5a1%201%200%200%200-1%20.981l.006.139C1.72%203.042%201.95%203%202.19%203h5.396l-.707-.707z%22%2F%3E%0A%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: center;
    color: white;
    background-size: 1.1rem;
  }

  .form-file:hover .icon {
    transition-duration: 200ms;
    transition-property: background-color;
    background-color: var(--bs-blue);
  }

  .form-control.is-invalid {
    background-image: none;
  }

  .form-password {
    position: relative;
  }
  .form-password .icon {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /* width: calc(1em + 1.75rem); */
    width: 3rem;
    background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20class%3D%22bi%20bi-eye-slash%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M13.359%2011.238C15.06%209.72%2016%208%2016%208s-3-5.5-8-5.5a7.028%207.028%200%200%200-2.79.588l.77.771A5.944%205.944%200%200%201%208%203.5c2.12%200%203.879%201.168%205.168%202.457A13.134%2013.134%200%200%201%2014.828%208c-.058.087-.122.183-.195.288-.335.48-.83%201.12-1.465%201.755-.165.165-.337.328-.517.486l.708.709z%22%2F%3E%3Cpath%20d%3D%22M11.297%209.176a3.5%203.5%200%200%200-4.474-4.474l.823.823a2.5%202.5%200%200%201%202.829%202.829l.822.822zm-2.943%201.299.822.822a3.5%203.5%200%200%201-4.474-4.474l.823.823a2.5%202.5%200%200%200%202.829%202.829z%22%2F%3E%3Cpath%20d%3D%22M3.35%205.47c-.18.16-.353.322-.518.487A13.134%2013.134%200%200%200%201.172%208l.195.288c.335.48.83%201.12%201.465%201.755C4.121%2011.332%205.881%2012.5%208%2012.5c.716%200%201.39-.133%202.02-.36l.77.772A7.029%207.029%200%200%201%208%2013.5C3%2013.5%200%208%200%208s.939-1.721%202.641-3.238l.708.709zm10.296%208.884-12-12%20.708-.708%2012%2012-.708.708z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    /* background-position: right calc(0.25em + 0.4375rem) center; */
    background-position: center;
    /* background-size: calc(0.5em + 0.875rem) calc(0.5em + 0.875rem); */
    background-size: 1.25rem;
    cursor: pointer;
  }
  .form-password.obscure .icon {
    background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20class%3D%22bi%20bi-eye%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M16%208s-3-5.5-8-5.5S0%208%200%208s3%205.5%208%205.5S16%208%2016%208zM1.173%208a13.133%2013.133%200%200%201%201.66-2.043C4.12%204.668%205.88%203.5%208%203.5c2.12%200%203.879%201.168%205.168%202.457A13.133%2013.133%200%200%201%2014.828%208c-.058.087-.122.183-.195.288-.335.48-.83%201.12-1.465%201.755C11.879%2011.332%2010.119%2012.5%208%2012.5c-2.12%200-3.879-1.168-5.168-2.457A13.134%2013.134%200%200%201%201.172%208z%22%2F%3E%3Cpath%20d%3D%22M8%205.5a2.5%202.5%200%201%200%200%205%202.5%202.5%200%200%200%200-5zM4.5%208a3.5%203.5%200%201%201%207%200%203.5%203.5%200%200%201-7%200z%22%2F%3E%3C%2Fsvg%3E');
  }
  .form-password .icon:active {
    transform: scale(0.9);
    transition-duration: 200ms;
    transition-property: transform;
  }

  .custom-select-panel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-height: 14rem;
    overflow-y: auto;
    background-color: white;
    border: 1px solid rgb(206, 212, 218);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .custom-select-panel .empty-message {
    padding: 1rem;
    color: var(--bs-gray);
    text-align: center;
  }

  .custom-select-panel .item.selected {
    color: white;
    background-color: var(--bs-blue);
  }

  .custom-select-panel .item:hover {
    color: white;
    background-color: var(--bs-gray-500);
    cursor: default;
  }

  .custom-select-panel .item .content {
    padding: 0.25em 0.5em;
  }
`;
//# sourceMappingURL=bootstrap-css.js.map