import { css } from 'lit'

export const multiSelectElementCss = css`
/* Styles for the ire-multi-select */
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 4px;
  background-color: #f7f7f7;
}

/* Styles for the chips of selected elements */
.chip {
  display: flex;
  align-items: center;
  padding: 2px 8px;
  background-color: #007bff;
  color: #fff;
  border-radius: 16px;
}

/* Styles for the "x" icon inside the chips */
.chip .remove-icon {
  margin-left: 4px;
  cursor: pointer;
}

/* Styles for the input search */
input[type='text'] {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
}

/* Styles for the filtered options */
.filtered-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* Styles for each option in the filtered options */
.option {
  padding: 8px;
  cursor: pointer;
}

.option:hover {
  background-color: #f1f1f1;
}

.no-match {
  padding: 8px;
  text-align: center;
  color: #888;
}

/* New styles for the highlighted option */
.option.highlighted {
  background-color: #007bff;
  color: #fff;
}
`
