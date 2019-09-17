// --------------------------------------------------
// REMIX UI VALIDATOR CLASS
// --------------------------------------------------

// Import dependencies
import { 
	compact,
	every,
	flatten,
	forIn,
	isEmpty,
	isNull,
	isUndefined,
	keys,
	merge,
	uniqueId
} from 'lodash-es';

export const rules = {
	// The field is required
	required(message, options = {}) {
		options = Object.assign({
			min: 1,
			max: Infinity
		}, options);

		return function(value) {
			switch (typeof value) {
				case 'string':
				case 'array':
					if (value.length > 0) {
						return null;
					}
					break;
				case 'number':
					if (value >= options.min && value <= options.max) {
						return null
					}
					break;
				case 'boolean':
					if (value !== false) {
						return null;
					}
					break;
				case 'object':
					if (!isEmpty(value)) {
						return null;
					}
					break;
				default:
					if (!isUndefined(value) && !isNull(value)) {
						return null;
					}
					break;
			}
			return message || 'This field is required';
		};
	},

	// The field has a minimum length required
	minLength(min_length, message) {
		return function(value) {
			if (typeof value !== 'undefined' && value.length >= min_length) {
				return null;
			}
			return message || `Value must be at least ${min_length} characters`;
		};
	},

	// The field has a maximum length required
	maxLength(max_length, message) {
		return function(value) {
			if (typeof value !== 'undefined' && value.length <= max_length) {
				return null;
			}
			return message || `Value cannot exceed ${max_length} characters`;
		};
	},

	// The field has a minimum value required
	min(min, message) {
		return function(value) {
			if (typeof value !== 'undefined' && value >= min) {
				return null;
			}
			return message || `Value must be at least ${min}`;
		};
	},

	// The field has a maximum value required
	max(max, message) {
		return function(value) {
			if (typeof value !== 'undefined' && value <= max) {
				return null;
			}
			return message || `Value must not exceed ${max}`;
		};
	},

	// The field must match a pattern
	pattern(regex, message) {
		return function(value) {
			const pattern = new RegExp(regex);
			if (typeof value !== 'undefined' && pattern.test(value)) {
				return null;
			}
			return message || 'Please enter a valid value';
		};
	},

	// The field must match a value
	match(match_value, message) {
		return function(value) {
			if (!match_value || value === match_value) {
				return null;
			}
			return message || 'The value does not match';
		};
	},

	// The field must be an email
	email(value, message) {
		return function(value) {
			const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (typeof value !== 'undefined' && pattern.test(value)) {
				return null;
			}
			return message || 'Please enter a valid email address';
		};
	}
};

export default class Validator {
	constructor(options = {}) {
		// Create a container for the fields
		this.fields = {};
		this.force_validate = false;

		// Default validation rules
		this.rules = rules;

		if (options.rules) {
			merge(this.rules, options.rules);
		}
	}

	// Add a new field to the validator
	addField(field_validator) {
		let id = uniqueId();
		this.fields[id] = (field_validator);
	}

	// Remove a field from the validator
	removeField(id) {
		delete this.fields[id];
	}

	// Check validity of all fields
	isValid() {
		return every(keys(this.fields, (name) => {
			return (this.fields[name].errors.length === 0);
		}));
	}

	// Reset the errors on all the fields
	reset() {
		forIn(this.fields, (field) => {
			field.errors = [];
		});
	}

	// Run validation on all fields
	validate(group_name) {
		let field_validations = [];
		forIn(this.fields, (field, name) => {
			if (group_name && field.group === group_name) {
				field_validations.push(field.validate(true));
			}
			else {
				field_validations.push(field.validate(true));
			}
		});

		return Promise.all(field_validations)
			.then((errors) => {
				errors = compact(flatten(errors));

				if (errors.length > 0) {
					throw new Error(errors);
				}
				else {
					return true;
				}
			});
	}
}
