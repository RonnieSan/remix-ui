// ----------------------------------------------------------------------
// FORM FIELD MIXIN
// Common attributes for form fields
// ----------------------------------------------------------------------

export default {
	inject : {
		field_validation : {
			default() {
				return {};
			}
		}
	},
	props : {
		name     : String,
		tabindex : Number
	},
	data() {
		return {
			dirty   : false,		// The field has been modified
			touched : false			// The field has been focused
		};
	},
	methods : {
		// Focus on form element when called
		focus() {
			if (this.$refs.input) {
				if (Array.isArray()) {
					this.$refs.input[0].focus();
				}
				else {
					this.$refs.input.focus();
				}
			}
		},
		validate(force) {
			if (this.touched || force) {
				this.$emit('validate');
			}
		}
	}
};