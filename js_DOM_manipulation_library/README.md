
# Custom JavaScript library for DOM manipulation.
## Work in progress...

### How to use:

- Create element:
```
// to create a new div element, create constructor like this:
const app = new Element('div')

// or use
const app = elem('div')

// to add element to the document use
app.childOf(<DOM_element_name>)

// if we have parent element, we can also use
parent.parentOf(app)
```
`<DOM_element_name>` must be an instance of a library item 
or
actual DOM element like `document.getElementById('app')`

> You can append multiple child elements to the element with `parentOf()` method, if you pass the child elements into an array.
```
// EXAMPLE
// append child elements with parentOf() method

const app = elem('div')

const title = elem('h1', 'Welcome!')
const p1 = elem('p', 'This is my useful paragraph.')
const p2 = elem('p', 'This is my second paragraph which is also a child element.')

app.parentof([title, p1, p2])

OUTPUT:
  <div>
    <h1>Welcome</h1>
    <p>This is my useful paragraph.</p>
    <p>This is my second paragraph which is also a child element.</p>
  </div>

```
> TIP: If you use elem() function as constructor, the first argument defines the type of the element. Second argument will be inserted to the element as inner text value. This is useful if using text based elements.


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
> text() and html() methods will not append data to the element, but they will overwrite the existing data. Inner values are assigned to the element with use of `=` operator.

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

OUTPUT:
<div>
  <ul>
    <li id="this-works-too" class="ul-list-item">First</li>
    <li id="this-works-too-1" class="ul-list-item">Second</li>
    <li id="this-works-too-2" class="ul-list-item">Third</li>
    <li id="this-works-too-3" class="ul-list-item">Fourth</li>
    <li id="this-works-too-4" class="ul-list-item">Fifth</li>
  </ul>
</div>

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

OUTPUT:
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

## Example of list method
> The list method would work the best if we used something like array.map() with it.
> We could fetch data from back end and then use the list() method to costruct the link items

```
// EXAMPLE OF FETCHING A LIST OF MOVIES FROM THE BACK END

const ul = elem('ul')

fecth('/movies')
  .then(data => data.json())
  .then(movies => {
    let listData = movies.map(item => ({
        text: item.name
        type: item.type
        attributes: { 
          class: item.attribute.class,
          id: item.attribute.id,
          href: item.arrtibute.href
        }
    }))
    
    ul.list('li', {class: 'list-item'}, listData)
  })
```
> or with the help of `ChildProps` constructor
```
const ul = elem('ul')

fecth('/movies')
  .then(data => data.json())
  .then(movies => {
    let listData = movies.map(item => new ChildProps(item.name, item.type, {class: item.attribute.class, href: item.arrtibute.href}, item.event))
    
    ul.list('li', {class: 'list-item'}, listData)
```
> TIP: If you have already defined attributes in the right format in the back end, it will look much cleaner in the constructor
```
let listData = movies.map(item => new ChildProps(item.name, item.type, item.attributes, item.event))
```
> or maybe even set object ready as whole in back end, skip mapping completely:
```
fecth('/movies')
  .then(data => data.json())
  .then(movies => {
     ul.list('li', {class: 'list-item'}, movies)
```
> BUT: if you skip handling the data, the risk of errors increase.
> Using the ChildProps constructor is for sure the safest way to get right data format.

## Attribute behavior
> Attributes can be set to any element of choice and they will behave the normal way.
> BUT if we attempt to set multiple ids with the same value, the value will be modified with 'dash' and 'number'.
```
// EXAMPLE:
const app = elem('div')
app.attrbs({id: 'main-container', class: 'container'})

const app2 = elem('div')
app2.attrbs({id: 'main-container', class: 'container'})

OUTPUT:
  <div id="main-container" class="container"></div>
  <div id="main-container-1" class="container"></div>
```

> If we set an attribute with property name 'event', we can assing an event to the element.
> The event must be passed as an event object with properties 'name' and 'callback' as shown below:
```
// EXAMPLE:
const button = elem('button')
button.attrbs({class: 'greet-btn', event: {
  name: 'click',
  callback: function(e) {
    console.log("button was clicked")
    console.log(e.target.nodeName)
    console.log(e.target.className)
}}})

CONSOLE OUTPUT:
> button was clicked
> BUTTON
> greet-btn
```
