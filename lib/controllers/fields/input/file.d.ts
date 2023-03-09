import { AbstractInput, AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputConstructorParams, AbstractSubInputExternalParams } from '../abstract-input';
export interface FileInput extends AbstractInput<File | null> {
}
export declare class FileInputController extends AbstractInputController<File | null> implements FileInput {
    readonly accept?: string;
    readonly placeholder: string;
    constructor(params: FileInputConstructorParams);
    connectElements(textElement: HTMLInputElement, fileElement: HTMLInputElement): void;
    protected _getValueFromElement(element: HTMLInputElement): File | null;
    protected _setValueToElement(value: File | null, element: HTMLInputElement): void;
    protected _getDefaultValue(): File | null;
}
interface BuilderParams extends AbstractSubInputBuilderParams<File | null> {
    accept?: string;
    placeholder?: string;
}
interface FileInputExternalParams extends BuilderParams, AbstractSubInputExternalParams<File | null> {
    controlType: 'fileInput';
}
declare function makeFileInputExternalParams(params: BuilderParams): FileInputExternalParams;
interface FileInputConstructorParams extends BuilderParams, AbstractSubInputConstructorParams<File | null> {
}
export { makeFileInputExternalParams };
export type { FileInputExternalParams, FileInputConstructorParams };
//# sourceMappingURL=file.d.ts.map