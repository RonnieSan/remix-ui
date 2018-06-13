// ----------------------------------------------------------------------
// REMIX UI
// Author: RonnieSan
// ----------------------------------------------------------------------


// Import form elements
import Form from './components/Form';
import Checkbox from './components/Checkbox';
import Checklist from './components/Checklist';
import Code from './components/Code';
import Currency from './components/Currency';
import Datepicker from './components/Datepicker';
import FileInput from './components/FileInput';
import Markdown from './components/Markdown';
import MultiSelect from './components/MultiSelect';
import MultiText from './components/MultiText';
import NumberInput from './components/Number';
import Password from './components/Password';
import Pillbox from './components/Pillbox';
import Radio from './components/Radio';
import RadioGroup from './components/RadioGroup';
import Select from './components/Select';
import Slider from './components/Slider';
import Text from './components/Text';
import Textarea from './components/Textarea';
import Toggle from './components/Toggle';

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
import Validation from './components/Validation';

// Import libraries
import Validator from './lib/Validator';

// Export components
export {
	Autocomplete,
	Checkbox,
	Checklist,
	Code,
	Column,
	Currency,
	Datepicker,
	FileInput,
	Form,
	Grid,
	Icon,
	Markdown,
	Modal,
	MultiSelect,
	MultiText,
	Number,
	Password,
	Pillbox,
	Radio,
	RadioGroup,
	Row,
	Select,
	Slider,
	Spacer,
	Text,
	Textarea,
	Toggle,
	Validation,
	Validator
};

// Export the package
export default {
	// Vue plugin installation
	install(Vue, options) {
		options = options || {};

		Vue.component('rForm', Form);
		Vue.component('rCheckbox', Checkbox);
		Vue.component('rChecklist', Checklist);
		Vue.component('rCode', Code);
		Vue.component('rCurrency', Currency);
		Vue.component('rDatepicker', Datepicker);
		Vue.component('rFile', FileInput);
		Vue.component('rMarkdown', Markdown);
		Vue.component('rMultiSelect', MultiSelect);
		Vue.component('rMultiText', MultiText);
		Vue.component('rNumber', NumberInput);
		Vue.component('rPassword', Password);
		Vue.component('rPillbox', Pillbox);
		Vue.component('rRadio', Radio);
		Vue.component('rRadioGroup', RadioGroup);
		Vue.component('rSelect', Select);
		Vue.component('rSlider', Slider);
		Vue.component('rText', Text);
		Vue.component('rTextarea', Textarea);
		Vue.component('rToggle', Toggle);

		Vue.component('icon', Icon);
		
		Vue.component('spacer', Spacer);
		Vue.component('column', Column);
		Vue.component('row', Row);
		Vue.component('grid', Grid);
		
		Vue.component('rAutocomplete', Autocomplete);
		Vue.component('modal', Modal);
		Vue.component('rValidation', Validation);
	}
};