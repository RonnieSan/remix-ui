# Layout Components Overview

Remix UI provides some basic layout components that help you create responsive layouts quickly and easily. When building out your application, using these components makes responsive design easy as columns will automatically stack for mobile viewing.

## Grid Component
Wrapping rows and columns in the grid component will apply the `@gutter-width` style to child components. Setting the `gutter` prop will override the values.

### Props
* **gutter** : STRING - The height/width of the gutters

### Usage
Using the brid component below will automatically apply the default gutter spacing to the first level of child row and column components.
```html
<grid gutter="10px">
    <row>
        <column>First Column</column>
        <column>Second Column</column>
    </row>
    <row>
        <column>First Column</column>
        <column>Second Column</column>
    </row>
</grid>
```
---
## Row
The row component is a flex-row container that will switch to a flex-column at lower resolutions (mobile). The row component will inherit the gutter of the closest `grid` component surrounding it. The row component may also be used outside of the grid component.

### Usage
```html
<row>
    <column>First Column</column>
    <column>Second Column</column>
</row>
```
---
## Column
The `column` component should be nested inside a `row` component. Columns will stack at lower resolutions (mobile). In order to keep consistent column widths, the column slot has a nested `.inner-column` div that adiitional styles should be applied to. The `column` component can also be passed additional props.

### Props
* **span** : STRING - The number of units for the column to span. A column with span 2 next to a column with span 3 will take up 40% of the available space.
* **maxWidth** : STRING - The maximum width the column should have
* **minWidth** : STRING - The minimum width a column should have

### Usage
```html
<row>
    <column span="2">This column will be 2/3 of the width of the row</column>
    <column min-width="320px">This column will stack if it tries to get smaller than 320px</column>
</row>
```
---
## Gutter
The `gutter` component is used to create custom gutter widths between `column` components or `row` components. `gutter` components that are placed between columns will switch to vertical gutters when the window width changes.

### Props
* **size** : STRING - The height/width of the gutter
* **static** : BOOLEAN - If set to `true`, the gutter will not collapse when the width changes

### Usage
```html
<row>
    <column>This is a column</column>
    <gutter size="20px"/>
    <column>This is a column</column>
    <gutter size="50px"/>
    <column>This is a column</column>
</row>
```
