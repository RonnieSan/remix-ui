<template>
	<form ref="form" :method="method" :action="action" @submit.prevent="submitHandler" novalidate>
		<slot></slot>
	</form>
</template>

<script>
export default {
	props : {
		action    : String,
		method    : String,
		validator : Object
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