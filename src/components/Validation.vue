<template>
	<div :class="{'invalid' : errors.length > 0, 'valid' : isValid}">
		<slot v-bind="self"></slot>
		<slot name="errors" v-bind="self">
			<ul v-if="errors.length > 0" class="validation-errors">
				<template v-if="showAllErrors">
					<li v-for="error in errors">{{error}}</li>
				</template>
				<template v-else>
					<li>{{errors[0]}}</li>
				</template>
			</ul>
		</slot>
	</div>
</template>

<script>
import { compact } from 'lodash-es';
import Validator from '../lib/Validator';

export default {
	provide() {
		return {
			field_validator : this
		};
	},
	inject : {
		form_validator : {
			name : 'form_validator',
			default() {
				return new Validator();
			}
		}
	},
	props : {
		value : {
			required : true
		},
		disabled : Boolean,
		group : {
			type : String,
			default : null
		},
		validator : {
			type : Object,
			default() {
				return this.form_validator
			}
		},
		watch : Boolean,
		showAllErrors : Boolean,
		rules : {
			type : Array,
			default() {
				return [
					this.validator.rules.required()
				];
			}
		}
	},
	data() {
		return {
			local_value : this.value,
			errors      : [],
			id          : null
		};
	},
	computed : {
		self() {
			return this;
		},
		isValid() {
			return this.errors.length === 0;
		}
	},
	watch : {
		// Check for changes to the value
		value(new_value) {
			if (new_value !== this.local_value) {
				this.local_value = new_value;
				this.$emit('change', new_value);
				if (this.watch) {
					this.validate();
				}
			}
		}
	},
	methods : {
		// Reset all errors on the validator
		reset() {
			this.errors = [];
		},

		// Validate the field
		validate() {
			if (!this.disabled) {
				return new Promise((resolve, reject) => {
					this.$nextTick(() => {
						Promise.all(this.rules.map((rule) => {
							if (typeof rule === 'function') {
								return rule(this.local_value);
							}
							return 'Error while trying to validate this field';
						}))
							.then((errors) => {
								// Set the errors
								this.errors = compact(errors);

								// Emit the errors
								this.$emit('validate', this.errors);

								// Resolve the promise
								resolve(errors);
							})
							.catch((err) => {
								reject(err);
							});
					});
				});
			}
			else {
				return Promise.resolve();
			}
		}
	},
	created() {
		// Add a reference to this field on the validator
		this.id = this.validator.addField(this);
	},
	beforeDestroy() {
		if (this.id) {
			// Remove the field from the parent validator
			this.validator.removeField(this.id);
		}
	}
};
</script>