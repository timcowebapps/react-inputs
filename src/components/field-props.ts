'use strict';

/* Внешние зависимости. */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IJsonSchema } from 'timcowebapps-react-utils';

export namespace FieldProps {
	export interface IProps extends React.Props<any> {
		/**
		 * Схема.
		 * 
		 * @type {IJsonSchema}
		 * @memberof FieldProps.IProps
		 */
		schema: IJsonSchema;

		/**
		 * Значение передаваемое в поле ввода.
		 * 
		 * @type {any}
		 * @memberof FieldProps.IProps
		 */
		value: any;

		/**
		 * Событие изменения данных.
		 * 
		 * @type {Function}
		 * @memberof FieldProps.IProps
		 */
		onChange?: Function;
		
		validate?: Function;
		//errorMessages?: string;
	}

	export const types: PropTypes.ValidationMap<IProps> = {
		schema: PropTypes.shape({
			properties: PropTypes.shape({
				name: PropTypes.string.isRequired,
				classes: PropTypes.object.isRequired
			}),
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					// Ограничение свойства списком валидаторов.
					properties: PropTypes.oneOfType([
						PropTypes.shape({
							tag: PropTypes.string.isRequired,
							type: PropTypes.string
						}),
						PropTypes.shape({
							text: PropTypes.string.isRequired
						})
					])
				})
			)
		}).isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		onChange: PropTypes.func,
		validate: PropTypes.func
	}

	export const defaults: IProps = {
		schema: null,
		value: '',
		onChange: null,
		validate: null
	}
}
