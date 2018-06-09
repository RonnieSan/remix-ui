<template>
	<div id="wrapper">
		<div class="container">
			<r-form>
				<grid>
					<row>
						<column>

							<div class="control-group">
								<label class="control-label">Checkbox:</label>
								<div class="controls">
									<div class="field">
										<r-checkbox
											value="Yellow"
										/>
									</div>
								</div>
							</div>
							
							<div class="control-group">
								<label class="control-label">Checklist:</label>
								<div class="controls">
									<div class="field">
										<r-checklist
											v-model="colors"
											:options="checklist_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Code Editor:</label>
								<div class="controls">
									<div class="field">
										<r-code
											id="code-editor"
											:options="{
												fontFamily : 'Consolas'
											}"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Textarea:</label>
								<div class="controls">
									<div class="field">
										<r-textarea
											v-model="textarea"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Currency Field:</label>
								<div class="controls">
									<div class="field">
										<r-currency
											v-model="currency"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Datepicker:</label>
								<div class="controls">
									<div class="field">
										<r-datepicker
											v-model="date"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Select:</label>
								<div class="controls">
									<div class="field">
										<r-select
											v-model="select"
											:options="select_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Multi-Select:</label>
								<div class="controls">
									<div class="field">
										<r-multi-select
											v-model="multi_select"
											:options="multi_select_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Slider:</label>
								<div class="controls">
									<div class="field">
										<r-slider
											v-model="slider"
										/>
									</div>
								</div>
							</div>

						</column>
						<spacer size="50px"/>
						<column>
							
							<div class="control-group">
								<label class="control-label">Number:</label>
								<div class="controls">
									<div class="field">
										<r-number
											v-model="number"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Password:</label>
								<div class="controls">
									<div class="field">
										<r-password
											v-model="password"
											placeholder="Your password"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Text Input:</label>
								<div class="controls">
									<div class="field">
										<r-text
											v-model="text"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Email Input:</label>
								<div class="controls">
									<div class="field">
										<r-text
											v-model="email"
											type="email"
										><div class="helper" slot="left"><icon type="email" size="18"/></div></r-text>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Text Input with Mask:</label>
								<div class="controls">
									<div class="field">
										<r-text
											v-model="phone"
											mask="(###) ###-####"
										><div class="helper" slot="left"><icon type="phone" size="18"/></div></r-text>
									</div>
								</div>
							</div>

							<div class="icons">
								<icon type="home" size="48"/>
								<icon type="home" size="36"/>
								<icon type="home" size="24"/>
								<icon type="home" size="18"/>
							</div>

							<div class="control-group">
								<label class="control-label">Multi-Text Input:</label>
								<div class="controls">
									<div class="field">
										<r-multi-text
											v-model="multi_text"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Pillbox:</label>
								<div class="controls">
									<div class="field">
										<r-pillbox
											v-model="pillbox"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Radio Group:</label>
								<div class="controls">
									<div class="field">
										<r-radio-group
											v-model="radio"
											:options="radio_options"
										/>
									</div>
								</div>
							</div>

							<div class="control-group">
								<label class="control-label">Toggle:</label>
								<div class="controls">
									<div class="field">
										<r-toggle
											v-model="toggle"
										>The label</r-toggle>
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
export default {
	data() {
		return {
			currency : 5,
			colors : [],
			checklist_options : [
				'Red',
				'Green',
				'Blue'
			],
			date : ['2018-01-01', '2018-01-01'],
			select : [],
			select_options : [
				'Red',
				'Green',
				'Blue'
			],
			textarea : '',
			multi_select : [],
			multi_select_options : [
				'Red',
				'Green',
				'Blue'
			],
			slider : [25, 75],
			number : 1,
			password : '',
			text : '',
			email : '',
			phone : '',
			multi_text : [],
			pillbox : [],
			radio : 1,
			radio_options : [
				{label : '<strong>One</strong>', value : 1},
				{label : '<em>Two</em>', value : 2},
				{label : 'Three', value : 3}
			],
			toggle : false
		};
	}
};
</script>

<style lang="less">
// @import './theme.less';

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
	padding: 0 50px;
	width: 100%;
}

.control-group {
	margin-bottom: 1em;
}
</style>