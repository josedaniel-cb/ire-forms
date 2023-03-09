import { AbstractTextInput, AbstractTextInputBuilderParams, AbstractTextInputConstructorParams, AbstractTextInputController, AbstractTextInputExternalParams } from '../abstract-text';
export interface TextInput extends AbstractTextInput {
    upperCaseOnly: boolean;
}
export declare class TextInputController extends AbstractTextInputController implements TextInput {
    readonly upperCaseOnly: boolean;
    constructor(params: TextInputConstructorParams);
}
interface TextInputBuilderParams extends AbstractTextInputBuilderParams {
    upperCaseOnly?: boolean;
}
interface TextInputExternalParams extends TextInputBuilderParams, AbstractTextInputExternalParams {
    controlType: 'textInput';
}
declare function makeTextInputExternalParams(params: TextInputBuilderParams): TextInputExternalParams;
interface TextInputConstructorParams extends TextInputBuilderParams, Omit<AbstractTextInputConstructorParams, 'type'> {
}
export { makeTextInputExternalParams };
export type { TextInputBuilderParams, TextInputExternalParams, TextInputConstructorParams, };
//# sourceMappingURL=text.d.ts.map