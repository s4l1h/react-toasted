### Importing Style Files..

You need to import css or scss file to your project before configure provider.

    require("react-toasted/lib/react-toasted.css");

OR

    require("react-toasted/src/index.scss");

You don't have to import default style file if you have **custom style** file.
Also, you can extend **index.scss** file to overwrite it for your self.

Also, if you need animation for **Toast** you should install **animate.css** package as well because **animate.css** is not part of this library.

    yarn add animate.css

and bring **animate.css** to your project.

    require("animate.css");
