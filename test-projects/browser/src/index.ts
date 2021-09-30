/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
// Imports
import cssValidator from 'w3c-css-validator';
import {
	ValidateTextResultBase,
	ValidateTextResultWithWarnings,
	ValidateURLResultBase,
	ValidateURLResultWithWarnings,
} from '../../../dist/types/result';

// Wait until DOM content is available to attempt to make changes
document.addEventListener('DOMContentLoaded', () => {
	// Set flag to see if page loaded as expected
	document.title = 'Hello world!';

	// Grab elements
	const makeCall = document.querySelector<HTMLButtonElement>('#make-call');
	const customCSS = document.querySelector<HTMLTextAreaElement>('#custom-css');
	const isValid = document.querySelector<HTMLHeadingElement>('#is-valid');
	const errors = document.querySelector<HTMLUListElement>('#errors');
	const warnings = document.querySelector<HTMLUListElement>('#warnings');
	const warningLevelSelect = document.querySelector<HTMLSelectElement>('#warning-level');
	const methodSelect = document.querySelector<HTMLSelectElement>('#method');

	// Throw if any element is not present
	if (!makeCall) {
		throw new Error('Make call button should be present');
	}

	if (!customCSS) {
		throw new Error('Custom CSS text area should be present');
	}

	if (!isValid) {
		throw new Error('Validity heading should be present');
	}

	if (!errors) {
		throw new Error('Unordered list of errors should be present');
	}

	if (!warnings) {
		throw new Error('Unordered list of warnings should be present');
	}

	if (!warningLevelSelect) {
		throw new Error('Warning level select should be present');
	}

	if (!methodSelect) {
		throw new Error('Method select should be present');
	}

	// Handle result
	const handleResult = (
		result:
			| ValidateTextResultBase
			| ValidateTextResultWithWarnings
			| ValidateURLResultBase
			| ValidateURLResultWithWarnings
	): void => {
		isValid.innerText = String(result.valid);

		result.errors.forEach((error) => {
			const li = document.createElement('li');
			li.innerText = error.message;

			errors.appendChild(li);
		});

		if ('warnings' in result) {
			result.warnings.forEach((warning) => {
				const li = document.createElement('li');
				li.innerText = warning.message;

				warnings.appendChild(li);
			});
		}
	};

	// Handle makeCall clicks
	makeCall.addEventListener('click', () => {
		const warningLevel = Number(warningLevelSelect.value);
		const method = methodSelect.value as keyof typeof cssValidator;

		if (warningLevel > 0) {
			cssValidator[method](customCSS.value, { warningLevel: warningLevel as 1 | 2 | 3 })
				.then(handleResult)
				.catch(() => {
					throw new Error('Promise rejected');
				});
		} else {
			cssValidator[method](customCSS.value)
				.then(handleResult)
				.catch(() => {
					throw new Error('Promise rejected');
				});
		}
	});
});
