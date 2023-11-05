export enum ControlValidationUiStateClassName {
  IsValid = 'is-valid',
  IsInvalid = 'is-invalid',
  None = '',
}

export class ControlValidationUiState {
  static className({
    isInvalid,
    touched,
  }: {
    isInvalid: boolean
    touched: boolean
  }): ControlValidationUiStateClassName {
    if (!isInvalid) {
      return ControlValidationUiStateClassName.IsValid
    } else if (touched) {
      return ControlValidationUiStateClassName.IsInvalid
    }
    return ControlValidationUiStateClassName.None
  }
}
