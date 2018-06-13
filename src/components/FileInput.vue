<template>
	<div class="file-wrapper">
		<div class="inner">
			<input type="text"
				class="label"
				ref="input"
				v-model="value"
				:name="name"
				:disabled="disabled"
				:placeholder="placeholder"
			/>
			<div class="button">
				<icon :class="{'spin' : status === 'uploading'}" :type="icon" size="24"/>
			</div>
		</div>
		<form enctype="multipart/form-data" novalidate>
			<input
				ref="uploader"
				type="file"
				name="files"
				:disabled="disabled"
				:accept="accept"
				v-on="$listeners"
				@change="select($event)"
			/>
		</form>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused   : false,
			form_data : new FormData({
				file_type : 'video'
			}),
			status    : 'inactive'
		};
	},
	computed : {
		icon() {
			if (this.status === 'uploading') {
				return 'loading';
			}
			return 'dots-horizontal';
		}
	},
	props : {
		accept : {
			type : String,
			default : '*/*'
		},
		disabled : Boolean,
		name : String,
		placeholder : {
			type : String,
			default : 'Select a file'
		},
		value : {
			type : String,
			default : ''
		}
	},
	methods : {

		// Select a file to upload
		select(event) {
			// Return if no files added
			if (!event.target.files.length) return;

			// Add files to form_data
			Array
				.from(Array(event.target.files.length).keys())
				.forEach((index) => {
					this.appendData('files', event.target.files[index], event.target.files[index].name);
					this.filename = event.target.files[index].name;
				});

			// Emit an input event
			this.$emit('input', this.filename);

			// Emit the form data
			this.$emit('change', {
				data : this.form_data,
				name : this.filename
			});
		},

		// Append data to the form data
		appendData(name, data, file) {
			this.form_data.append(name, data, file);
		}

	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
// Default variables
@control-bkg-color: #FFF;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-color: #2196F3;
@control-height: 40px;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;

// Import theme
@import (optional, reference) '~theme';

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.file-wrapper {
	border-radius: @control-radius;
	border: @control-border-stroke solid @control-border-color;
	display: inline-block;
	overflow: hidden;
	position: relative;
	width: 100%;

	.inner {
		display: flex;
		flex-direction: row;
	}

	.label {
		flex: 1 0 auto;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		padding: 0 @control-padding;
	}

	.button {
		background-color: @control-color;
		color: #FFF;
		flex: 0 0 calc(@control-height - (@control-border-stroke * 2));
		font-size: @font-size;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
		transition: background-color 150ms ease-out;
	}

	.spin::before {
		animation: spin 750ms infinite linear;
	}

	&:hover .button {
		background-color: lighten(@control-color, 15%);
	}
}

input:focus {
	box-shadow: 0;
	outline: 0;
}

input[type='text'] {
	background-color: @control-bkg-color;
	border: 0;
	flex: 1 0 0 !important;
	font-size: @font-size;
	height: calc(@control-height - (@control-border-stroke * 2));
	padding: 0 @control-padding;
}

input[type='file'] {
	cursor: pointer;
	height: 100%;
	vertical-align: top;
	width: 100%;
}

form {
	bottom: 0;
	left: 0;
	opacity: 0;
	position: absolute;
	right: 0;
	top: 0;
}
</style>