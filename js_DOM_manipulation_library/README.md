
# Custom JavaScript library for DOM manipulation.
## It is work in progress...

### How to use:

- Create element:
```
// to create a new div element, create constructor like this:
const app = new Element('div')

// or
const app = elem('div')

// to add element to the document use
app.childOf(<DOM_element_name>)
```

`<DOM_element_name>` must be an instance of a library item like 
or
actual DOM element like `document.getElementById('app')`

- Create item from already existing DOM element
```
const app = elem(); // <=== without any parameter values!
app.mount(document.getElementById('app'))
``` 

- Set single attribute to the element
```
// set a class name to the element
app.attribute('class', 'the-class-name')

// or with shorted method name...
app.attr('class', 'the-class-name')
```

- Set multiple attributes to the element
```
// create attributes object

let attributes = {
  class: 'my-class-name',
  id: 'the-id'
}

app.setAttributes(attributes)

// or with shorted method name...
app.attrbs(attributes)
```

- Remove an attribute from the element
```
// remove class attribute from the element
app.removeAttribute('class')

// or with shorter method name...
app.rmAttr('class')
```

- Remove all attibutes from the element
```
app.removeAllAttributes()

// or with shorted method name...
app.rmAllAttrbs()
```

- Insert text into the element
```
app.text('My text value.')
```

- Insert html into the element
```
app.html('html as a string')
```
