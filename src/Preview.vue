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
										<validation
											ref="text_validation"
											v-model="text_value"
											:validator="validator"
											:rules="[validator.rules.required(), validator.rules.minLength(5)]"
										>
											<r-text
												name="text"
												v-model="text_value"
												@validate="$refs.text_validation.validate()"
											>
											<div class="helper" slot="right">
												<icon type="alert-circle" size="24"/>
											</div>
											</r-text>
										</validation>
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
										<r-number
											name="number"
											v-model="number_value"
										/>
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
										/>
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
								<label class="control-label">Select:</label>
								<div class="controls">
									<div class="field">
										<r-select
											name="select"
											v-model="select_value"
											:options="options"
										/>
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
											:options="options"
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
								<div class="inner">
									<div class="controls">
										<div class="field">
											<r-checkbox>This is the label<br />And it's so cool...</r-checkbox>
										</div>
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
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Button:</label>
								<div class="controls">
									<div class="field">
										<r-button>Click Me (I Do Nothing)</r-button>
									</div>
								</div>
							</div>

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

							<tabs active-tab-id="one">
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
import Validator from './lib/Validator';

export default {
	data() {
		return {
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
			select_value : 'Red',
			checklist_value : [],
			radio_group_value : 'Red',
			file_value : null,
			currency_value : 5.00,
			pillbox_value : [],
			datepicker_value : [
				'2018-01-01',
				'2018-01-31'
			],
			code_value : '',
			multi_text_value : [],
			multi_select_value : [],
			slider_value : [
				25,
				75
			],
			toggle_value : true,
			markdown_value : '',
			options : [
				'Red',
				'Purple',
				'Blue',
				'Green',
				'Yellow'
			],
			nav_items : [
				{target : '#one', label : 'One'},
				{target : '#two', label : 'Two'},
				{target : '#three', label : 'Three'}
			]
		};
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
		}
	}
};
</script>

<style lang="less">
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