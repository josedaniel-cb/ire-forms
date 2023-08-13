import { css } from 'lit'

export const formControlsCss = css`
* {
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.form-input,
.form-textarea,
.form-multiselect,
.form-select,
.form-checkbox,
.form-radio {
    font-size: 0.875rem /* 14px */;
    line-height: 1.5715;
    color: rgb(30, 41, 59);
    background-color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
}

.form-input,
.form-textarea,
.form-multiselect,
.form-select,
.form-checkbox {
    border-radius: 0.25rem /* 4px */;
    /* width: 100%; */
}

.form-input,
.form-textarea,
.form-multiselect,
.form-select {
    line-height: 1.25rem /* 20px */;
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 0.75rem /* 12px */;
    padding-right: 0.75rem /* 12px */;
    border-color: rgb(226, 232, 240);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.form-input:hover,
.form-textarea:hover,
.form-multiselect:hover,
.form-select:hover {
    border-color: rgb(203, 213, 225);
}

.form-input:focus,
.form-textarea:focus,
.form-multiselect:focus,
.form-select:focus {
    outline: none;
    border-color: rgb(165, 180, 252);
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: rgb(148, 163, 184);
    font-size: 0.875rem /* 14px */;
    line-height: 1.5715;
}

.form-input:focus,
.form-textarea:focus,
.form-multiselect:focus,
.form-select:focus,
.form-checkbox:focus,
.form-radio:focus {
    --tw-ring-offset-shadow: 0 0 0 0px #fff;
    --tw-ring-shadow: 0 0 0 0px var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}

.form-input:disabled,
.form-textarea:disabled,
.form-multiselect:disabled,
.form-select:disabled,
.form-input[readonly],
.form-textarea[readonly],
.form-multiselect[readonly],
.form-select[readonly] {
    color: rgb(148 163 184);
    background-color: rgb(241 245 249);
    border-color: rgb(226 232 240)
    cursor: not-allowed;
}

.form-input.is-invalid,
.form-textarea.is-invalid,
.form-multiselect.is-invalid,
.form-select.is-invalid {
    border-color: rgb(253 164 175);
}

.form-select {
    padding-right: 2.5rem/* 40px */;
}

.form-checkbox, .form-radio {
    appearance: none;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    user-select: none;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
}

.form-checkbox,
.form-radio {
    color: rgb(99 102 241);
    border-width: 1px;
    border-color: rgb(203 213 225);
}

.form-checkbox:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.form-checkbox:checked, .form-radio:checked {
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

/* So... custom styles time */
.form-select--placeholder {
    color: rgb(148, 163, 184); /* soft */
}

.form-select--placeholder:focus {
    color: rgb(30, 41, 59);  /* normal again */
}
`
