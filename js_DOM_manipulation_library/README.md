
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

`<DOM_element_name>` must be an instance of a library item 
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

// Let's create li elements into the unordered list
let listElement = 'li'

// list item attributes, apply to every list item
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

- Create list but with link items
> if we want to create list with link items, then we would want to put additional data into the listData array:

```
// create ul object
const ul = elem('ul')
ul.childOf(app)

// Let's create li elements into the unordered list
let listElement = 'li'

// list item attributes, apply to every list item
let listElementAttributes = {
  id: 'this-works-too'
  class: 'ul-list-item'
}

// each link item must use this specific structure
let listData = [
  {
    text: 'First', // the text value inside the link element
    type: 'a', // specify the type of element <a></a> 
    attributes: { // attributes object, specify all attibutes to the link item
      class: 'list-link',
      id: 'link',
      href: 'https://example1.com'
    }
  },
  {
    text: 'Second', // the text value inside the link element
    type: 'a', // specify the type of element <a></a> 
    attributes: { // attributes object, specify all attibutes to the link item
      class: 'list-link',
      id: 'link',
      href: 'https://example2.com'
    }
  },
  {
    text: 'Third', // the text value inside the link element
    type: 'a', // specify the type of element <a></a> 
    attributes: { // attributes object, specify all attibutes to the link item
      class: 'list-link',
      id: 'link',
      href: 'https://example3.com'
    }
  }
]

// create the list...
ul.list(listElement, listElementAttributes, listData)

/* OUTPUT:
<div>
  <ul>
    <li id="this-works-too" class="ul-list-item">
      <a id="link" class="list-link" href="https://example1.com">First</a>
    </li>
    <li id="this-works-too" class="ul-list-item">
      <a id="link-2" class="list-link" href="https://example2.com">Second</a>
    </li>
    <li id="this-works-too" class="ul-list-item">
      <a id="link-3" class="list-link" href="https://example3.com">Third</a>
    </li>
  </ul>
</div>
*/
```

- Add event to the element
```
// let's create buttom element
const button = elem('button')

// insert inner text to the button
button.text('Click me!')

//create callback function to the event
const myClickEvent = (event) => { //
  console.log('I have clicked the button element!')
}

// add event to  the button
button.event('click', myClickEvent)
```

- Remove the item
```
// use the previous button element in this example

// remove the button element
button.delete()
```

- Remove every child element inside the element
```
// remove every child element inside the app container
app.empty()
```
