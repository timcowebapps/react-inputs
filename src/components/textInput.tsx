'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Classes } from 'timcowebapps-react-utils';

/* Внутренние зависимости. */
import { ITextInputProps } from './textInputProps';
import { ITextInputState } from './textInputState';

export class TextInput extends React.Component<ITextInputProps, ITextInputState> {
	public static displayName: string = 'TextInput';

	public static propTypes: PropTypes.ValidationMap<ITextInputProps> = {
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		defaultValue: PropTypes.string,
		value: PropTypes.string,
		text: PropTypes.string,
		placeholder: PropTypes.string,
		onChange: PropTypes.func,
		required: PropTypes.bool
	}

	/**
	 * Свойства компонента по умолчанию.
	 */
	public static defaultProps = {
		styles: null,
		type: 'text',
		name: '',
		defaultValue: '',
		value: '',
		text: '',
		placeholder: '',
		onChange: null,
		required: false,
		errorMessages: ''
	}

	/**
	 * Конструктор класса.
	 * 
	 * @class TextInput
	 * @constructor
	 * @param {ITextInputProps} props Свойства компонента.
	 */
	public constructor(props?: ITextInputProps) {
		super(props);

		this.state = this._getInitialState();
	}

	/**
	 * Начальное состояние свойств по умолчанию.
	 */
	private _getInitialState(): any {
		return {
			value: this.props.value || '',
			errorMessages: this.props.errorMessages,
			valid: true,
			focused: false
		};
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.value) {
			if (!_.isUndefined(nextProps.value) && nextProps.value.length > 0) {
				if (this.props.validate && this.props.validate(nextProps.value)) {
					this.setState({
						valid: true
					});
				} else {
					this.setState({
						valid: false
					});
				}
			}
		}
	}

	public isValid(): Boolean {
		if (this.props.validate) {
			if (_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
				this.setState({
					valid: false
				});
			}
		}

		return this.state.valid;
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class TextInput
	 * @method render
	 */
	public render(): JSX.Element {
		let {
			styles
		} = this.props;
		
		var formGroupClasses = Classes.combine(styles.form_group, {
			[styles.form_group__valid]: this.state.valid,
			[styles.form_group__error]: !this.state.valid,
			[styles.form_group__empty]: true,
			[styles.form_group__focused]: this.state.focused,
			[styles.form_group__unfocused]: !this.state.focused
		});

		let error = this.state.valid ? null : React.DOM.strong({ className: styles.error }, this.state.errorMessages);

		return (
			<div className={formGroupClasses}>
				<label className="control-label" htmlFor={"id_" + this.props.name}>
					{this.props.text}
					{(this.props.required) ? <span className={styles.required_field}>*</span> : null}
				</label>

				<div>
					<input
						ref="field"
						type={this.props.type}
						name={this.props.name}
						id={"id_" + this.props.name}
						defaultValue={this.props.defaultValue}
						onChange={this._onChange.bind(this)}
						onFocus={this._onFocus.bind(this)}
						onBlur={this._onBlur.bind(this)}
						placeholder={this.props.placeholder}
						maxLength={128}
						required={this.props.required} />
					<p id={"error_id_" + this.props.name} className={styles.help_block}>
						{error}
					</p>
				</div>
			</div>
		);
	}

	// #region Events

	private _onChange(event: any/*JQueryEventObject*/): void {
		if (this.props.validate) {
			let target: any = event.target;
			if (this.props.validate && this.props.validate(target.value)) {
				this.setState({
					valid: true
				});
			} else {
				this.setState({
					valid: false
				});
			}
		}

		if (this.props.onChange)
			this.props.onChange(event);
	}

	private _onFocus(event: any/*JQueryEventObject*/): void {
		this.setState({
			focused: true
		});
	}

	private _onBlur(event: any/*JQueryEventObject*/): void {
		this.setState({
			focused: false
		});
	}

	// #endregion
}