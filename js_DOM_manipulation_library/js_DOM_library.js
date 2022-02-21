const _elementNamesList = [
    'header', 'article', 'footer', 'address', 'aside',
    'main', 'nav', 'section', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'li', 'ul', 'ol', 'cite', 'blockquote',
    'input', 'button', 'form', 'fieldset', 'datalist',
    'label', 'legend', 'meter', 'optgroup', 'option',
    'textarea', 'select', 'progress', 'details', 'dialog',
    'menu', 'summary', 'slot', 'template', 'image', 'img',
    'dd', 'dl', 'dt', 'figcaption', 'figure', 'hr',
    'pre', 'span', 'b', 'abbr', 'br', 'bdi', 'code',
    'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt',
    'ruby', 's', 'samp', 'small', 'strong', 'sub', 'time',
    'u', 'var', 'wbd', 'area', 'audio', 'map', 'track',
    'video', 'embed', 'iframe', 'object', 'param', 'picture',
    'portal', 'source', 'svg', 'math', 'canvas', 'noscript',
    'script', 'del', 'ins', 'caption', 'col', 'colgroup', 'table',
    'tbody', 'td', 'thead', 'tr', 'th', 'content', 'dir', 'font',
    'acronym', 'applet', 'basefont', 'bgsound', 'big', 'blink', 'center',
    'frame', 'frameset', 'hgroup', 'keygen', 'marquee', 'menuitem', 'nobr',
    'noembed', 'noframes', 'plaintext', 'rb', 'rtc', 'shadow', 'spacer', 
    'strike', 'tt', 'xmp', 'base', 'head', 'link', 'meta', 'style', 'title', 'body'
]
const _eventNamesList = [
    'abort', 'afterprint', 'animationend', 'animationiteration', 'animationstart',
    'beforeprint', 'beforeunload', 'blur', 'canplay', 'canplaythrough', 'change', 'click',
    'contextmenu', 'copy', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave',
    'dragover', 'dragstart', 'drop', 'durationchange', 'ended', 'error', 'focus', 'focusin',
    'focusout', 'fullscreenchange', 'fullscreenerror', 'hashchange', 'input', 'invalid', 'keydown',
    'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown',
    'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'mousewheel', 'wheel', 
    'offline', 'online', 'open', 'pagehide', 'pageshow', 'paste', 'pause', 'play', 'playing', 'popstate',
    'progress', 'ratechange', 'resize', 'reset', 'scroll', 'search', 'seeked', 'seeking', 'select', 'show',
    'stalled', 'storage', 'submit', 'suspend', 'timeupdate', 'toggle', 'touchcancel', 'touchend', 'touchmove',
    'touchstart', 'transitioned', 'unload', 'volumechange', 'waiting'
]

