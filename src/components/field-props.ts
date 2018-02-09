'use strict';

/* Внешние зависимости. */
import * as React from 'react';
import { IJsonSchema } from 'timcowebapps-react-utils';

export interface IFieldProps extends React.Props<any> {
	/**
	 * Схема.
	 * 
	 * @type {IJsonSchema}
	 * @memberof IFieldProps
	 */
	schema?: IJsonSchema;

	/**
	 * Значение передаваемое в поле ввода.
	 * 
	 * @type {string}
	 * @memberof IFieldProps
	 */
	value?: string;

	onChange?: Function;
	
	validate?: Function;
	//errorMessages?: string;
}
