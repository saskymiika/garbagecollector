
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

- Create a child element into the element
```
let elementType = 'h1'

let childAttributes = {
  class: 'my-class-name',
  id: 'the-id'
}

let innerHtml = 'Inner html value.' // *optional

app.createChild(element, childAttributes, *innerHtml)

// or with shorted method name...
app.cc(element, childAttributes, *innerHtml)
``` 

- Create a list inside an element
```
// let's create an unordered list inside the app Element
const ul = elem('ul')
ul.childOf(app)

// create list of li elements

let listElement = 'li'

let listElementAttributes = {
  id: 'this-works-too'
  class: 'ul-list-item'
}

let listData = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

ul.list(listElement, listElementAttributes, listData)

/* OUTPUT:
<div>
  <ul>
    <li id="this-works-too" class="ul-list-item">First</li>
    <li id="this-works-too-1" class="ul-list-item">Second</li>
    <li id="this-works-too-2" class="ul-list-item">Third</li>
    <li id="this-works-too-3" class="ul-list-item">Fourth</li>
    <li id="this-works-too-4" class="ul-list-item">Fifth</li>
  </ul>
</div>
*/
```
