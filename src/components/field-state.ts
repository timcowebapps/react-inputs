'use strict';

export namespace FieldState {
	export interface IState {
		value?: string;
		empty: boolean;
		valid: boolean; /*!< Логический тип данных, определяющий валидность поля. */
		focused: boolean;
	}
}
