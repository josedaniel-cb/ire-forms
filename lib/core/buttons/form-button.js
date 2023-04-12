export class FormButton {
    constructor(args) {
        this.icon = args.icon;
        this.label = args.label;
        this.mode = args.mode;
        this.squareAspectRatio = args.squareAspectRatio;
        this.rounded = args.rounded;
        this.onClick = args.onClick;
    }
    static build(args) {
        return new FormButton(args);
    }
}
export const makeIconButtonArgs = (args) => ({
    ...args,
    mode: args.mode ?? 'text',
    rounded: args.rounded ?? true,
    squareAspectRatio: args.squareAspectRatio ?? true,
});
export const makeButtonArgs = (args) => ({
    ...args,
    mode: args.mode ?? 'filled',
    rounded: args.rounded ?? false,
    squareAspectRatio: args.squareAspectRatio ?? false,
});
//# sourceMappingURL=form-button.js.map