'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { Classes, Schema } from 'timcowebapps-react-utils';

/* Внутренние зависимости. */
import { FieldProps } from './field-props';
import { FieldState } from './field-state';
import { Label } from './label';

export class Field extends React.Component<FieldProps.IProps, FieldState.IState> {
	public static displayName: string = 'Field';
	public static propTypes: PropTypes.ValidationMap<FieldProps.IProps> = FieldProps.types;
	public static defaultProps = FieldProps.defaults; /*!< Свойства компонента по умолчанию. */

	/**
	 * Конструктор класса.
	 * 
	 * @class Field
	 * @public
	 * @constructor
	 * @param {FieldProps.IProps} props Свойства компонента.
	 */
	public constructor(props?: FieldProps.IProps) {
		super(props);

		this.state = this._getInitialState();
	}

	/**
	 * Начальное состояние свойств по умолчанию.
	 * 
	 * @class Field
	 * @private
	 * @method _getInitialState
	 */
	private _getInitialState(): FieldState.IState {
		return {
			value: this.props.value || "",
			empty: _.isEmpty(this.props.value),
			valid: true,
			focused: false
		};
	}

	public componentWillReceiveProps(nextProps: FieldProps.IProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value,
			});
		}
	}

	public isValid(): Boolean {
		if (this.props.validate) {
			if (_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
				this.setState({
					valid: false
				});
			} else {
				this.setState({
					valid: true
				});
			}
		}

		return this.state.valid;
	}

	/**
	 * Отрисовывает форму ввода.
	 * 
	 * @class Field
	 * @private
	 * @method _renderInput
	 */
	private _renderInput(name: string, classes: any, obj: any) {
		let attributes: any = {};

		if (obj.properties.tag === "textarea") {
			attributes.rows = obj.properties.rows;
			attributes.cols = obj.properties.cols;
			attributes.wrap = obj.properties.wrap;
		} else {
			attributes.type = obj.properties.type || "text";
		}

		attributes.name = name;
		attributes.id = name + "_id";
		attributes.value = this.props.value;
		attributes.placeholder = obj.properties.placeholder || null;
		attributes.className = Classes.bem(classes.pipeline, classes.block, {
			element: "input",
			modifiers: (obj.properties.classes) ? (obj.properties.classes.modifiers || []) : []
		});
		attributes.style = obj.properties.style || null;

		return React.createElement(obj.properties.tag, {
			...attributes,
			onChange: this._handleChange.bind(this),
			onFocus: this._handleFocus.bind(this),
			onBlur: this._handleBlur.bind(this)
		});
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class Field
	 * @public
	 * @method render
	 */
	public render(): JSX.Element {
		const { properties, items } = this.props.schema;

		const labelSchema = Schema.getItemById(items, 'label');
		const inputSchema = Schema.getItemById(items, 'input');

		// for (var i = 0; i < properties.validators.length; ++i) {
		// 	console.log(properties.validators[i](this.state.value));
		// }

		var formGroupClasses = Classes.bem(properties.classes.pipeline, properties.classes.block, {
			modifiers: _.union([
				this.state.valid ? "valid" : "error",
				this.state.focused ? "focused" : "unfocused",
			], properties.classes.modifiers)
		});

		return (
			<div className={formGroupClasses} style={{ ...properties.style }}>
				{labelSchema ? <Label schema={_.merge({}, {
					name: properties.name,
					properties: {
						classes: {
							pipeline: properties.classes.pipeline,
							prefix: properties.classes.block + "__"
						}
					}
				}, labelSchema)} /> : null}
				{this._renderInput(properties.name, properties.classes, inputSchema)}
			</div>
		);
	}

	// #region Events

	private _handleChange(event: any/*JQueryEventObject*/): void {
		if (this.props.validate) {
			let target: any = event.target;
			if (this.props.validate && this.props.validate(target.value)) {
				this.setState({
					empty: _.isEmpty(event.target.value),
					valid: true
				});
			} else {
				this.setState({
					empty: _.isEmpty(event.target.value),
					valid: false
				});
			}
		}

		if (this.props.onChange)
			this.props.onChange(event);
	}

	private _handleFocus(event: any/*JQueryEventObject*/): void {
		this.setState({
			focused: true
		});
	}

	private _handleBlur(event: any/*JQueryEventObject*/): void {
		this.setState({
			focused: false
		});
	}

	// #endregion
}
