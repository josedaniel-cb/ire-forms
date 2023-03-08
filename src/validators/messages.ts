export const REQUIRED_FIELD_MESSAGE = 'Campo requerido'

export const REQUIRED_OPTION_MESSAGE = 'Por favor seleccione una opción'

export const invalidFileSize = function (maxSize: number) {
  const megabytes = maxSize / 1024 / 1024
  return `Por favor seleccione un archivo menor a ${megabytes} MB`
}

// export const invalidFileExtension = function (extensions: string[]) {
// 	let message = `Por favor seleccione un archivo ${extensions[0]}`;
// 	if (extensions.length > 1) {
// 		const last = extensions.length - 1;
// 		if (extensions.length > 2) {
// 			const penultimate = last - 1;
// 			for (let i = 0; i < penultimate; i++) {
// 				message += `, ${extensions[i]}`;
// 			}
// 		}
// 		message += ` o ${extensions[last]}`;
// 	}

// 	return message;
// };

export const invalidInput = function (fieldName: string) {
  return `Por favor ingrese un ${fieldName} válido`
}

export const invalidNumberRange = function (min?: number, max?: number) {
  if (min === undefined && max === undefined) return ''
  let message = 'El valor debe ser'
  if (min !== undefined) {
    message += ` ${min} como mínimo`
    if (max !== undefined) message += ' y'
  }
  if (max !== undefined) message += ` ${max} como máximo`
  return message
}
