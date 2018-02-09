'use strict';

export const validationRequired = value => {
	let result = value ? undefined : `This can't be empty`;
	return result;
}

export const validationMinLength = min => value => {
	let result = value && value.length < min
		? `Must be ${min} characters or greater`
		: undefined;
	return result;
};

export const validationMaxLength = max => value => {
	let result = value && value.length > max
		? `Must be ${max} characters or less`
		: undefined;
	return result;
};

export const validationEmail = value => {
	let result = value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;
	return result;
};

export function checkEmail(value: string): boolean {
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

export function checkUrl(value: string): boolean {
	return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(value);
}

export function checkPattern(value: string, regex: string): boolean {
	var pattern = new RegExp(regex);
	return pattern.test(value);
}
