<template>
	<div>
		<slot name="errors" v-bind="self">
			<ul v-if="showErrors && errors.length" class="validation-errors">
				<template>
					<li v-for="error in errors">{{error}}</li>
				</template>
			</ul>
		</slot>
		<slot></slot>
	</div>
</template>

<script>
import Validator from '../lib/Validator';

export default {
	provide () {
		return {
			form_validator : this.validator
		};
	},
	props : {
		validator: {
			type: Object,
			default () {
				return new Validator();
			}
		},
		showErrors : Boolean
	},
	computed : {
		self() {
			return this;
		},
		errors() {
			return this.validator.errors || [];
		}
	},
	methods : {
		// Run the validator
		validate(group_name) {
			return this.validator.validate(group_name);
		},

		// Reset errors on all the fields
		reset() {
			this.validator.reset();
		}
	}
};
</script>
