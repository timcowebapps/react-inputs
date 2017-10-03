'use strict';

/* Внешние зависимости. */
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IJsonSchema } from 'timcowebapps-react-utils';

/* Внутрение зависимости. */
import { TextInput } from '../src/components/textInput';
var textInputStyles: any = require('../src/components/textInput.scss');

const App: React.StatelessComponent<any> = (props: any) => {
	return (
		<div style={{ padding: '20px 20px 0' }}>
			<TextInput
				styles={textInputStyles}
				type="text"
				name="text"
				text='Текст'
				placeholder="Введите текст."
				errorMessages="Обязательное поле." 
				required={true} />
		</div>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('container')
);