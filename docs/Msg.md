# Msg
The `Msg` library uses the modal component to quickly create styled alert and confirmation windows.

## Installation
```js
// Import the library from Remix UI
import { Msg as MsgLib } from 'remix-ui';

// Create a new instance...
const Msg = new MsgLib();

// Add it as a prototype if you wish...
Vue.prototype.$msg = Msg;
```

## Usage
```vue
<script>
export default {
	methods : {
		callAlert() {
			this.$msg.alert('This is an alert message!');
		}
	}
}
</script>
```

---

## Alert Messages
Alert messages contain a title bar, a message, and an 'OK' button. Clicking the 'OK' button closes it.

### Parameters
* **title** : STRING - A string that displays in the title bar
* **message** : STRING - A string that displays as the main content for the alert message (HTML will be parsed correctly)
* **accept** : STRING - The label for the 'OK' button
* **max_width** : STRING - The maximum width expressed as a CSS value for the alert window (defaults to `400px`)

```js
// If a string is passed, it is used as the message...
Msg.alert('This is an alert message');

// Pass an object of parameters
Msg.alert({
	title : 'My Alert Message',
	message : 'This is an <strong>alert</strong> message!',
	accept : 'Close'
})
```

---

## Confirm Messages
Confirm messages give you the option to accept or decline. The confirm method returns a promise that resolves `true` or `false` on accept or decline.

### Parameters
* **title** : STRING - A string that displays in the title bar
* **message** : STRING - A string that displays as the main content for the alert message (HTML will be parsed correctly)
* **accept** : STRING - The label for the accept button
* **decline** : STRING - The label for the decline button
* **max_width** : STRING - The maximum width expressed as a CSS value for the alert window (defaults to `400px`)

```js
// If a string is passed, it is used as the message...
Msg.confirm('Are you sure?')
	.then((confirmed) => {
		if (confirmed) {
			console.log('This was confirmed');
		}
		else {
			console.log('This was declined');
		}
	});

// Pass an object of parameters
Msg.confirm({
	title : 'Confirmation Message',
	message : 'Are you <em>sure</em> you want to do this?',
	accept : 'I\'m sure.'
	decline : 'I changed my mind.'
})
	.then((confirmed) => {
		if (confirmed) {
			console.log('This was confirmed');
		}
		else {
			console.log('This was declined');
		}
	});
```

## Styles
The styles for the modal component should be imported when using the Msg library.