<template>
	<div id="wrapper">
		<modal ref="first_modal" max-width="600px">
			<template v-slot="modal">
				<div class="padded">
					<h2>My Modal</h2>
					<p>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
					<a href="javascript:void(0)" @click="triggerAlert()">Open Nested Modal</a> | <a href="javascript:void(0)" @click="modal.close()">Close Modal</a>
				</div>
			</template>
		</modal>
		<div class="container">
			<r-form action="test">
				<grid>
					<row>
						<column>
							<h1>Remix UI Components</h1>
							<hr>
							<h2>Layout Components</h2>

							<div class="layout">
								<grid gutter="20px">
									<row>
										<column>.column</column>
										<column>.column</column>
										<column>.column</column>
										<column>.column</column>
									</row>
									<row>
										<column span="2">.column.span-2</column>
										<column>.column</column>
										<column>.column</column>
									</row>
									<row>
										<column span="3">.column.span-3</column>
										<column>.column</column>
									</row>
									<row>
										<column span="4">.column.span-4</column>
									</row>
								</grid>
							</div>

							<hr>
							<h2>Form Components</h2>
							
							<fieldset>
								<legend>Core Components</legend>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Text Input:</label>
										<div class="controls">
											<div class="field">
												<r-text
													name="text"
													v-model="text_value"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Textarea:</label>
										<div class="controls">
											<div class="field">
												<r-textarea
													name="textarea"
													v-model="textarea_value"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Password:</label>
										<div class="controls">
											<div class="field">
												<r-password
													name="password"
													v-model="password_value"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Number:</label>
										<div class="controls">
											<div class="field">
												<r-number
													name="number"
													v-model.number="number_value"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Currency:</label>
										<div class="controls">
											<div class="field">
												<r-currency
													name="currency"
													v-model.number="currency_value"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
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
								</div>

								<div class="control-group">
									<div class="inner">
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
								</div>

								<div class="control-group">
									<div class="inner">
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
								</div>

								<div class="control-group">
									<div class="inner">
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
								</div>

								<div class="control-group">
									<div class="inner">
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
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Toggle:</label>
										<div class="controls">
											<div class="field">
												<r-toggle
													name="toggle"
													v-model="toggle_value"
												>This is a toggle</r-toggle>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<label class="control-label">Switch:</label>
										<div class="controls">
											<div class="field">
												<r-switch
													name="switch"
													v-model="switch_value"
													:options="switch_options"
												/>
											</div>
										</div>
									</div>
								</div>

								<div class="control-group">
									<div class="inner">
										<div class="controls">
											<div class="field fit">
												<r-button>A Button</r-button>
											</div>
											<div class="field fit">
												<r-button icon="check">A Button with Icon</r-button>
											</div>
										</div>
									</div>
								</div>

								<!-- FORM BUILDER -->
								<r-form-builder :config.sync="formBuilderConfig"/>

							</fieldset>

							<fieldset>
								<legend>Validation</legend>

								<r-validator :validator="validator">
									
									<!-- REQUIRED -->
									<div class="control-group">
										<div class="inner">
											<label class="control-label required">Required Field:</label>
											<div class="controls">
												<div class="field">
													<r-validation
														v-model="required_text_value"
														:rules="[rules.required()]"
														watch
													>
														<r-text
															v-model="required_text_value"
														/>
													</r-validation>
												</div>
											</div>
										</div>
									</div>

									<!-- RANGE VALUE -->
									<div class="control-group">
										<div class="inner">
											<label class="control-label">Between 5 and 20:</label>
											<div class="controls">
												<div class="field">
													<r-validation
														v-model.number="min_max_number_value"
														:rules="[rules.min(5), rules.max(20)]"
														watch
													>
														<r-number
															v-model.number="min_max_number_value"
														/>
													</r-validation>
												</div>
											</div>
										</div>
									</div>

									<!-- RANGE VALUE -->
									<div class="control-group">
										<div class="inner">
											<label class="control-label">Select 3:</label>
											<div class="controls">
												<div class="field">
													<r-validation
														v-model="min_selected_value"
														:rules="[rules.minLength(3, 'You must select at least 3')]"
														watch
													>
														<r-checklist
															class="stacked"
															v-model="min_selected_value"
															:options="options"
														/>
													</r-validation>
												</div>
											</div>
										</div>
									</div>

									<!-- CUSTOM VALIDATION -->
									<div class="control-group">
										<div class="inner">
											<label class="control-label">Name a Ninja Turtle:</label>
											<div class="controls">
												<div class="field">
													<r-validation
														v-model="custom_validation_value"
														:rules="[rule_ninjaTurtle]"
														watch
													>
														<r-text
															v-model="custom_validation_value"
														/>
													</r-validation>
												</div>
											</div>
										</div>
									</div>

									<!-- VALIDATE TRIGGER -->
									<div class="control-group">
										<div class="inner">
											<div class="controls">
												<div class="field">
													<r-button icon="check" @click="validator.validate()">Validate Fields</r-button>
												</div>
											</div>
										</div>
									</div>

								</r-validator>

							</fieldset>

							<fieldset>
								<legend>UI Components</legend>

								<!-- AUTOCOMPLETE -->
								<div class="control-group">
									<div class="inner">
										<label class="control-label">Autocomplete: (Planets)</label>
										<div class="controls">
											<div class="field">
												<autocomplete
													v-model="autocomplete_value"
													:options="autocomplete_options"
												>
													<r-text
														v-model="autocomplete_value"
													/>
												</autocomplete>
											</div>
										</div>
									</div>
								</div>

								<!-- MODALS -->
								<div class="control-group">
									<div class="inner">
										<label class="control-label">Modals and Message Windows:</label>
										<div class="controls">
											<div class="field fit">
												<r-button icon="open-in-new" @click="$refs.first_modal.open()">Open Modal Window</r-button>
											</div>
											<div class="field fit">
												<r-button icon="alert" @click="triggerAlert">Trigger Alert</r-button>
											</div>
											<div class="field fit">
												<r-button icon="comment-question" @click="triggerConfirm">Trigger Confirm</r-button>
											</div>
										</div>
									</div>
								</div>

								<!-- TABS -->
								<tabs class="styled" v-model="tab_id">
									<tab label="First" tab-id="first">
										<h2>First Tab</h2>
										<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.</p>
									</tab>
									<tab label="Second" tab-id="second">
										<h2>Second Tab</h2>
										<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod.</p>
									</tab>
									<tab label="Third" tab-id="third">
										<h3>Third Tab</h3>
										<p>Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.</p>
									</tab>
									<tab label="Disabled" tab-id="disabled" disabled>
										<h3>Disabled Tab</h3>
										<p>This tab will never show</p>
									</tab>
								</tabs>

							</fieldset>

						</column>
					</row>
				</grid>
			</r-form>
		</div>
	</div>
