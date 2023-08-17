'use strict';
// BANKIST APP
// Data
const account1 = {
  owner: 'Himanshu Gupta',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  balance: 0,
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-12-30T09:48:16.867Z',
    '2023-01-25T06:04:23.907Z',
    '2023-02-25T14:18:46.235Z',
    '2023-03-05T16:33:06.386Z',
    '2023-06-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-08-15T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US', // language-Country
};

const account2 = {
  owner: 'Kavya Gaur',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  balance: 0,
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-12-30T09:48:16.867Z',
    '2023-01-25T06:04:23.907Z',
    '2023-02-25T14:18:46.235Z',
    '2023-03-05T16:33:06.386Z',
    '2023-06-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-08-15T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Armaan Dutt',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  balance: 0,
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-12-30T09:48:16.867Z',
    '2023-01-25T06:04:23.907Z',
    '2023-02-25T14:18:46.235Z',
    '2023-03-05T16:33:06.386Z',
    '2023-06-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-08-15T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account4 = {
  owner: 'Prince Raj',
  movements: [430, 1000, 700, 50, 90],
  balance: 0,
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-12-30T09:48:16.867Z',
    '2023-01-25T06:04:23.907Z',
    '2023-02-25T14:18:46.235Z',
    '2023-03-05T16:33:06.386Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

// Global Variables
const accounts = [account1, account2, account3, account4];
let currentAccount, timer;

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

const labelDateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

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
const setDateLabel = function () {
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    labelDateFormat
  ).format(new Date());
};
//
const parseMovDate = function (i) {
  const dateStr = currentAccount.movementsDates[i];
  // Movement Date
  const movDate = new Date(dateStr);
  // Difference of dates
  const diffInDates = Math.round(
    Math.abs(new Date() - movDate) / (1000 * 60 * 60 * 24)
  );
  if (diffInDates == 0) return 'today';
  else if (diffInDates == 1) return 'yesterday';
  else if (diffInDates < 7) return `${diffInDates} days ago`;
  return new Intl.DateTimeFormat(currentAccount.locale).format(movDate);
};
//
const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
// Login Timer
const startloginTimer = function () {
  let t = 120,
    min,
    sec; // 120 seconds
  function updateTimer() {
    min = Math.trunc(t / 60)
      .toString()
      .padStart(2, 0);
    sec = Math.trunc(t % 60)
      .toString()
      .padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (t == 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    t--;
  }
  updateTimer();
  timer = setInterval(updateTimer, 1000);
};
//
const displayMovements = function (sort = false) {
  // Reset previous displayed movements
  containerMovements.innerHTML = '';
  // To check is sorted movements needed
  const sortedMovements = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;
  sortedMovements.forEach(function (mov, i) {
    const Transactiontype = mov > 0 ? 'deposit' : 'withdrawal';
    // Fomatted movement value
    const parseMovVal = formatCurr(
      mov,
      currentAccount.locale,
      currentAccount.currency
    );
    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${Transactiontype}">${
      i + 1 + ' ' + Transactiontype
    }</div>
    <div class="movements__date">${parseMovDate(i)}</div>
      <div class="movements__value">${parseMovVal}</div>
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
  labelBalance.textContent = formatCurr(
    currentAccount.balance,
    currentAccount.locale,
    currentAccount.currency
  );
};
//
const displaySummary = function () {
  // Amount Input
  const amountInput = currentAccount.movements
    .filter(move => move > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(
    amountInput,
    currentAccount.locale,
    currentAccount.currency
  );
  // Amount Output
  const amountOutput = currentAccount.movements
    .filter(move => move < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = formatCurr(
    amountOutput,
    currentAccount.locale,
    currentAccount.currency
  );
  // Interest Amount
  const interest = currentAccount.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
};
function updateUI() {
  displayMovements();
  displayBalance();
  displaySummary();
}
//
const testUserLogin = function () {
  currentAccount = account1;
  containerApp.style.opacity = 100;
  updateUI();
};
// testUserLogin();

//
/// Event Listeners ///
// Login Button
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // Check account number
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // Check account pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    setDateLabel();
    clearInterval(timer);
    startloginTimer();
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
    currentAccount.movements.push(-Number(amount));
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(Number(amount));
    receiverAcc.movementsDates.push(new Date().toISOString());
    // UI changes
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferTo.blur();
    inputTransferAmount.blur();
    clearInterval(timer);
    startloginTimer();
    setTimeout(() => updateUI(), 1500);
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
    clearInterval(timer);
    startloginTimer();
    setTimeout(() => updateUI(), 2500);
  }
});
// Close Account Button
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const ind = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(ind, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
    containerApp.style.opacity = 0;
    clearInterval(timer);
    labelWelcome.textContent = 'Log in to get started';
  }
});
// Sort button
let alreadySorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  clearInterval(timer);
  startloginTimer();
  displayMovements(!alreadySorted);
  alreadySorted = !alreadySorted;
});
//
