class Create {
  constructor(tagName, attributes, content) {
    this.tagName = tagName;
    this.attributes = attributes || null;
    this.content = content || null;
    this.parent = null;
    this.placement = null;
  }

  get tagName() {
    return this._tagName;
  }

  set tagName(t) {
    this._tagName = t;
  }

  get attributes() {
    return this._attributes;
  }

  set attributes(a) {
    this._attributes = a;
  }

  get content() {
    return this._content;
  }

  set content(c) {
    this._content = c;
  }

  get parent() {
    return this._parent;
  }

  set parent(p) {
    this._parent = p;
  }

  get placement() {
    return this._placement;
  }

  set placement(plcmt) {
    this._placement = plcmt;
  }

  element() {
    let attr = '';
    if (this.attributes) {
      for (const property in this.attributes) {
        let newAttr = attr.concat(`${property}="${this.attributes[property]}"`);
        attr = newAttr;
      }
    }

    const element = `<${this.tagName} ${attr ? attr : null}>${
      this.content ? this.content : '\0'
    }</${this.tagName}>`;

    return element;
  }

  placeElement(parent, plcmt) {
    this.parent = parent;
    this.placement = plcmt;
    this.parent = document.querySelector(parent);
    const placedElement = this.parent.insertAdjacentHTML(
      `${this.placement}`,
      this.element()
    );
    return placedElement;
  }
}

const div = new Create('div', {
  class: 'button-container',
  style: 'background:coral; padding:20px; width: 100px',
});
div.placeElement('body', 'afterbegin');
const button = new Create('button', {
  class: 'button',
  style: 'background:white; font-family: sans-serif; border: 1px solid black;',
});
button.content = 'push the button';
button.element();
button.placeElement('.button-container', 'afterbegin');
