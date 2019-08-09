## Functions

### Creating and removing toast.

```js
// You can use all of the toast options.If you left blank any fields, that will use default options.
let myVariable = toasted.add({
  name: "mytoast", // We'll need this to remove the toast.
  position: "toast-bottom-full-width",
  title: "Full",
  type: "success"
});
// remove toast by name
toasted.remove("mytoast");
// remove toast by variable
toasted.remove(myVariable);
// remove all Toasts
toasted.removeAll();
```

These functions create toasts, the second parameter title is optional.

```js
toasted.s("Success Message");
toasted.e("Error Message", "Errror!!!");
toasted.w("Warning Message will be showing here.", "Warning!!!");
toasted.i("Information Message");
```
