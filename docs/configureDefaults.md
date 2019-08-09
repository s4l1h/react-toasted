### Configure Defaults

if you would like to overwrite default options you can do like that.

```js
<ToastedProvider
  // you can overwrite to default Options
  {...{
    defaultClassNames: ["animated", "zoomInUp"], // need animated.css
    defaultPosition: "toast-top-right",
    defaultNewestOnTop: false,
    defaultType: "error",
    defaultRemoveOnClick: true,
    defaultTimeout: 5000,
    defaultProgressBar: true,
    defaultProgressBarValue: null,
    defaultPreventDuplicates: false,
    defaultStyle: {}
    //      defaultPositions: positions
  }}
>
```

OR

```js
<ToastedProvider
  defaultType="success"
  defaultPosition="toast-top-left"
  defaultRemoveOnClick={false}
>
```
