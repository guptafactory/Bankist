'use strict';
const dogs = [
  { weight: 22, curFood: 275, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Task 1
dogs.forEach(obj => (obj.recFood = Math.trunc(obj.weight ** 0.75 * 28)));
// console.log(dogs);
// Task 2
const objSarahDog = dogs.find(obj => obj.owners.includes('Sarah'));
// console.log(objSarahDog);
const str1 = `Sarah's dog is eating too ${
  objSarahDog.curFood > objSarahDog.recFood ? 'much' : 'little'
} food`;
// console.log(str1);
// Task 3
let ownersEatTooLittle = [];
let ownersEatTooMuch = [];
dogs.forEach(obj => {
  obj.curFood > obj.recFood
    ? ownersEatTooMuch.push(...obj.owners)
    : ownersEatTooLittle.push(...obj.owners);
});
// console.log(ownersEatTooMuch, ownersEatTooLittle);
// Task 4
const strEatMuch = `${ownersEatTooMuch.join(' and ')}'s dogs eat too much`;
// console.log(strEatMuch);
const strEatLittle = `${ownersEatTooLittle.join(
  ' and '
)}'s dogs eat too little`;
// console.log(strEatLittle);
// Task 5
const dogEatRecommend = dogs.some(obj => obj.curFood == obj.recFood);
// console.log(dogEatRecommend);
// Task 6 & 7
let listEatOkay = [];
const dogEatOkay = dogs.forEach((obj, i) => {
  if (obj.curFood > obj.recFood * 0.9 && obj.curFood < obj.recFood * 1.1)
    listEatOkay.push(i);
});
// console.log(listEatOkay);
// Task 8
const recFoodSort = dogs
  .slice()
  .sort((objA, objB) => objA.recFood - objB.recFood);
// console.log(dogs, recFoodSort);
//
/*
//Practice
const x = new Array(5);
x.fill(2);
// console.log(x);
const y = Array.from({ length: 5 }, () => 1);
// console.log(y);
const z = Array.from({ length: 5 }, (_, i) => i + 1);
// console.log(z);
const randomDice = Array.from(
  { length: 50 },
  () => Math.trunc(Math.random() * 50) + 1
);
// console.log(randomDice);
*/
//

//
/*
console.log(Math.max(23, 45, '56'));
console.log(Math.min(23, 45, '56'));
console.log(Math.PI * Number.parseInt('2px') ** 2);

// Random number
const generateRandomRange = (min, max) =>
console.log(Math.floor(Math.random() * (max - min + 1)) + min);
generateRandomRange(10, 13);

// Trunc, Round, Ceil, Floor
console.log(Math.trunc(50.5));
console.log(Math.round(50.2));
console.log(Math.round(50.5));
console.log(Math.ceil(50.5));
console.log(Math.floor(50.5));
console.log((0.74565).toFixed(2));


const nowDate = new Date();
console.log(nowDate);
console.log(nowDate.getFullYear());
console.log(nowDate.getMonth());
console.log(nowDate.getDate());
console.log(nowDate.getDay());
console.log(nowDate.getTime());
const time = nowDate.getTime();

const newDate = new Date(time);
console.log(newDate);

*/
