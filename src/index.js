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
import MultiSelect from './components/MultiSelect';
import MultiText from './components/MultiText';
import NumberInput from './components/Number';
import Password from './components/Password';
import Pillbox from './components/Pillbox';
import Select from './components/Select';
import Text from './components/Text';

// Import Icons
import Icon from './components/Icon';

// Import layout elements
import Spacer from './components/Spacer';
import Column from './components/Column';
import Row from './components/Row';
import Grid from './components/Grid';

// Import utilities
import Autocomplete from './components/Autocomplete';

// Export components
export {
	Autocomplete,
	Checkbox,
	Checklist,
	Code,
	Column,
	Currency,
	Datepicker,
	Form,
	Grid,
	Icon,
	MultiSelect,
	MultiText,
	Number,
	Password,
	Pillbox,
	Row,
	Select,
	Spacer,
	Text
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
		Vue.component('rMultiSelect', MultiSelect);
		Vue.component('rMultiText', MultiText);
		Vue.component('rNumber', NumberInput);
		Vue.component('rPassword', Password);
		Vue.component('rPillbox', Pillbox);
		Vue.component('rSelect', Select);
		Vue.component('rText', Text);

		Vue.component('icon', Icon);
		
		Vue.component('spacer', Spacer);
		Vue.component('column', Column);
		Vue.component('row', Row);
		Vue.component('grid', Grid);
		
		Vue.component('rAutocomplete', Autocomplete);
	}
};