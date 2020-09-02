# rText
The `rText` component is a basic text input form control with added functionality.

## Value
* **STRING** - The `v-model` accepts a string

## Props
* **allowed** : STRING - A string of characters that are allowed in the field value
* **autocomplete** : STRING ( on | off ) - The native attribute passed down to the input
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **filter** : FUNCTION(value) - A custom function that is passed the value of the field as an argument. This is used to transform the value when input occurs.
* **mask** : STRING - A custom mask string (ala vue-the-mask)
* **outputMask** : BOOLEAN - Set to `true` to save all characters in the mask to the value
* **placeholder** : STRING - The placeholder text passed to the native input element
* **type** : STRING ( text | number | password | tel | etc ) - The input type to use for this text field. You should generally stick to `text` or `tel`.

## Slots
If using Remix UI styles, the class `.control-helper` will style content in the slots appropriately.
* **left** - The left slot will insert data before the text input, but inside the control border
* **left** - The left slot will insert data after the text input, but inside the control border

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-text
      name="first_name"
      v-model="first_name"
    />

    <!-- USING SLOTS -->
    <r-text
      name="email"
      v-model="email"
    >
      <div class="control-helper" slot="left">
        <icon type="email" size="24px"/>
      </div>
    </r-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name : '',
      email : ''
    }
  }
}
</script>
```

## Masking Values
Text masks can come in handy when you expect a specific format for text such as a phone number or a date. Combined with the `outputMask` prop, you have full control of this feature.

#### Mask Characters
```js
'#': {pattern: /\d/},
'X': {pattern: /[0-9a-zA-Z]/},
'S': {pattern: /[a-zA-Z]/},
'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
'!': {escape: true}
```

#### Mask Example
```vue
<template>
  <div>
    <!-- WITHOUT MASK -->
    <r-text
      name="phone_number_without_mask"
      v-model="phone_number_without_mask"
      mask="(###) ###-####"
    />

    <!-- WITH MASK -->
    <r-text
      name="phone_number_with_mask"
      v-model="phone_number_with_mask"
      mask="(###) ###-####"
      output-mask
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone_number_without_mask : '6195551212',
      phone_number_with_mask : '(619) 555-1212'
    }
  }
}
</script>
```

## Filters
Adding a filter to an `rText` component can help you enforce certain rules. For example, if you want a value to use hyphens instead of spaces, you can apply the lodash kebabCase function as a filter. Now when a user types a value into the field, all spaces will turn into hyphens and all text will be lowercase.

#### Filter Example
```vue
<template>
<r-text
  name="file_name"
  v-model="file_name"
  :filter="kebabCase"
/>
</template>

<script>
import { kebabCase } from 'lodash';

export default {
  data() {
    return {
      file_name : ''
    };
  },
  methods : {
    kebabCase
  }
}
</script>
```