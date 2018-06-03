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
import NumberInput from './components/Number';
import Password from './components/Password';

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
	MultiSelect,
	Number,
	Password,
	Row,
	Spacer
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
		Vue.component('rNumber', NumberInput);
		Vue.component('rPassword', Password);
		
		Vue.component('spacer', Spacer);
		Vue.component('column', Column);
		Vue.component('row', Row);
		Vue.component('grid', Grid);
		
		Vue.component('rAutocomplete', Autocomplete);
	}
};