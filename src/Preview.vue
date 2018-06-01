<template>
	<div id="wrapper">
		<div class="container">
			<grid>
				<row>
					<column>
						<r-checkbox
							value="Yellow"
						/>
						<r-checklist
							v-model="colors"
							:options="checklist_options"
						/>
						<r-code
							id="code-editor"
							:options="{
								fontFamily : 'Consolas'
							}"
						/>
						<r-currency
							v-model="currency"
						/>
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
</style>