</template>

<script>
import Validator, { rules } from '@/lib/Validator';

export default {
	data() {
		return {
			show : false,

			rules,
			validator : new Validator(),

			// COMPONENTS VALUES
			text_value : '',
			textarea_value : '',
			password_value : '',
			number_value : 0,
			currency_value : 0,
			select_value : null,
			checklist_value : [],
			radio_group_value : null,
			file_value : null,
			slider_value : 50,
			toggle_value : false,
			switch_value : 'off',
			form_builder_value : {
				name : 'Harry Potter',
				contact : {
					phone : '6195551212'
				},
				gender : 'male'
			},

			// VALIDATION COMPONENTS
			required_text_value : '',
			min_max_number_value : 0,
			min_selected_value : [],
			custom_validation_value : '',
			
			// OPTIONS
			options : [
				{label : 'Small', value : 'S'},
				{label : 'Medium', value : 'M'},
				{label : 'Large', value : 'L'},
				{label : 'Extra Large', value : 'XL'}
			],
			switch_options : [
				{label : 'Off', value : 'off'},
				{label : 'On', value : 'on'}
			],

			// UI COMPONENTS
			autocomplete_value : '',
			autocomplete_options : [
				'Mercury',
				'Venus',
				'Earth',
				'Mars',
				'Jupiter',
				'Saturn',
				'Uranus',
				'Neptune',
				'Pluto'
			],
			tab_id : 'first'
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
										label : 'Name:',
										component : 'r-text',
										model : 'name',
										value : this.form_builder_value.name,
										validation : {
											rules : [rules.required()]
										}
									},
									{
										before : '<label class="control-label">Phone:</label>',
										component : 'r-text',
										model : 'contact.phone',
										value : this.form_builder_value.contact.phone,
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
										value : this.form_builder_value.gender,
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
				this.form_builder_value = new_value;
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

		toggleDisabledTab() {
			this.tab_disabled = !this.tab_disabled;
			this.$nextTick(() => {
				if (this.tab_disabled) {
					this.$toast.error('The fourth tab has been disabled.');
				}
				else {
					this.$toast.success('The fourth tab is now enabled.');
				}
			});
		},

		buttonLoader() {
			this.is_loading = true;

			setTimeout(() => {
				this.is_loading = false;
			}, 3000);
		},

		rule_ninjaTurtle(value) {
			let lower_value = value.toLowerCase();
			if (['leonardo', 'donatello', 'michaelangello', 'raphael'].indexOf(lower_value) === -1) {
				return 'You must enter the name of a Ninja Turtle';
			}
			return null;
		}
	},
	filters : {
		toJSON(value) {
			try {
				return JSON.stringify(value);
			}
			catch (err) {
				return value;
			}
		}
	}
};
</script>

<style lang="less">
@import '~@styles/All.less';
@import './theme.less';

@full-width: 720px;
@desktop-width: 720px;
@laptop-width: 720px;
@font-mono: 'Roboto Mono', Menlo, 'Droid Sans Mono', Courier, System;

* {
	box-sizing: border-box;
}

html {
	overflow: hidden;
	overflow-y: auto;
}

#wrapper {
	padding: 50px 0;
}

.layout {
	margin-bottom: 2em;

	.inner-column {
		background-color: #E2E2E2;
		padding: 10px;
	}
}

.control-border {
	background-color: @control-bkg-color;
	border: @control-border-stroke solid @control-border-color;
	border-radius: @control-radius;
}

.focusable:focus,
.focusable:focus-within {
	box-shadow: 0 0 0 3px fade(#000, 10%);
}

.example {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	> div {
		background-color: @gray-25;
		flex: 1 0;
		height: 200px;
		min-width: 150px;
		padding: 10px 15px;
	}
}

fieldset {
	border-radius: 5px;
	margin-bottom: 2em;
	padding: 20px 30px 30px;

	legend {
		font-weight: bold;
		padding: 0 0.25em;
	}
}

.control-group {
	margin-bottom: 2em;
}

.my-set {
	margin-bottom: 0;
	padding-bottom: 20px;

	.control-group {
		margin-bottom: 1em;
	}
}

.model-value {
	background-color: #F5F5F5;
	border-radius: 3px;
	margin-top: 5px;
	padding: 8px 10px;

	pre {
		font-family: @font-mono;
		overflow-x: auto;
		white-space: break-spaces;
		width: 100%;
	}
}

.tab-content {
	border: 1px solid #CCC;
	border-top: 0;
	padding: 1em;
}
</style>
