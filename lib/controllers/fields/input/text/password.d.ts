import { AbstractTextInput, AbstractTextInputBuilderParams, AbstractTextInputConstructorParams, AbstractTextInputController, AbstractTextInputExternalParams } from '../abstract-text';
export interface PasswordInput extends AbstractTextInput {
}
export declare class PasswordInputController extends AbstractTextInputController implements PasswordInput {
    constructor(params: PasswordInputConstructorParams);
}
interface BuilderParams extends AbstractTextInputBuilderParams {
}
interface PasswordInputExternalParams extends BuilderParams, AbstractTextInputExternalParams {
    controlType: 'passwordInput';
}
declare function makePasswordInputExternalParams(params: BuilderParams): PasswordInputExternalParams;
interface PasswordInputConstructorParams extends BuilderParams, Omit<AbstractTextInputConstructorParams, 'type'> {
}
export { makePasswordInputExternalParams };
export type { PasswordInputExternalParams, PasswordInputConstructorParams };
//# sourceMappingURL=password.d.ts.map