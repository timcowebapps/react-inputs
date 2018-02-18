'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Classes, IJsonSchema } from 'timcowebapps-react-utils';

/* Внутрение зависимости. */
import { Field } from '../src/components/field';
import { validationRequired, validationMinLength, validationMaxLength, validationEmail, checkEmail, checkUrl, checkPattern } from '../src/components/validation-rules';
var styles: any = require('./index.scss');

interface IModel {
	website: string;
	message: string;
}

interface IAppState {
	fields: IModel;
}

class App extends React.Component<any, IAppState> {
	/**
	 * Конструктор класса.
	 * 
	 * @class App
	 * @public
	 * @constructor
	 * @param {any} props Свойства компонента.
	 */
	public constructor(props?: any) {
		super(props);

		this.state = this._getInitialState();

		this._handleWebsiteValidation = this._handleWebsiteValidation.bind(this);
		//this._handleMessageValidation = this._handleMessageValidation.bind(this);
		this._handleChangeWebsite = this._handleChangeWebsite.bind(this);
		this._handleChangeMessage = this._handleChangeMessage.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	/**
	 * Начальное состояние свойств по умолчанию.
	 * 
	 * @class App
	 * @private
	 */
	private _getInitialState(): IAppState {
		return {
			fields: {
				website: 'https://timcowebapps.github.io/react-inputs/',
				message: ''
			}
		};
	}

	private _getFormData(): any {
		let refs = this.refs as any;
		let websiteEl: any = ReactDOM.findDOMNode(refs.website_ref).querySelector('input#website_id');
		let messageEl: any = ReactDOM.findDOMNode(refs.message_ref).querySelector('textarea#message_id');

		var data = {
			website: websiteEl.value,
			message: messageEl.value
		};

		return data;
	}

	private _handleWebsiteValidation(value: string): boolean {
		return checkUrl(value);
	}

	private _handleChangeWebsite(event: any): void {
		const newState = this.state.fields;
		newState.website = (event.target as any).value;

		this.setState({
			fields: newState
		});
	}

	private _handleChangeMessage(event: any): void {
		const newState = this.state.fields;
		newState.message = (event.target as any).value;

		this.setState({
			fields: newState
		});
	}

	private _handleSubmit(event: any): void {
		event.preventDefault();

		if ((this.refs as any).website_ref.isValid()) {
			console.log(this._getFormData());
		}
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class App
	 * @public
	 * @method render
	 */
	public render(): JSX.Element {
		return (
			<div style={{ padding: '20px 20px 0' }}>
				<Field
					ref="website_ref"
					validate={this._handleWebsiteValidation}
					value={this.state.fields.website}
					onChange={this._handleChangeWebsite}
					schema={{
						properties: {
							name: "website",
							validators: [
								validationRequired,
								validationMinLength(3),
								validationMaxLength(8),
								validationEmail
							],
							classes: {
								pipeline: styles,
								block: "form_field"
							},
							style: { width: "100%" }
						},
						items: [{
							id: 'input',
							properties: {
								tag: "input",
								type: "url",
								placeholder: "Введите адрес сайта",
								// classes: {
								// 	modifiers: [],
								// 	extra: ""
								// },
								style: ""
							}
						}]
					}} />

				<Field
					ref="message_ref"
					value={this.state.fields.message}
					onChange={this._handleChangeMessage}
					schema={{
						properties: {
							name: "message",
							classes: {
								pipeline: styles,
								block: "form_field"
							},
							style: { width: "100%" }
						},
						items: [{
							id: 'input',
							properties: {
								tag: "textarea",
								placeholder: "Введите сообщение"
							}
						}, {
							id: 'label',
							properties: {
								text: "Текс:"
							}
						}]
					}} />

				<button onClick={this._handleSubmit}>Отправить</button>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
