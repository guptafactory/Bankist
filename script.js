'use strict';
// BANKIST APP
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  balance: 0,
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  balance: 0,
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  balance: 0,
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  balance: 0,
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
  ],
};
let currentAccount;
const accounts = [account1, account2, account3, account4];

// Elements
// Labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
// Containers
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
// Input
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
const createUsernames = function () {
  accounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createUsernames();
//
const parseMovDate = function (i) {
  const dateStr = currentAccount.movementsDates[i];
  // Movement Date
  const movDate = new Date(dateStr);
  const year = movDate.getFullYear().toString();
  const month = (movDate.getMonth() + 1).toString().padStart(2, '0');
  const date = movDate.getDate().toString().padStart(2, 0);
  // Difference of dates
  // console.log((new Date() - movDate) / 1000);
  const diffInDates = Math.round(
    Math.abs(new Date() - movDate) / (1000 * 60 * 60 * 24)
  );
  console.log(diffInDates);
  return `${date}/${month}/${year}`;
};
//
const displayMovements = function (sort = false) {
  // Reset previous displayed movements
  containerMovements.innerHTML = '';
  const sortedMovements = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;
  sortedMovements.forEach(function (mov, i) {
    const Transactiontype = mov > 0 ? 'deposit' : 'withdrawal';
    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${Transactiontype}">${
      i + 1 + ' ' + Transactiontype
    }</div>
      <div class="movements__date">${parseMovDate(i)}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;
    // insert movements in reversed fashion
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//
const displayBalance = function () {
  currentAccount.balance = currentAccount.movements.reduce(
    (acc, cur) => acc + cur,
    0
  );
  labelBalance.textContent = currentAccount.balance.toFixed(2) + '€';
};
//
const displaySummary = function () {
  // Amount Input
  const amountInput = currentAccount.movements
    .filter(move => move > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = amountInput.toFixed(2) + '€';
  // Amount Output
  const amountOutput = currentAccount.movements
    .filter(move => move < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = amountOutput.toFixed(2) + '€';
  // Interest Amount
  const interest = currentAccount.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest.toFixed(2) + '€';
};
function updateUI() {
  displayMovements();
  displayBalance();
  displaySummary();
}
//
const fakeUserLogin = function () {
  currentAccount = account1;
  containerApp.style.opacity = 100;
  updateUI();
};
// fakeUserLogin();
//
const setDateLabel = function () {
  const present = new Date();
  const year = present.getFullYear().toString();
  const month = (present.getMonth() + 1).toString().padStart(2, '0');
  const date = present.getDate().toString().padStart(2, 0);
  // const day = present.getDay();
  // const time = present.getTime();
  labelDate.textContent = `${date}/${month}/${year}`;
};
setDateLabel();
//
/// Event Listeners ///
// Login Button
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // Check account number
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    updateUI();
  }
});
//  Transfer Button
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value).toFixed(2);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc?.userName !== currentAccount.userName &&
    currentAccount.balance > amount
  ) {
    // Update movements array of both accounts
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    // UI changes
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferTo.blur();
    inputTransferAmount.blur();
    updateUI();
  }
});
// Loan Button
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    updateUI();
  }
});
// Close Account Button
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log('Delete Account');
    const ind = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(ind, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
    containerApp.style.opacity = 0;
  }
});
// Sort button
let alreadySorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(!alreadySorted);
  alreadySorted = !alreadySorted;
});
//
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    str => Number(str.textContent.replace('€', ''))
  );
  // console.log(movementsUI);
});
//
