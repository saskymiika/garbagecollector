
# Custom JavaScript library for DOM manipulation.
## It is work in progress...

### How to use:

- Create element:
```
// to create a new div element, create constructor like this:
const app = new Element('div');

// or
const app = elem('div');

// to add element to the document use
app.childOf(<DOM_element_name>)
```

`<DOM_element_name>` must be an instance of a new Element or actual DOM element like `document.getElementById('app')`

- Create item from already existing DOM element
```
const app = elem(); // <=== without parameters!
app.mount(document.getElementById('app'));
``` 
