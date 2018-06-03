<template>
	<div id="wrapper">
		<div class="container">
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
					</column>
					<column>
						Hello
					</column>
				</row>
			</grid>
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
			multi_select : [],
			multi_select_options : [
				'Red',
				'Green',
				'Blue'
			]
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
	margin: 0;
	padding: 0;
}

#wrapper {
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