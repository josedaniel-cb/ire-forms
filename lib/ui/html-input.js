export class HtmlInput {
    static setNumberInputBehavior(element, { min, max, step, onChange, formatFn, }) {
        element.type = 'text';
        element.inputMode = 'numeric';
        const rejExp = /^[0-9]$/;
        element.addEventListener('keydown', (event) => {
            // If arrows
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                const currentValue = Number.parseFloat(element.value);
                if (Number.isNaN(currentValue)) {
                    const initialValue = min < 0 ? (max < 0 ? max : 0) : min;
                    element.value = formatFn(initialValue);
                    onChange(initialValue);
                }
                else {
                    let nextValue = currentValue + (event.key === 'ArrowUp' ? step : -step);
                    if (nextValue < min)
                        nextValue = min;
                    if (nextValue > max)
                        nextValue = max;
                    if (nextValue !== currentValue) {
                        element.value = formatFn(nextValue);
                        onChange(nextValue);
                    }
                }
                event.preventDefault();
                return;
            }
            // If is a "Ctrl + C"
            if (event.ctrlKey) {
                return;
            }
            // If is a printable key
            // https://stackoverflow.com/a/58658881/11026079
            if (event.key.length === 1) {
                if (!rejExp.test(event.key)) {
                    if (!(event.key === '.' && !element.value.includes('.'))) {
                        event.preventDefault();
                        return;
                    }
                }
            }
        });
    }
    static addEnterKeyListener(
    // element: HTMLInputElement,
    element, callback) {
        element.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                callback();
            }
        });
    }
}
//# sourceMappingURL=html-input.js.map