'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { Classes } from 'timcowebapps-react-utils'

/* Внутренние зависимости. */
import { ILabelProps } from './label-props';

export class Label extends React.Component<ILabelProps, any> {
	public static displayName: string = 'Label';

	public static propTypes: PropTypes.ValidationMap<ILabelProps> = {
		schema: PropTypes.shape({
			properties: PropTypes.shape({
				classes: PropTypes.object.isRequired
			})
		})
	}

	/**
	 * Конструктор класса.
	 * 
	 * @class Label
	 * @public
	 * @constructor
	 * @param {ILabelProps} props Свойства компонента.
	 */
	public constructor(props?: ILabelProps) {
		super(props);
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class Label
	 * @public
	 * @method render
	 */
	public render(): JSX.Element {
		const { properties, items, name } = this.props.schema;

		return React.createElement('label', {
			htmlFor: name + "_id",
			className: Classes.bem(properties.classes.pipeline, "label", {
				modifiers: (properties.classes) ? (properties.classes.modifiers || []) : []
			}, { prefix: properties.classes.prefix })
		}, properties.text);
	}
}
