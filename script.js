const table = document.querySelector('#table');

const genereteShuffledNumbers = (maxNumber = 25) => {
  const genereteNumbers = [...new Array(maxNumber).keys()].map(i => ++i);
  const shuffledNumbers = [];

  for (let i = maxNumber; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = i;
    shuffledNumbers[i] = j;
    genereteNumbers[j] = temp;
  }

  console.log(shuffledNumbers);
  // shuffledNumbers.forEach(i)
  // genereteNumbers.reverse().reduce((acc, i, arr) => {
  //   const r = Math.floor(Math.random() * i); // 7
    
  //   arr[r] = arr[i];
  //   console.log(arr);
  //   return [...acc, r];
  // }, []);
}

// function shuffleArray(array) {
//   for (var i = array.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i + 1));
//       var temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//   }
// }

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// const shuffle = (array) => {
//   const arr = [];
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * i);
//     const temp = array[i];
//     arr[i] = j;
//     arr[j] = temp;
//   }

//   return arr;
// };
genereteShuffledNumbers();


// const a = new Array(25);
// console.log(a, shuffle(new Array(25)));