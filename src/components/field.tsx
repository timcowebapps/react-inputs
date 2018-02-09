'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { Classes } from 'timcowebapps-react-utils';

/* Внутренние зависимости. */
import { IFieldProps } from './field-props';
import { IFieldState } from './field-state';
import { Label } from './label';

export class Field extends React.Component<IFieldProps, IFieldState> {
	public static displayName: string = 'Field';

	public static propTypes: PropTypes.ValidationMap<IFieldProps> = {
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
		}),
		value: PropTypes.string,
		onChange: PropTypes.func,
		validate: PropTypes.func
	}

	/**
	 * Свойства компонента по умолчанию.
	 */
	public static defaultProps = {
		value: '',
		onChange: null,
		validate: null
	}

	/**
	 * Конструктор класса.
	 * 
	 * @class Field
	 * @public
	 * @constructor
	 * @param {IFieldProps} props Свойства компонента.
	 */
	public constructor(props?: IFieldProps) {
		super(props);

		this.state = this._getInitialState();
	}

	/**
	 * Начальное состояние свойств по умолчанию.
	 */
	private _getInitialState(): IFieldState {
		let inputDefaultValue = "";
		let inputSchema = _.filter(this.props.schema.items, { id: 'input' })[0];
		if (inputSchema.default)
			inputDefaultValue = inputSchema.default.value;

		return {
			value: this.props.value || inputDefaultValue,
			empty: this._isEmpty(this.props.value || inputDefaultValue),
			valid: true,
			focused: false
		};
	}

	public componentWillReceiveProps(nextProps: IFieldProps) {
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

	private _isEmpty(value: string) {
		return value === '';
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
		attributes.defaultValue = (obj.default) ? obj.default.value : "";
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

		// for (var i = 0; i < properties.validators.length; ++i) {
		// 	console.log(properties.validators[i](this.state.value));
		// }

		var formGroupClasses = Classes.bem(properties.classes.pipeline, properties.classes.block, {
			modifiers: [
				this.state.valid ? "valid" : "error",
				this.state.focused ? "focused" : "unfocused"
			]
		});

		return (
			<div className={formGroupClasses} style={{ ...properties.style }}>
				<Label schema={_.merge({}, {
					properties: {
						classes: {
							pipeline: properties.classes.pipeline,
							prefix: properties.classes.block + "__"
						}
					}
				}, _.filter(items, { id: 'label' })[0])} />

				{this._renderInput(properties.name, properties.classes, _.filter(items, { id: 'input' })[0])}
			</div>
		);
	}

	// #region Events

	private _handleChange(event: any/*JQueryEventObject*/): void {
		if (this.props.validate) {
			let target: any = event.target;
			if (this.props.validate && this.props.validate(target.value)) {
				this.setState({
					empty: this._isEmpty(event.target.value),
					valid: true
				});
			} else {
				this.setState({
					empty: this._isEmpty(event.target.value),
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
