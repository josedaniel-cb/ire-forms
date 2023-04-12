import { FormButton } from './form-button';
export class FormButtonSet {
    constructor(args) {
        if (args.labelActions) {
            this.labelActions = args.labelActions.map((a) => FormButton.build(a));
        }
    }
    static build(args) {
        return new FormButtonSet(args);
    }
}
//# sourceMappingURL=form-button-set.js.map