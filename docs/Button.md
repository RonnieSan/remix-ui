# Button
A form button with options for styling and interaction states.

## Slots
* **default** - The button label

## Props
* **disabled** : BOOLEAN - Whether the button is disabled or not
* **icon** : STRING - If using MDI, the name of the icon to show on this button
* **iconSize** : STRING - The size of the icon in px (Defaults to 24)
* **loading** : BOOLEAN - The loading state of the button to show a loading icon
* **type** : STRING - The button type to use for this button ['button', 'submit', or 'reset'] (Defaults to 'button')

## Styles
If using the Remix UI styles, if you want a button with a single icon in it, you can add the class `.icon` to remove the icon background and collapse the label.

## Usage
```vue
<template>
  <div>
    <!-- SUBMIT BUTTON WITH LOADER THAT DISABLES WHILE LOADING -->
    <r-button type="submit" icon="check" :loading="loading" :disabled="loading">Submit Form</r-button>

    <!-- ICON BUTTON -->
    <r-button class="icon" icon="refresh"></r-button>
  </div>
</template>

<script>
export default {
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
</script>
```