import { css } from 'lit'

export const layoutsCss = css`
  /* https://youtu.be/El0OJ6h_2ZI */
  /* https://css-tricks.com/a-responsive-grid-layout-with-no-media-queries/ */
  .auto-grid {
    --auto-grid-min-size: 10rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, var(--auto-grid-min-size)), 1fr)
    );
    grid-auto-flow: dense;
  }

  .single-column {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  /* https://stackoverflow.com/a/52750179/11026079 */
  .flex-grid {
    --proportion: 33.33%;
    --min-width: 16rem;
    display: flex;
    flex-wrap: wrap;
    /* Recordar que los fieldset (sin borde) tienen relleno total de 0.75rem */
    padding: 0.25rem;
  }

  .flex-grid legend {
    margin-left: 0.5rem;
  }

  .flex-grid .form-child {
    margin: 0.5rem;
    flex: 1 1 calc(var(--proportion) - 1rem);
    min-width: calc(var(--min-width) - 1rem);
  }

  .flex-grid.no-border {
    padding: 0;
    margin: -0.5rem;
  }

  /* .flex-grid.no-border .form-child {
    flex: 1 1 calc(var(--proportion) - 1rem);
  } */

  .flex-grid.centered {
    justify-content: center;
  }

  .flex-grid.centered .form-child {
    flex-grow: unset;
  }
`
