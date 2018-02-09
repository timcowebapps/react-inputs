'use strict';

/* Внешние зависимости. */
import * as React from 'react';
import { IJsonSchema } from 'timcowebapps-react-utils';

export interface ILabelProps extends React.Props<any> {
	/**
	 * Схема.
	 * 
	 * @type {IJsonSchema}
	 * @memberof ILabelProps
	 */
	schema?: IJsonSchema;
}
