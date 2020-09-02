# rMarkdown
The `rMarkdown` component provides a simple markdown editor with preview and fullscreen mode. Pressing `ctrl+f` will enter fullscreen mode and you can press `escape` to exit. In compact mode, you can press `ctrl+m` to toggle between markdown view.

## Value
* **STRING** - The `v-model` accepts a string.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **max-height** : STRING - The maximum height as a CSS string to allow the editor to grow to

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-markdown
      v-model="blog_content"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog_content : ''
    };
  }
}
</script>
```