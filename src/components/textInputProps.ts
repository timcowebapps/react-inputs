'use strict';

/**
 * Внешние зависимости.
 */
import * as React from 'react';

export interface ITextInputProps extends React.Props<any> {
	type: string; // text, password etc
	name: string;
	defaultValue?: string;
	value?: string;
	text?: string;
	placeholder?: string;
	onChange?: Function;
	
	/**
	 * Обязательное поле?
	 *
	 * @type {boolean}
	 * @memberof ITextInputProps
	 */
	required?: boolean;
	validate?: Function;
	errorMessages?: string;
}