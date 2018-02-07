'use strict';

export interface ITextInputState {
	value?: string;
	errorMessages?: string;
	valid: boolean; /*!< Логический тип данных, определяющий валидность поля. */
	focused: boolean;
}
