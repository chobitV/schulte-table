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

const numbersArray = genereteNumbers();
const shuffleNumbersArray = shuffle(numbersArray);

const list = document.querySelector('#list');
const listFragment = document.createDocumentFragment();

shuffleNumbersArray.forEach((number) => {
  const item = document.createElement('li');
  item.classList.add('schulte-table__item');
  item.textContent = number;
  listFragment.appendChild(item);
});

list.appendChild(listFragment);