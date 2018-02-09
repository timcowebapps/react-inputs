'use strict';

export interface IFieldState {
	value?: string;
	empty: boolean;
	valid: boolean; /*!< Логический тип данных, определяющий валидность поля. */
	focused: boolean;
}
