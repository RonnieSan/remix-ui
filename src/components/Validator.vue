<template>
	<div>
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
		showAllErrors : Boolean
	},
	data() {
		return {
			errors : []
		};
	},
	computed : {
		self() {
			return this;
		}
	},
	methods : {
		// Run the validator
		validate(group_name) {
			return this.validator.validate(group_name)
				.then((is_valid) => {
					this.errors = [];
					return true;
				})
				.catch((err) => {
					this.errors = err;
					return false;
				});
		}
	}
};
</script>
