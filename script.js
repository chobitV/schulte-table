const shuffle = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

const genereteNumbers = (maxNumber = 25) => {
  return [...new Array(maxNumber).keys()].map(i => ++i);
}

const template = document.createElement('template');
const SUPPORTED_SIZES = ['5','6','7'];

template.innerHTML = `
  <style>
    :host {
      display: block;
      aspect-ratio: 1;
    }

    :host([size='5']) {
      --table-size: 5;
    }

    :host([size='6']) {
      --table-size: 6;
    }

    :host([size='7']) {
      --table-size: 7;
    }

    ul {
      aspect-ratio: 1;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style: none;
      display: grid;
      grid-template: repeat(var(--table-size), 1fr) / repeat(var(--table-size), 1fr);
      gap: 5px;
    }
  
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #333;
    }

    @media print {
      :host {
        height: 100%;
      }
    }
  </style>
  <ul></ul>
`;

class SchulteTable extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  static isSupportedSize(value) {
    return SUPPORTED_SIZES.includes(value);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  connectedCallback() {
    if (this.size) {
      this.generateList(this.size);
    } else {
      this.size = SUPPORTED_SIZES[0];
    }
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'size':
          if (SchulteTable.isSupportedSize(newValue)) {
            this.generateList(newValue);
          }
          
          break;
      }
    }
  }

  generateListFragment(numbers) {
    const listFragment = document.createDocumentFragment();

    numbers.forEach((number) => {
      const item = document.createElement('li');
      item.textContent = number;
      listFragment.appendChild(item);
    });

    return listFragment;
  }

  generateList(size) {
    const list = this.shadowRoot.querySelector('ul');
    const numbersArray = genereteNumbers(size * size);
    const shuffleNumbersArray = shuffle(numbersArray);
    const listFragment = this.generateListFragment(shuffleNumbersArray);
    list.replaceChildren(listFragment);
  }

  reload() {
    this.generateList(this.size);
  }
}

window.customElements.define('schulte-table', SchulteTable);




// const selectTableSize = document.querySelector('#table-size');
const schulteTables = document.querySelectorAll('schulte-table');
// selectTableSize.addEventListener('change', (event) => {
//   schulteTables.forEach((schulteTable) => {
//     schulteTable.setAttribute('size', event.target.value);
//   });
// });

const buttonPrint = document.querySelector('#button-print');
buttonPrint.addEventListener('click', () => {
  window.print();
});

const buttonReload = document.querySelector('#button-reload');
buttonReload.addEventListener('click', () => {
  schulteTables.forEach((schulteTable) => schulteTable.reload());
});