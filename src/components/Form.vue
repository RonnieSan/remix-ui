<template>
	<form ref="form" :method="method" :action="action" @submit.prevent="submitHandler" novalidate>
		<slot></slot>
	</form>
</template>

<script>
import Validator from '@/lib/Validator';

export default {
	provide : {
		form_validator : new Validator()
	},
	props : {
		action : String,
		method : String
	},
	methods : {
		// Submit the form
		submitHandler() {
			if (this.validator) {
				this.validator.validate()
					.then((validation) => {
						this.$emit('submit', this.$refs.form);
					})
					.catch((errors) => {
						this.$emit('error', errors);
					});
			}
			else {
				this.$emit('submit', this.$refs.form);
			}
		}
	}
};
</script>