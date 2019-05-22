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

export default {
	provide() {
		return {
			field_validator : this
		};
	},
	inject : [
		'form_validator'
	],
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
			default() {
				return this.form_validator
			}
		},
		watch : {
			type : Boolean,
			default : false
		},
		showAllErrors : {
			type : Boolean,
			default : false
		},
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
@import (optional) '~remix-ui-styles/Validation.less';
</style>