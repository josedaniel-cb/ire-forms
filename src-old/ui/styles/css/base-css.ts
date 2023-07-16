import { css } from 'lit'

export const baseCss = css`
  .flex {
    display: flex;
  }

  .justify-between {
    justify-content: space-between;
  }

  .inline-flex {
    display: inline-flex;
  }

  .rounded-full {
    border-radius: 9999px;
  }

  .aspect-square {
    aspect-ratio: 1 / 1;
  }

  .items-center {
    align-items: center;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .hidden {
    display: none;
  }

  .space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .relative {
    position: relative;
  }

  .w-full {
    width: 100%;
  }
`
