'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IJsonSchema } from 'timcowebapps-react-utils';

/* Внутрение зависимости. */
import { TextInput } from '../src/components/textInput';
var textInputStyles: any = require('../src/components/textInput.scss');

class App extends React.Component<any, any> {
	/**
	 * Конструктор класса.
	 * 
	 * @class App
	 * @constructor
	 * @param {any} props Свойства компонента.
	 */
	public constructor(props?: any) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	private _getFormData(): any {
		console.log('_getFormData', Object.keys(this.refs));

		let refs: any = this.refs;
		let usernameEl: any = ReactDOM.findDOMNode(refs.username).querySelector('input#username_field');
		let passwordEl: any = ReactDOM.findDOMNode(refs.password).querySelector('input#password_field');

		var data = {
			username: usernameEl.value,
			password: passwordEl.value
		};

		return data;
	}

	private _handleSubmit(event: any): void {
		event.preventDefault();
		console.log(this._getFormData());
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class App
	 * @method render
	 */
	public render(): JSX.Element {
		return (
			<div style={{ padding: '20px 20px 0' }}>
				<TextInput
					styles={textInputStyles}
					type="text"
					name="username"
					ref="username"
					text='Имя пользователя'
					placeholder="Введите текст."
					errorMessages="Обязательное поле."
					required={true} />

				<TextInput
					styles={textInputStyles}
					type="password"
					name="password"
					ref="password"
					text='Пароль'
					placeholder="Введите текст."
					errorMessages="Обязательное поле."
					required={true} />

				<button onClick={this._handleSubmit}>Sign in</button>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
