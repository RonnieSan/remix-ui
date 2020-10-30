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
import rFile from './components/FileInput';
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

// Import layout elements
import Grid from './components/Grid';
import Row from './components/Row';
import Column from './components/Column';
import Gutter from './components/Gutter';

// Import UI elements
import Autocomplete from './components/Autocomplete';
import Icon from './components/Icon';
import Modal from './components/Modal';
import Tab from './components/Tab';
import Tabs from './components/Tabs';

// Import libraries
import Msg from './lib/Msg';
import Toast from './lib/Toast';
import Validator, { rules as ValidationRules } from './lib/Validator';

// Export components
const modules = {
	rButton,
	rCheckbox,
	rChecklist,
	rCode,
	rCurrency,
	rDatepicker,
	rFile,
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
	Autocomplete,
	Modal,
	Tab,
	Tabs,
	ValidationRules
};

export {
	rButton,
	rCheckbox,
	rChecklist,
	rCode,
	rCurrency,
	rDatepicker,
	rFile,
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
	Autocomplete,
	Modal,
	Tab,
	Tabs,
	Msg,
	Toast,
	Validator,
	ValidationRules
};

// Export the package
export default {
	// Vue plugin installation
	install(Vue, components) {

		// Loop through components and replace
		let selected = [];
		if (components) {
			components.forEach((component) => {
				switch (component) {
					case 'layout':
					case 'Layout':
						selected.push(
							'Grid',
							'Row',
							'Column',
							'Gutter'
						);
						break;
					case 'form':
					case 'Form':
						selected.push(
							'rButton',
							'rCheckbox',
							'rChecklist',
							'rFile',
							'rForm',
							'rNumber',
							'rPassword',
							'rRadio',
							'rRadioGroup',
							'rSelect',
							'rText',
							'rTextarea'
						);
						break;
					case 'extended':
					case 'Extended':
					case 'extendedform':
					case 'ExtendedForm':
						selected.push(
							'rCurrency',
							'rFormBuilder',
							'rGroupSelect',
							'rMultiSelect',
							'rMultiText',
							'rPillbox',
							'rSlider',
							'rSwitch',
							'rToggle'
						);
						break;
					case 'content':
					case 'Content':
						selected.push(
							'rCode',
							'rMarkdown',
							'rTemplateEditor'
						);
						break;
					case 'datetime':
					case 'DateTime':
						selected.push(
							'rDatepicker',
							'rTimepicker'
						);
						break;
					case 'ui':
					case 'UI':
						selected.push(
							'Autocomplete',
							'Icon',
							'Modal',
							'Tab',
							'Tabs'
						);
						break;
					case 'validation':
					case 'Validation':
						selected.push(
							'rValidation',
							'rValidator'
						);
						break;
					default:
						selected.push(component);
						break;
				}
			});

			// Make the selected array unique
			selected = selected.filter((component, index, arr) => {
				return array.indexOf(component) === index;
			});
		}
		
		// Install all the components
		else {
			selected = Object.keys(modules);
		}

		// Install specific components
		if (selected.length) {
			selected.forEach((component) => {
				if (modules[component]) {
					Vue.component(component, modules[component]);
				}
				else if (modules['r' + component]) {
					Vue.component('r' + component, modules['r' + component]);
				}
			});
		}
	}
};