class Element {
    constructor(type) {
        if(type) {
            if(typeof type != "string") {
                console.error("must use string as a parameter in the Element constructor")
                return
            }
            for (let c of type) {
                if(!isNaN(c)) {
                    continue
                }
                if(c === c.toUpperCase()) {
                    console.error("Please use lowercase letters in the Element constructor")
                    return
                }
            }
        }
         
        this.element = this.validElement(type) ? document.createElement(type) : null
        this.attributesList = []
    }
    mount(element) {
        if(!element) {
            console.error('Please provide an element where THIS object may be attached to.')
            return
        }
        if(this.element === null) {
            // element is actual DOM element
            if(element instanceof HTMLElement){
                this.element = element
            } else {
                console.error("Element is not valid DOM element")
            }
        }
        else {
            console.error('This element type has already been declared and cannot be attached to', element)
        }
    }
    validElement(elementtype) {
        return _elementNamesList.indexOf(elementtype) != -1
    }
    validEvent(eventname) {
        return _eventNamesList.indexOf(eventname) != -1
    }
    checkList(list, value) {
        try {
            if (list.indexOf(value) != -1) {
                console.log(`Found "${value}" from the list!`)
            }
            else {
                console.log(`Couldn't find "${value}" from the list...`)
            }
        } catch(e) {
            console.error(e)
        }
    }
    // all the create methods can only be used when the this.element property has not been assigned
    createDiv(attributes) {
        if (this.element === null) {
            this.element = document.createElement('div')
            if(attributes)
                this.setAttributes(attributes)
        } else {
            console.error(`This element type has already been set to ${this.element.nodeName}`)
        }
    }
    div = this.createDiv
    isNull() {
        return this.element === null
    }
    childOf(parent) {
        if(this.isNull()) {
            console.error("Element has not been declared!")
            return
        }
        // check if parent is DOM element
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.element)
        } 
        // or has DOM element property
        else if(parent.element instanceof HTMLElement){
            parent.element.appendChild(this.element)
        }
        else {
            console.error("Parent is not a DOM element!")
        }
    }
    parentOf(child) {
        if(this.isNull()) {
            console.error("Element has not been declared!")
            return
        }
        // check if child is DOM element
        if (child instanceof HTMLElement) {
            this.element.appendChild(child)
        } 
        // or has DOM element property
        else if(child.element && child.element instanceof HTMLElement){
            this.element.appendChild(child.element)
        }
        // check if child is an array containing child elements
        else if(Array.isArray(child)) {
            for(let childElem of child) {
                // check if child is DOM element
                if (childElem instanceof HTMLElement) {
                    this.element.appendChild(childElem)
                } 
                // or has DOM element property
                else if(childElem.element && childElem.element instanceof HTMLElement){
                    this.element.appendChild(childElem.element)
                }
                else {
                    console.error("Child element is not or doesn't have a DOM element property!")
                }
            }
        }
        else if(typeof child === 'object') {
            console.error('Child property cannot be typeof object. It must be a DOM element, or Element instance, or an array containing child elements.')
        }
        else {
            console.error("Child element is not a DOM element!")
        }
    }
    // set list of attributes
    setAttributes(attributes) {
        // check if the object is not null
        if(this.isNull()) {
            console.error("Element has not been declared!")
            return
        } 
        
        for( let key in attributes) {
            this.attribute(key, attributes[key])
        }
            
    }
    attrbs = this.setAttributes
    // set single attribute
    attribute(key, value) {
        // null checker
        if(this.isNull()) {
            console.error("Element has not been declared! Can't set an attribute.")
            return
        } 
        try {
            if(key === "id") {
                // of element #id is already created, modify id with numbers
                if(document.getElementById(value)) {
                    // modify the id
                    let id_index = 1
                    while (document.getElementById(`${value}-${id_index}`)) {
                        id_index++
                    }
                    this.element.setAttribute(key, `${value}-${id_index}`)
                } else {
                    this.element.setAttribute(key, value)
                }

            } else if(key === "href") {
                if( this.element.nodeName === "A") {
                    this.element.setAttribute(key, value)
                }
            } else if(key === "event") {
                this.event(value.name, value.callback)
            } else {
                this.element.setAttribute(key, value)
            }          

            if(this.attributesList.indexOf(key) != -1) {
                this.attributesList.push(key)
            }
                
        } catch (e) {
            console.error(e)
        }
    }
    attr = this.attribute
    // remove an attribute
    removeAttribute(key) {
        // null checker
        if(this.isNull()) {
            console.error("Element has not been declared! Can't remove an attribute.")
            return
        } 
        try {
            this.element.removeAttribute(key)
            this.attributesList.splice(this.attributesList.indexOf(key), 1)
        } catch (e) {
            console.error(e)
        }
    }
    rmAttr = this.removeAttribute
    //remove all attributes
    removeAllAttributes() {
        // null checker
        if(this.isNull()) {
            console.error("Element has not been declared! Can't remove attributes.")
            return
        } 
        try {
            while(this.attributesList.length > 0) {
                this.element.removeAttribute(this.attributesList[0])
                this.attributesList.splice(0, 1)
            }
        } catch (e) {
            console.error(e)
        }
    }
    rmAllAttrbs = this.removeAllAttributes
    class(classvalue) {
        if(this.isNull()) {
            console.error("Element has not been declared! Can't set class name.")
            return
        } 
        this.element.className = classvalue
    }
    text(textvalue) {
        if(this.isNull()) {
            console.error("Element has not been declared! Can't insert inner Text.")
            return
        } 
        this.element.innerText = textvalue
    }
    html(rawhtml) {
        if(this.isNull()) {
            console.error("Element has not been declared! Can't insert inner HTML.")
            return
        } 
        this.element.innerHTML = rawhtml
    }
    createChild(elementtype, attributes, inner) {
        if(this.isNull()) {
            console.error("Element has not been declared! Can't create a child element.")
            return
        } 
        // check if element is valid
        if(!this.validElement(elementtype)) {
            console.error("Please use valid DOM element type.")
            return
        }

        let elem = new Element(elementtype)
        elem.attrbs(attributes)
        elem.childOf(this.element)
        if(inner) {
            elem.html(inner)
        }
         
    }
    cc = this.createChild
    list(elementtypes, attributes, container) {
        if(this.isNull()) {
            console.error("Element has not been declared! Can't create a list into it...")
            return
        } 
        if(!this.validElement(elementtypes)) {
            console.error("Please use valid DOM element as element type.")
            return
        }
        if(!Array.isArray(container)) {
            console.error("Data must be inside an array")
            return
        }
        if(typeof attributes != "object") { 
            console.error("Attributes must be declared as a valid javascript object")
            return
        }
        
        container.forEach(value => {
            // check if value is string, or object, or array
            if(typeof value === "string") {
                this.createChild(elementtypes, attributes, value)
            }
            else if(typeof value === "object") {
                if(Array.isArray(value)) {
                    console.error('Please use string or object inside the list!')
                }
                else {
                    // check that value has these attributes
                    //  value['type'] value['attributes'] value['text']

                    if( value['type'] && value['attributes'] && value['text']) {
                        let li = new Element(elementtypes)
                        li.childOf(this.element)
                        li.attrbs(attributes)
                        li.createChild(value['type'], value['attributes'], value['text'])
                        if(value['event']) {
                            li.event(value['event'].name, value['event'].callback)
                        }
                    } else {
                        console.error('List child object must have this structure: { \n   text: string,\n   type: string,\n   attributes: object\n}')
                    }
                }
            }
        })
    }
    event(event, cbfunction) {
        // null checker
        if(this.isNull()) {
            console.error("Element has not been declared! Can't add an event.")
            return
        } 
        if(!this.validEvent(event)) {
            console.error("Please use valid DOM event name.")
            return
        }

        if(cbfunction instanceof Function) {
            this.element.addEventListener(event, cbfunction)
        } else {
            console.error("Please provide valid callback function")
        }
    }
    
    empty() {
        // null checker
        if(this.isNull()) {
            console.error("Element has not been declared! Can't remove child elements.")
            return
        } 
        // check if has childen ==> remove all
        while (this.element.hasChildNodes()) {
            this.element.removeChild(this.element.firstChild)
        }
        
    }
    delete() {
        // null checker
        if(this.isNull()) {
            console.error(" Can't remove an element that has not been declared!")
            return
        } 
        this.element.parentNode.removeChild(this.element)
    }
}


const elem = (elemtype, value) => {
    let element = new Element(elemtype)
    if(value) {
        element.text(value)
    }
    return element 
}