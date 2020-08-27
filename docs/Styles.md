# Remix UI Styles

## Webpack Config
Remix UI uses LessCSS for styles. You may need to add the LessCSS loader to your Webpack config file.
```js
// Add the less loader to your webpack config
{
    module : {
        rules : [
            ...,
            {
                test : /\.less$/,
                loader : [
                    'vue-style-loader',
                    {
                        loader : 'css-loader',
                        options : {
                            sourceMap : true
                        }
                    },
                    {
                        loader : 'postcss-loader',
                        options : {
                            sourceMap : true
                        }
                    },
                    {
                        loader : 'less-loader',
                        options : {
                            sourceMap : true
                        }
                    }
                ]
            },
        ]
    }
}
```

## Theme Styles
If you're using a theme file for the styles, you can reference it in your Webpack config like so...
```js
{
    resolve : {
        alias : {
            'remix-ui-theme' : path.resolve(__dirname, 'path/to/theme.less')
        }
    }
}
```

Then you just include any of the styles you want to use in your component. The `~` in the path will resolve to the node_modules folder.
```html
<style lang="less">
@import '~remix-ui/styles/Form.less';
</style>
```

## Remix CSS Styles
It is highly recommended that you use the `remix-css` npm package along side Remix UI. Remix CSS requires a well-thought out structure when creating a web page that provides excellent responsiveness as well as some utility styles to make development much quicker. For more information on Remix CSS, please visit the [Remix CSS GitHub Repo](https://github.com/RonnieSan/remix-css).