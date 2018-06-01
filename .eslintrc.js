// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', 'stroustrup', {
      'allowSingleLine': true
    }],
    'camelcase': 0,
    'eol-last': 0,
    'generator-star-spacing': 0,
    'handle-callback-err': 0,
    'indent': ['error', 'tab', {
      'SwitchCase': 1,
      'MemberExpression': 'off'
    }],
    'key-spacing': 0,
    'linebreak-style': ['error', 'unix'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': 0,
    'no-multi-spaces': 0,
    'no-new': 0,
    'no-path-concat': 0,
    'no-tabs': 0,
    'operator-linebreak' : ['error', 'after', {
      'overrides' : {
        '?' : 'before',
        ':' : 'before',
        '&&' : 'before',
        '||' : 'before'
      }
    }],
    'padded-blocks': 0,
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "ignore"
    }]
  }
}