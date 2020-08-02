// ----------------------------------------------------------------------
// REMIX UI
// Author: RonnieSan
// ----------------------------------------------------------------------

// Import form elements
import rForm from './components/Form';
import rFormBuilder from './components/FormBuilder';
import rButton from './components/Button';
import rCheckbox from './components/Checkbox';
import rChecklist from './components/Checklist';
import rCode from './components/Code';
import rCurrency from './components/Currency';
import rDatepicker from './components/Datepicker';
import rFileInput from './components/FileInput';
import rGroupSelect from './components/GroupSelect';
import rMarkdown from './components/Markdown';
import rMultiSelect from './components/MultiSelect';
import rMultiText from './components/MultiText';
import rNumber from './components/Number';
import rPassword from './components/Password';
import rPillbox from './components/Pillbox';
import rRadio from './components/Radio';
import rRadioGroup from './components/RadioGroup';
import rSelect from './components/Select';
import rSlider from './components/Slider';
import rSwitch from './components/Switch';
import rTemplateEditor from './components/TemplateEditor';
import rText from './components/Text';
import rTextarea from './components/Textarea';
import rTimepicker from './components/Timepicker';
import rToggle from './components/Toggle';
import rValidation from './components/Validation';
import rValidator from './components/Validator';

// Import Icons
import Icon from './components/Icon';

// Import layout elements
import Grid from './components/Grid';
import Row from './components/Row';
import Column from './components/Column';
import Gutter from './components/Gutter';
import Spacer from './components/Spacer';

// Import utilities
import Autocomplete from './components/Autocomplete';
import Modal from './components/Modal';
import Tab from './components/Tab';
import Tabs from './components/Tabs';

// Import libraries
import Msg from './lib/Msg';
import Toast from './lib/Toast';
import Validator, { rules } from './lib/Validator';

// Export components
const modules = {
	rButton,
	rCheckbox,
	rChecklist,
	rCode,
	rCurrency,
	rDatepicker,
	rFileInput,
	rForm,
	rFormBuilder,
	rGroupSelect,
	rMarkdown,
	rMultiSelect,
	rMultiText,
	rNumber,
	rPassword,
	rPillbox,
	rRadio,
	rRadioGroup,
	rSelect,
	rSlider,
	rSwitch,
	rTemplateEditor,
	rText,
	rTextarea,
	rTimepicker,
	rToggle,
	rValidation,
	rValidator,
	Icon,
	Grid,
	Row,
	Column,
	Gutter,
	Spacer,
	Autocomplete,
	Modal,
	Tab,
	Tabs,
	Msg,
	Toast,
	Validator
};

export {
	rButton,
	rCheckbox,
	rChecklist,
	rCode,
	rCurrency,
	rDatepicker,
	rFileInput,
	rForm,
	rGroupSelect,
	rMarkdown,
	rMultiSelect,
	rMultiText,
	rNumber,
	rPassword,
	rPillbox,
	rRadio,
	rRadioGroup,
	rSelect,
	rSlider,
	rSwitch,
	rText,
	rTextarea,
	rTimepicker,
	rToggle,
	rValidation,
	rValidator,
	Icon,
	Grid,
	Row,
	Column,
	Gutter,
	Spacer,
	Autocomplete,
	Modal,
	Tab,
	Tabs,
	Msg,
	Toast,
	Validator,
	rules
};

// Export the package
export default {
	// Vue plugin installation
	install(Vue, components) {

		// Install specific components
		if (components) {
			components.forEach((component) => {
				if (component !== 'Msg'
					&& component !== 'Toast'
					&& component !== 'Validator') {
					if (modules[component]) {
						Vue.component(component, modules[component]);
					}
					else if (modules['r' + component]) {
						Vue.component('r' + component, modules['r' + component]);
					}
				}
				else {
					switch(component) {
						case 'Msg':
							Vue.prototype.$msg   = Msg.init();
							break;
						case 'Toast':
							Vue.prototype.$toast = Toast.init();
							break;
						case 'Validator':
							Vue.prototype.$validator = Validator;
							break;
					}
				}
			});
		}
		else {
			Vue.component('rForm', rForm);
			Vue.component('rFormBuilder', rFormBuilder);
			Vue.component('rButton', rButton);
			Vue.component('rCheckbox', rCheckbox);
			Vue.component('rChecklist', rChecklist);
			Vue.component('rCode', rCode);
			Vue.component('rCurrency', rCurrency);
			Vue.component('rDatepicker', rDatepicker);
			Vue.component('rFile', rFileInput);
			Vue.component('rGroupSelect', rGroupSelect);
			Vue.component('rMarkdown', rMarkdown);
			Vue.component('rMultiSelect', rMultiSelect);
			Vue.component('rMultiText', rMultiText);
			Vue.component('rNumber', rNumber);
			Vue.component('rPassword', rPassword);
			Vue.component('rPillbox', rPillbox);
			Vue.component('rRadio', rRadio);
			Vue.component('rRadioGroup', rRadioGroup);
			Vue.component('rSelect', rSelect);
			Vue.component('rSlider', rSlider);
			Vue.component('rSwitch', rSwitch);
			Vue.component('rTemplateEditor', rTemplateEditor);
			Vue.component('rText', rText);
			Vue.component('rTextarea', rTextarea);
			Vue.component('rTimepicker', rTimepicker);
			Vue.component('rToggle', rToggle);
			Vue.component('rValidation', rValidation);
			Vue.component('rValidator', rValidator);

			Vue.component('icon', Icon);
			
			Vue.component('grid', Grid);
			Vue.component('row', Row);
			Vue.component('column', Column);
			Vue.component('gutter', Gutter);
			Vue.component('spacer', Spacer);
			
			Vue.component('autocomplete', Autocomplete);
			Vue.component('modal', Modal);
			Vue.component('tab', Tab);
			Vue.component('tabs', Tabs);

			Vue.prototype.$msg       = Msg.init();
			Vue.prototype.$toast     = Toast.init();
			Vue.prototype.$Validator = Validator;
		}
	}
};