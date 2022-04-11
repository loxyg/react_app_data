Gallery Picker with React js
===

[![Code version](https://img.shields.io/badge/version-1.1.2-blue.svg)](http://www.npmjs.com/package/react-gallery-picker)

See the Example [`Image Picker`](https://daym3l.github.io/react-gallery-picker/)

React gallery picker is a React Js component for building image galleries and select images

Features of `react-gallery-picker`
* Table View
* Image Selection

## Getting started

```
npm install react-gallery-picker
```

### Example 

Need more? See [`sample/src/index.js`](https://github.com/Daym3l/react-gallery-picker/tree/master/sample/src/index.js)

```js

import Gallery from "react-gallery-picker";

const IMAGE1 = "/assets/images/1.jpg"
const IMAGE2 = "/assets/images/2.jpg"
const IMAGE3 = "/assets/images/3.jpg"

const IMAGE_LIST = [{ url: IMAGE1, name: "imagen 1" },{ url: IMAGE2, name: "imagen 2" } ,{ url: IMAGE3, name: "imagen 3" } ];


export default () => {
    const getImages = images => {
        // Do something with the selected images)
        console.log(images);
    }

    return <Gallery imagesRecived={IMAGE_LIST} returnImages={getImages} />
}
```
# Props
* `imagesRecived`: (required) Array of objects, see example above,
  * Available Properties
    * `original` - image src url
    * `base64` - image base64
* `returnImages`: (required) Function that returns an array of objects with the Boolean property selected

# Build the example locally

```
git clone https://github.com/Daym3l/react-gallery-picker.git
cd react-gallery-picker
npm install
npm start
```

Then open [`localhost:3001`](http://localhost:3001) in a browser.


# License

MIT

