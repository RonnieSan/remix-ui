<template>
	<div :class="['r-file', 'control-border', 'focusable', {disabled}]">
		<slot name="left"></slot>
		<div class="inner">
			<slot>
				<input type="text"
					class="label"
					ref="input"
					v-model="value"
					:name="name"
					:disabled="disabled"
					:placeholder="placeholder"
					@keypress="keypressHandler"
				/>
				<div class="button">
					<icon :class="{'spin' : status === 'uploading'}" :type="icon" size="24"/>
				</div>
			</slot>
		</div>
		<form ref="form" enctype="multipart/form-data" novalidate>
			<input
				ref="uploader"
				type="file"
				name="files"
				:disabled="disabled"
				:accept="accept"
				v-on="listeners"
			/>
		</form>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		accept : {
			type : String,
			default : '*/*'
		},
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
		},
		disabled : Boolean
	},
	data() {
		return {
			focused   : false,
			form_data : new FormData(this.$refs.form),
			filename  : null,
			status    : 'inactive'
		};
	},
	computed : {
		icon() {
			if (this.status === 'uploading') {
				return 'loading';
			}
			return 'dots-horizontal';
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						let use_default;
						if (vm.$listeners.change) {
							use_default = vm.$listeners.change(event);
						}
						if (use_default !== false) {
							vm.select(event);
						}
					},
					input(event) {
						vm.dirty = true;
						vm.validate();
					}
				}
			);
		}
	},
	methods : {

		// Select a file to upload
		select(event) {
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
				files : event.target.files,
				name : this.filename
			});
		},

		// Append data to the form data
		appendData(name, data, file) {
			this.form_data.append(name, data, file);
		},

		// Intercept keypresses
		keypressHandler(event) {
			event.preventDefault();
			if (event.key === ' ' || event.key === 'Enter') {
				this.$refs.uploader.click();
			}
		}

	},
	mixins : [
		formField
	]
};
</script>