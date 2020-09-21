# Toast
The `Toast` library creates temporary popup messages on the fly.

## Installation
```js
// Import the library from Remix UI
import { Toast } from 'remix-ui';

// Add it as a prototype if you wish...
Vue.prototype.$toast = Toast;
```

## Usage
```vue
<script>
export default {
	methods : {
		confirmPayment() {
			this.$msg.confirm('Are you sue you want to pay for this?')
				.then((confirmed) => {
					if (confirmed) {
						// COMPLETE THE TRANSACTION HERE
						this.$toast.success('The transaction was completed');
					}
					else {
						this.$toast.error('The transaction was canceled');
					}
				});
		}
	}
}
</script>
```

---

## Toast Types
There are four basic types of toast messages that are dependent on the default styles included with Remix UI...
* **success** - A success toast is green and has a check mark icon
* **error** - An error toast is red and has an alert-octogon icon
* **warning** - A warning toast is yellow and has an alert icon
* **info** - An info toast is blue and has an information icon

To trigger a specific type of toast, simple use the toast type as the method name and pass a message to it. HTML will be parsed correctly.

### Basic Examples
```js
// Trigger a success toast...
Toast.success('This was successful!');

// Trigger an info toast
Toast.info('Did you know the sky is blue?');
```

## Parameters
You can also create a completely custom toast message by passing in parameters to the `add(params)` method...
* **icon** : STRING - The name of the MDI icon to display
* **message** : STRING - The main content of the message
* **timeout** : NUMBER - The time in ms to wait before removing the toast message
* **title** : STRING - A title to display at the top of the toast
* **type** : STRING - The type value will be applied as a class on the toast message and can be used for custom styling


### Passing Parameters
```js
Toast.add({
	type : 'reload',
	icon : 'refresh',
	title : 'Token Refreshed',
	message : 'Your session token was refreshed',
	timeout : 3000
})
```