import { LitElement, HTMLTemplateResult } from 'lit';
import { AbstractFieldController } from '../../controllers/abstract-field';
export declare abstract class FieldElement extends LitElement {
    static styles: import("lit").CSSResult[];
    controller: AbstractFieldController;
    element: HTMLElement;
    protected _isInvalid: boolean;
    render(): import("lit-html").TemplateResult<1>;
    headerTemplate(): import("lit-html").TemplateResult<1> | undefined;
    abstract fieldTemplate(): HTMLTemplateResult;
    messageTemplate(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
}
//# sourceMappingURL=field.d.ts.map