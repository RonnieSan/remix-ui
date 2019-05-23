# Column
A convenience component for creating a flex column. This element should be placed as a direct child of a `row` component.

## Slots
* **default** : The content of the column

## Props
* **max-width** : STRING - The maximum width the column should expand to
* **min-width** : STRING - The minimum width the column should condense to
* **span** : INTEGER - The span width of this column if it should span multiple columns

## Usage
In the template...
```html
<row>
  <column>This is the content of the column</column>
  <column :span="2">This column will be twice the width of the first column</column>
</row>
```