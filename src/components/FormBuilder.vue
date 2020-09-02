<template>
	<div>
		<component v-for="(group, group_index) in config" :is="group.type" :class="[(group.class || '')]" :key="group_index">
			<h2 v-if="group.type === 'div'">{{group.heading}}</h2>
			<legend v-if="group.type === 'fieldset'">{{group.heading}}</legend>
			<div v-for="(control, control_index) in group.controls" :class="['control-group', (control.class || '')]" :key="control_index">
				<div class="inner">
					<label v-if="control.label" class="control-label">{{control.label}}</label>
					<div class="controls">
						<r-validation
							v-if="control.validation"
							v-model="control.validation.model"
							v-bind="control.validation"
						>
							<div v-for="(field, field_index) in control.fields" :class="['field', (field.class || '')]" :key="field_index">
								<div v-if="field.before" v-html="field.before"/>
								<label v-if="field.label" class="control-label">{{field.label}}</label>
								<r-validation
									v-if="field.validation"
									v-model="values[field.model]"
									v-bind="field.validation"
								>
									<component
										:is="field.component"
										v-model="values[field.model]"
										v-bind="field.props"
									>{{field.label}}</component>
								</r-validation>
								<component
									v-else
									:is="field.component"
									v-model="values[field.model]"
									v-bind="field.props"
								>{{field.label}}</component>
								<div v-if="field.after" v-html="field.after"/>
							</div>
						</r-validation>
						<template v-else>
							<div v-for="(field, field_index) in control.fields" :class="['field', (field.class || '')]" :key="field_index">
								<div v-if="field.before" v-html="field.before"/>
								<label v-if="field.label" class="control-label">{{field.label}}</label>
								<r-validation
									v-if="field.validation"
									v-model="values[field.model]"
									v-bind="field.validation"
								>
									<component
										:is="field.component"
										v-model="values[field.model]"
										v-bind="field.props"
									>{{field.label}}</component>
								</r-validation>
								<component
									v-else
									:is="field.component"
									v-model="values[field.model]"
									v-bind="field.props"
								>{{field.label}}</component>
								<div v-if="field.after" v-html="field.after"/>
							</div>
						</template>
					</div>
				</div>
			</div>
		</component>
	</div>
</template>

<script>
import { forIn, set } from 'lodash';

export default {
	props : {
		config : {
			type : Array,
			required : true
		}
	},
	data() {
		return {
			values : {}
		};
	},
	watch : {
		values : {
			handler(new_value, old_value) {
				let export_value = {};
				forIn(new_value, (value, key) => {
					set(export_value, key, value);
				})
				this.$emit('update:config', export_value);
			},
			deep : true
		}
	},
	mounted() {
		let values = {}
		this.config.forEach((group) => {
			group.controls.forEach((control) => {
				control.fields.forEach((field) => {
					values[field.model] = field.value;
				});
			});
		});
		this.values = values;
	}
};
</script>