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
		<form ref="form" enctype="multipart/form-data" novalidate>
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
			form_data : new FormData(this.$refs.form, {
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
		name : {
			type : String,
			default : 'files'
		},
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
					this.form_data.delete(this.name);
					this.appendData(this.name, event.target.files[index], event.target.files[index].name);
					this.filename = event.target.files[index].name;
				});

			// Emit an input event
			this.$emit('input', this.filename);

			// Emit the form data
			this.$emit('select', {
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
@import (optional) '~remix-ui-styles/FileInput.less';
</style>