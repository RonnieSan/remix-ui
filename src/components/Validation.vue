<template>
	<div :class="{'invalid' : errors.length > 0, 'valid' : isValid}">
		<slot :errors="errors"></slot>
		<ul v-if="errors.length > 0" class="validation-errors">
			<li v-for="error in errors">{{error}}</li>
		</ul>
	</div>
</template>

<script>
import { compact } from 'lodash';

export default {
	data() {
		return {
			local_value : this.value,
			errors      : [],
			id          : null
		};
	},
	props : {
		value : {
			required : true
		},
		label : String,
		disabled : {
			type : Boolean,
			default : false
		},
		group : {
			default : null
		},
		validator : {
			type : Object,
			required : true
		},
		watch : {
			type : Boolean,
			default : true
		},
		rules : {
			type : Array,
			default() {
				return [
					'required'
				];
			}
		}
	},
	computed : {
		isValid() {
			return this.errors.length === 0;
		}
	},
	watch : {
		// Check for changes to the value
		value(new_value) {
			if (new_value !== this.local_value) {
				this.local_value = new_value;
				if (this.watch) {
					this.validate();
				}
			}
		}
	},
	methods : {
		// Validate the field
		validate() {
			if (!this.disabled) {
				return new Promise((resolve, reject) => {
					this.$nextTick(() => {
						Promise.all(this.rules.map((rule) => {
							return rule(this.local_value);
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
		this.id = this.validator.addField(this, this.group);
	},
	beforeDestroy() {
		if (this.id) {
			// Remove the field from the parent validator
			this.validator.removeField(this.id);
		}
	}
};
</script>

<style lang="less" scoped>
// Default variables
@font-size-small: 0.875em;

// Import themes
@import (optional, reference) '~theme';

.validation-errors {
	border: 0;
	font-size: 100%;
	font: inherit;
	list-style: none;
	margin: 0;
	padding: 0;
	vertical-align: baseline;

	li {
		color: #FF4136;
		font-size: @font-size-small;
	}
}
</style>