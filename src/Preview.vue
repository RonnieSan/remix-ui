<template>
	<div id="wrapper">
		<modal ref="modal" max-width="600px">
			<div class="padded" slot-scope="modal">
				<h2>My Modal</h2>
				<p>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
				<a href="javascript:void(0)" @click="triggerAlert()">Open Nested Modal</a> | <a href="javascript:void(0)" @click="modal.close()">Close Modal</a>
			</div>
		</modal>
		<div class="container">
			<r-form>
				<grid>
					<row>
						<column>
							<h1>Remix UI Components</h1>
							<hr>
							<h2>Form Components</h2>
							
							<div class="control-group">
								<label class="control-label"><span class="text-color-red">*</span> Text Input with Validation:</label>
								<div class="controls">
									<div class="field">
										<r-validation
											v-model="text_value"
											:rules="[validator.rules.required(), validator.rules.minLength(5)]"
										>
											<r-text
												name="text"
												v-model="text_value"
											>
											<div class="helper" slot="right">
												<icon type="alert-circle" size="24"/>
											</div>
											</r-text>
										</r-validation>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Text with Auto-Complete:</label>
								<div class="controls">
									<div class="field">
										<autocomplete
											v-model="autocomplete_value"
											:options="autocomplete_options"
										>
											<r-text
												name="autocomplete_text"
												v-model="autocomplete_value"
											/>
										</autocomplete>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Number Input:</label>
								<div class="controls">
									<div class="field">
										<r-validation
											v-model="number_value"
											:rules="[validator.rules.required()]"
										>
											<r-number
												name="number"
												:rules="[ rules.required() ]"
												v-model.number="number_value"
											/>
										</r-validation>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Currency Input:</label>
								<div class="controls">
									<div class="field">
										<r-currency
											name="currency"
											v-model="currency_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Password Input:</label>
								<div class="controls">
									<div class="field">
										<r-password
											name="password"
											v-model="password_value"
										>
										<div class="helper" slot="left">
											<icon type="lock" size="24"/>
										</div>
										</r-password>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Multi-Text:</label>
								<div class="controls">
									<div class="field">
										<r-multi-text
											name="multi_text"
											v-model="multi_text_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Pillbox:</label>
								<div class="controls">
									<div class="field">
										<r-pillbox
											name="pillbox"
											v-model="pillbox_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Datepicker:</label>
								<div class="controls">
									<div class="field">
										<r-datepicker
											name="datepicker"
											v-model="datepicker_value"
											:options="{timepicker : true}"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<div class="inner">
									<label class="control-label">Timepicker: {{timepicker_value}}</label>
									<div class="controls">
										<div class="field">
											<r-timepicker
												name="timepicker"
												v-model="timepicker_value"
												:options="{seconds : true}"
											/>
										</div>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Textarea:</label>
								<div class="controls">
									<div class="field">
										<r-textarea
											name="textarea"
											v-model="textarea_value"
											max-height="300px"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Code Input:</label>
								<div class="controls">
									<div class="field">
										<r-code
											name="code"
											id="code"
											v-model="code_value"
											:options="{fontFamily : 'Courier New'}"
											max-height="300px"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Markdown:</label>
								<div class="controls">
									<div class="field">
										<r-markdown
											name="markdown"
											v-model="markdown_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Template Editor:</label>
								<div class="controls">
									<div class="field">
										<r-template-editor
											template-src="http://www.ronniesan.com"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Select:</label>
								<div class="controls">
									<div class="field">
										<r-select
											name="select"
											v-model="select_value"
											:options="select_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<div class="inner">
									<label class="control-label">Group Select:</label>
									<div class="controls">
										<div class="field">
											<r-group-select
												name="group_select"
												v-model="group_select_value"
												:options="options"
											/>
										</div>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Multi-Select:</label>
								<div class="controls">
									<div class="field">
										<r-multi-select
											name="multi_select"
											v-model="multi_select_value"
											:options="multiselect_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">File Input:</label>
								<div class="controls">
									<div class="field">
										<r-file
											name="file"
											v-model="file_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Checklist:</label>
								<div class="controls">
									<div class="field">
										<r-checklist
											name="checklist"
											v-model="checklist_value"
											:options="options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Toggle:</label>
								<div class="controls">
									<div class="field">
										<r-toggle
											name="toggle"
											v-model="toggle_value"
										>This is the value</r-toggle>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Switch:</label>
								<div class="controls">
									<div class="field">
										<r-switch
											name="switch"
											v-model="switch_value"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Radio:</label>
								<div class="controls">
									<div class="field">
										<r-radio
											name="radio"
											v-model="radio_value"
											value="Yes"
										>Yes</r-radio>
									</div>
									<div class="field">
										<r-radio
											name="radio"
											v-model="radio_value"
											value="No"
										>No</r-radio>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Radio Group:</label>
								<div class="controls">
									<div class="field">
										<r-radio-group
											name="radio_group"
											v-model="radio_group_value"
											:options="options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Slider:</label>
								<div class="controls">
									<div class="field">
										<r-slider
											name="slider"
											v-model="slider_value"
											:options="slider_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<div class="controls">
									<div class="field fit">
										<label class="control-label">Button:</label><br />
										<r-button>No Action</r-button>
									</div>
									<div class="field fit">
										<label class="control-label">Button with Icon:</label><br />
										<r-button icon="cancel">No Action</r-button>
									</div>
									<div class="field fit">
										<label class="control-label">Loading Button:</label><br />
										<r-button icon="send" :loading="is_loading" @click="buttonLoader()">Loading</r-button>
									</div>
									<div class="field fit">
										<label class="control-label">Disabled Button:</label><br />
										<r-button disabled @click="alert('hello')">Disabled</r-button>
									</div>
								</div>
							</div>

							<r-form-builder :config.sync="formBuilderConfig"/>

							<h2>Modals</h2>

							<div class="control-group">
								<div class="controls">
									<div class="field fit">
										<r-button @click="$refs.modal.open()">Open Modal</r-button>
									</div>
									<div class="field fit">
										<button type="button" @click="triggerAlert()">
											<span class="label">Trigger Alert</span>
										</button>
									</div>
									<div class="field fit">
										<button type="button" @click="triggerConfirm()">
											<span class="label">Trigger Confirm</span>
										</button>
									</div>
								</div>
							</div>

							<h2>Toast Messages</h2>

							<div class="control-group">
								<div class="controls">
									<div class="field fit">
										<r-button class="bkg-color-green" icon="check" @click="$toast.success('Something successful happened.')">Success</r-button>
									</div>
									<div class="field fit">
										<r-button class="bkg-color-red" icon="alert-octagon" @click="$toast.error('Something went wrong.')">Error</r-button>
									</div>
									<div class="field fit">
										<r-button class="bkg-color-yellow" icon="alert" @click="$toast.warning('Be careful!')">Warning</r-button>
									</div>
									<div class="field fit">
										<r-button icon="information" @click="$toast.info('A toast message was fired.')">Info</r-button>
									</div>
								</div>
							</div>

							<h2>Tabs</h2>

							<tabs :active-tab-id="tab_id" @change="(id) => {tab_id = id}">
								<tab label="One" tab-id="one">
									<div class="padded">
										<p>Tab one is open.</p>
									</div>
								</tab>
								<tab label="Two" tab-id="two">
									<div class="padded">
										<p>Tab two is open.</p>
									</div>
								</tab>
							</tabs>

						</column>
					</row>
				</grid>
			</r-form>
		</div>
	</div>
