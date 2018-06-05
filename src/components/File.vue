<template>
	<div class="file-wrapper">
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
			default : '.*'
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
@color-primary: #2196F3;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-color: #2196F3;
@control-height: 40px;
@ease-out-quad: cubic-bezier(0.250,  0.460, 0.450, 0.940);
@white: #FFF;

// Import theme
@import (optional, reference) 'theme.less';

.upload-wrapper {
	border-radius: @control-radius;
	border: @control-border-stroke solid @control-border-color;
	display: inline-flex;
	flex-direction: row;
	overflow: hidden;
	position: relative;
	width: 100%;

	.label {
		flex: 1 0 auto;
		height: @control-height;
		line-height: @control-height;
		padding: 0 10px;
	}

	.button {
		background-color: @color-primary;
		color: @white;
		flex: 0 0 @control-height;
		height: @control-height;
		line-height: @control-height;
		text-align: center;
		transition: background-color 150ms @ease-out-quad;
		width: @control-height;
	}

	.spin::before {
		animation: spin 750ms infinite linear;
	}

	input[type='file'] {
		cursor: pointer;
		height: 100%;
		left: 0;
		opacity: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	&:hover .button {
		background-color: darken(@control-color, 15%);
	}
}
</style>