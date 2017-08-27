## React-Buttons [![dependencies](https://david-dm.org/timcowebapps/react-inputs.svg)](https://david-dm.org/timcowebapps/react-inputs)

[![NPM](https://nodei.co/npm/timcowebapps-react-inputs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/timcowebapps-react-inputs/)

Микрокомпонент полей ввода

### Зависимости

```console
$ npm i -S timcowebapps-react-utils react react-dom prop-types lodash
$ npm i -D webpack webpack-dev-server typescript ts-node ts-loader style-loader sass-loader path node-sass css-loader html-webpack-plugin extract-text-webpack-plugin @types/react-dom @types/react @types/node @types/jquery
```

### Установка компонента

```console
$ npm i -S timcowebapps-react-inputs
```

### Настройка webpack

```js
{
	// ...
	resolve: {
		alias: {
			'dir': path.resolve(__dirname, 
				'node_modules', 'timcowebapps-react-inputs', 'lib')
		}
	}
	// ...
}
```