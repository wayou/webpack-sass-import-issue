Loaders based on [preprocess](https://github.com/jsoverson/preprocess) not working with sass file when there are imports.

The problem:
`@import`s not processed by wepback in sass file.

e.g.

index.jsx
```js
import './index.scss';
```

index.scss
```css
@import './other.scss'
```

other.scss
```css
/* @if condition */
body{
    color:red
}
/* @endif */
```

Preprocess logic wont work in `other.scss` file.
the reason is imports in sass file are handled by sass it's self, not webpack.

For more info, see the discussion https://github.com/webpack-contrib/sass-loader/issues/164.

This repo demonstrate the problem when using a wrapped [preprocess](https://github.com/jsoverson/preprocess) loader [@umu-team/preprocess-loader](https://github.com/umu-team/preprocess-loader).

In order to avoid this, we need

- place loads after `sass-loader`. This ensures the imported sass files are process and we get full source when in other loaders
- instead of `//`, using `/**/` style comment in sass file. Because the former will removed by sass-loader.




