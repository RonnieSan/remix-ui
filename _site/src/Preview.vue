<template>
	<div id="wrapper">
		<modal ref="modal" max-width="600px">
			<div class="padded">
				<h2>My Modal</h2>
				<p>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
			</div>
		</modal>
		<div class="container">
			<r-form>
				<grid>
					<row>
						<column>
							<h1>Remix UI Components</h1>
							<hr>
						</column>
					</row>

					<row>
						<column>
							
							<h2>Standard HTML Components</h2>

							<div class="control-group">
								<label class="control-label">Text Input:</label>
								<div class="controls">
									<div class="field">
										<r-validation
											ref="text_validation"
											v-model="text_value"
											:validator="validator"
											:rules="[validator.rules.required]"
										>
											<r-text
												name="text"
												v-model="text_value"
												@validate="$refs.text_validation.validate()"
											>
											<div class="helper" slot="right">
												<icon type="comment" size="24"/>
											</div>
											</r-text>
										</r-validation>
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
								<label class="control-label">Password:</label>
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
								<div class="controls">
									<div class="field">
										<button type="button" @click="$refs.modal.open()">
											<span class="label">Open Modal</span>
										</button>
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
								<div class="controls">
									<div class="field">
										<button type="button" @click="$toast.success('Something successful happened.')">
											<span class="label">Fire Toast</span>
										</button>
									</div>
									<div class="field">
										<button type="button" @click="triggerAlert()">
											<span class="label">Trigger Alert</span>
										</button>
									</div>
									<div class="field">
										<button type="button" @click="triggerConfirm()">
											<span class="label">Trigger Confirm</span>
										</button>
									</div>
								</div>
							</div>

						</column>
						<spacer size="100px"/>
						<column>
							
							<h2>Extended Form Elements</h2>

							<div class="control-group">
								<label class="control-label">Currency:</label>
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
			});
		}
	}
};
</script>

<style lang="less">
// @import './theme.less';
@import './styles/toast.less';
@import './styles/msg.less';

*, *::before, *::after {
	box-sizing: border-box;
}

html, body {
	font-family: 'Roboto';
	margin: 0;
	padding: 0;
}

#wrapper {
	height
	width: 100vw;
}

.container {
	margin: 30px auto;
	max-width: 1240px;
	padding: 0 20px;
	width: 100%;
}

.control-group {
	margin-bottom: 1em;
}

.padded {
	padding: 1em 2em;
}

.modal-window {
	border-radius: 5px;
}
</style>