# Button
A form button with options for styling and interaction states.

## Slots
* **default** - The button label

## Props
* **type** : STRING - The button type to use for this button ['button', 'submit', or 'reset'] (Defaults to 'button')
* **icon** : STRING - If using MDI, the name of the icon to show on this button
* **iconSize** : STRING - The size of the icon in px (Defaults to 24)
* **loading** : BOOLEAN - The loading state of the button to show a loading icon
* **disabled** BOOLEAN - Whether the button is disabled or not

## Usage
In the template...
```html
<r-button type="submit" icon="check" :loading="loading" :disabled="loading">Submit Form</r-button>
```

Change loading status in the script...
```js
{
  methods : {
    submitForm() {
      this.loading = true;
      this.asyncMethod();
    },
    asyncMethod() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }
}
```