</template>

<script>
import Validator, { rules } from './lib/Validator';

export default {
	data() {
		return {
			rules,
			validator : new Validator(),
			text_value : '',
			autocomplete_value : '',
			autocomplete_options : [
				'Red',
				'Purple',
				'Blue',
				'Green',
				'Yellow'
			],
			number_value : 12345,
			password_value : '',
			textarea_value : '',
			select_value : null,
			group_select_value : [
				'Red'
			],
			checklist_value : [],
			radio_value : 'Yes',
			radio_group_value : 'Red',
			file_value : null,
			currency_value : 5.00,
			pillbox_value : [],
			datepicker_value : [
				'2018-01-01',
				'2018-01-31'
			],
			timepicker_value : '00:00:00',
			code_value : '',
			multi_text_value : [],
			multi_select_value : [],
			slider_value : [
				1,
				8
			],
			slider_options : {
				min       : 1,
				max       : 8,
				increment : 1,
				formatter : false,
				snap      : true
			},
			toggle_value : true,
			switch_value : false,
			markdown_value : '',
			form_data : {
				name : 'Fermegatroid Skittle',
				phone : '6195551212',
				gender : 'male',
				age : 38
			},
			options : [
				'Red',
				'Orange',
				'Purple',
				'Blue',
				'Green',
				'Yellow',
				'Indigo',
				'Cyan',
				'Magenta'
			],
			multiselect_options : [
				'Primary Colors',
				[
					'Red',
					'Blue',
					'Yellow'
				],
				'Secondary Colors',
				[
					'Orange',
					'Purple',
					'Green'
				]
			],
			select_options : [
				{label : 'One', value : 1},
				{label : 'Two', value : 2},
				{label : 'Other Numbers', value : [
					{label : 'Three', value : 3},
					{label : 'Four', value : 4},
					{label : 'Five', value : 5}
				]}
			],
			nav_items : [
				{target : '#one', label : 'One'},
				{target : '#two', label : 'Two'},
				{target : '#three', label : 'Three'}
			],
			tab_id : 'one',
			is_loading : false
		};
	},
	computed : {
		formBuilderConfig : {
			get : function() {
				return [
					{
						type : 'fieldset',
						class : 'my-set',
						heading : 'Form Builder',
						controls : [
							{
								fields : [
									{
										before : '<label class="control-label">Name:</label>',
										component : 'r-text',
										model : 'name',
										value : this.form_data.name,
										validation : {
											rules : [rules.required()]
										}
									},
									{
										before : '<label class="control-label">Last Name:</label>',
										component : 'r-text',
										model : 'phone',
										value : this.form_data.phone,
										props : {
											mask : '(###) ###-####'
										},
										validation : {
											rules : [rules.required()]
										}
									}
								]
							},
							{
								label : 'Gender:',
								fields : [
									{
										component : 'r-select',
										model : 'gender',
										value : this.form_data.gender,
										props : {
											options : [
												{label : 'Male', value : 'male'},
												{label : 'Female', value : 'female'}
											]
										}
									}
								]
							}
						]
					}
				];
			},
			set : function(new_value) {
				Object.assign(this.form_data, new_value);
			}
		}
	},
	methods : {
		triggerAlert() {
			this.$msg.alert({
				title : 'Something Was Clicked!',
				message :  'OMG! Someone clicked something!'
			});
		},

		triggerConfirm() {
			this.$msg.confirm({
				title : 'Make a Choice',
				message :  'Are you sure you want to cancel?'
			})
				.then((accepted) => {
					if (accepted) {
						this.$toast.success('You selected OK.');
					}
					else {
						this.$toast.error('You selected CANCEL.');
					}
				});
		},

		buttonLoader() {
			this.is_loading = true;

			setTimeout(() => {
				this.is_loading = false;
			}, 3000);
		},
	}
};
</script>

<style lang="less">
@import (css) '~@mdi/font/css/materialdesignicons.min.css';
@import '~remix-css-theme-default';
@import './styles/Toast.less';
@import './styles/Msg.less';

@full-width: 720px;
@desktop-width: 720px;
@laptop-width: 720px;
@mono-font: 'Roboto Mono', Menlo, 'Droid Sans Mono', Courier, System;

#wrapper {
	padding: 50px 0;
}
</style>
