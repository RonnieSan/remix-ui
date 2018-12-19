// ----------------------------------------------------------------------
// REMIX UI
// Author: RonnieSan
// ----------------------------------------------------------------------

// Import form elements
import rForm from './components/Form';
import rButton from './components/Button';
import rCheckbox from './components/Checkbox';
import rChecklist from './components/Checklist';
import rCode from './components/Code';
import rCurrency from './components/Currency';
import rDatepicker from './components/Datepicker';
import rFileInput from './components/FileInput';
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
import rTemplateEditor from './components/TemplateEditor';
import rText from './components/Text';
import rTextarea from './components/Textarea';
import rToggle from './components/Toggle';
import rValidation from './components/Validation';

// Import Icons
import Icon from './components/Icon';

// Import layout elements
import Spacer from './components/Spacer';
import Column from './components/Column';
import Row from './components/Row';
import Grid from './components/Grid';

// Import utilities
import Autocomplete from './components/Autocomplete';
import Modal from './components/Modal';
import Tab from './components/Tab';
import Tabs from './components/Tabs';

// Import libraries
import Msg from './lib/Msg';
import Toast from './lib/Toast';
import Validator from './lib/Validator';

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
	rTemplateEditor,
	rText,
	rTextarea,
	rToggle,
	rValidation,
	Grid,
	Row,
	Column,
	Spacer,
	Icon,
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
	rText,
	rTextarea,
	rToggle,
	rValidation,
	Grid,
	Row,
	Column,
	Spacer,
	Icon,
	Autocomplete,
	Modal,
	Tab,
	Tabs,
	Msg,
	Toast,
	Validator
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
					&& component !== 'Validator')
				{
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
			Vue.component('rButton', rButton);
			Vue.component('rCheckbox', rCheckbox);
			Vue.component('rChecklist', rChecklist);
			Vue.component('rCode', rCode);
			Vue.component('rCurrency', rCurrency);
			Vue.component('rDatepicker', rDatepicker);
			Vue.component('rFile', rFileInput);
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
			Vue.component('rTemplateEditor', rTemplateEditor);
			Vue.component('rText', rText);
			Vue.component('rTextarea', rTextarea);
			Vue.component('rToggle', rToggle);
			Vue.component('rValidation', rValidation);

			Vue.component('icon', Icon);
			
			Vue.component('spacer', Spacer);
			Vue.component('column', Column);
			Vue.component('row', Row);
			Vue.component('grid', Grid);
			
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