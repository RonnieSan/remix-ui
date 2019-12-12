# Form Builder
The form builder component creates form based on a JSON configuration passed into it.

## Props
* **config** : ARRAY - An array containing a collection of fieldsets, controls, and fields. See below for formatting.

**Note: When creating the config object, use a computed value that returns the config object on get and sets local properties on set. When the config values change on form input, the computed `set()` function will be passed an object containing the new values using the model names as keys.**

## Config Format
```json
// config
[
  [Object FieldSet]
]

// Object FieldSet
{
  type : {
    type : String,
    description : 'The type of element to use for the group',
    enum : [
      'div',
      'fieldset'
    ]
  },
  class : {
    type : String,
    description : 'Classes that you want to add to the group element'
  },
  heading : {
    type : String,
    description : 'A heading to display in your group. For div elements, it will be an H2. For fieldsets, it will be the content of the legend element.'
  },
  controls : {
    type : Array,
    decription : 'An collection of control objects [Object Control]'
  }
}

// Object Control
{
  label : {
    type : String,
    description : 'The content to use in the label element. If ommitted, the label will not be used'
  },
  validation : {
    type : Object,
    description : 'An optional validation to apply to the control',
    properties : {
      model : {
        type : [String, Number, Boolean, Array, Object],
        description : 'The value to pass into the validation rules'
      },
      rules : {
        type : Array,
        description : 'An array of validation rules to test against when the value changes. See the Remix UI validation library for details.'
      },
      any : {
        type : Any,
        description : 'Any other properties will be bound to the validation element'
      }
    }
  }
  fields : {
    type : Array,
    description : 'A collection of field objects [Object Field] to dispay in the control group element'
  }
}

// Object Field
{
  component : {
    type : String,
    description : 'The type of component to use for the field'
  },
  model : {
    type : String,
    description : 'The name of the property to use as a model for the field. On config update, an object will return with the new value assigned to a property matching this value.'
  },
  value : {
    type : [String, Number, Boolean, Object, Array],
    description : 'The initial value of the model'
  },
  class : {
    type : String,
    description : 'Any classes you want added to the .field element'
  },
  props : {
    type : Object,
    description : 'Additional attributes to bind to the component'
  },
  before : {
    type : String,
    description : 'HTML to add before the form input component'
  },
  after : {
    type : String,
    description : 'HTML to add after the form input component'
  },
  validation : {
    type : Object,
    description : 'An optional validation to apply to the control. The validation will use the models value by default',
    properties : {
      rules : {
        type : Array,
        description : 'An array of validation rules to test against when the value changes. See the Remix UI validation library for details.'
      },
      any : {
        type : Any,
        description : 'Any other properties will be bound to the validation element'
      }
    }
  }
}
```

## Usage

In the template
```html
<r-form-builder :config="formBuilderConfig"/>
```

In the script...
```js
{
  data() {
    return {
      form_data : {
        name : 'Fermegatroid Skittle',
        phone : '6195551212',
        gender : 'male'
      }
    };
  },
  computed : {
    formBuilderConfig : {
      get : function() {
        return [
          {
            type : 'fieldset',
            class : 'my-set',
            heading : 'Form Builder',
            controls : [
              {
                fields : [
                  {
                    before : '<label class="control-label">Name:</label>',
                    component : 'r-text',
                    model : 'name',
                    value : this.form_data.name,
                    validation : {
                      rules : [rules.required()]
                    }
                  },
                  {
                    label : 'Phone:',
                    component : 'r-text',
                    model : 'phone',
                    value : this.form_data.phone,
                    props : {
                      mask : '(###) ###-####'
                    },
                    validation : {
                      rules : [rules.required()]
                    }
                  }
                ]
              },
              {
                label : 'Gender:',
                fields : [
                  {
                    component : 'r-select',
                    model : 'gender',
                    value : this.form_data.gender,
                    props : {
                      options : [
                        {label : 'Male', value : 'male'},
                        {label : 'Female', value : 'female'}
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ];
      },
      set : function(new_value) {
        this.form_data = new_value;
      }
    }
  }
}
```