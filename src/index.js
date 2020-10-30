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
import rFile from './components/FileInput';
import rNumber from './components/Number';
import rPassword from './components/Password';
import rRadio from './components/Radio';
import rRadioGroup from './components/RadioGroup';
import rSelect from './components/Select';
import rCurrency from './components/Currency';
import rSlider from './components/Slider';
import rSwitch from './components/Switch';
import rText from './components/Text';
import rTextarea from './components/Textarea';
import rToggle from './components/Toggle';
import rValidation from './components/Validation';
import rValidator from './components/Validator';

// Import layout elements
import Grid from './components/Grid';
import Row from './components/Row';
import Column from './components/Column';
import Gutter from './components/Gutter';

// // Import UI elements
import Autocomplete from './components/Autocomplete';
import Icon from './components/Icon';
import Modal from './components/Modal';
import Tab from './components/Tab';
import Tabs from './components/Tabs';

// // Import libraries
import Msg from './lib/Msg';
import Validator, { rules as ValidationRules } from './lib/Validator';

// Export components
const modules = {
	rButton,
	rCheckbox,
	rChecklist,
	rFile,
	rForm,
	rFormBuilder,
	rNumber,
	rPassword,
	rRadio,
	rRadioGroup,
	rSelect,
	rCurrency,
	rSlider,
	rSwitch,
	rText,
	rTextarea,
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
	rFile,
	rForm,
	rFormBuilder,
	rNumber,
	rPassword,
	rRadio,
	rRadioGroup,
	rSelect,
	rCurrency,
	rSlider,
	rSwitch,
	rText,
	rTextarea,
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
	Validator,
	ValidationRules
};

// Export the package
export default {
	// Vue plugin installation
	install(Vue, components) {
		let selected = Object.keys(modules);

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