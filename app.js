import { getElement } from "./utils.js";

// get elements
const billInput = getElement(".bill-input");
const tipAmountBtn = document.querySelectorAll(".tip-amount-btn");
const customTipInput = getElement(".custom-tip");
const peopleInput = getElement(".people-input");
const tipAmount = getElement(".tip-amount");
const totalAmount = getElement(".total-amount");
const resetBtn = getElement(".reset-btn");
const billErrorDOM = getElement(".bill-error");
const peopleErrorDOM = getElement(".people-error");

let bill = 0;
let selectedTip;
let numOfPeople = 0;
let tipAmt = 0;
let totalAmt = 0;

// calculate tip and total amount
function calculateTotals() {
  tipAmt = (bill / numOfPeople) * selectedTip;
  totalAmt = bill / numOfPeople + tipAmt;
  tipAmount.innerHTML = `$${tipAmt.toFixed(2)}`;
  totalAmount.innerHTML = `$${totalAmt.toFixed(2)}`;
}
// get and store bill value
billInput.addEventListener("input", (e) => {
  billErrorDOM.classList.remove("show-error");
  const value = parseInt(e.target.value);
  if (!isNaN(value)) {
    bill = value;
    if (bill <= 0) {
      billErrorDOM.classList.add("show-error");
    }
  }
});
// get and store selected tip
tipAmountBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearActive();
    btn.classList.add("active-tip");
    const tipChoice = btn.dataset.tip;
    selectedTip = tipChoice;

    calculateTotals();
  });
});
// clear active tip
function clearActive() {
  tipAmountBtn.forEach((btn) => {
    btn.classList.remove("active-tip");
  });
}

// get and store custom tip
customTipInput.addEventListener("change", (e) => {
  const value = e.target.value / 100;
  if (!isNaN(value)) {
    selectedTip = value;

    calculateTotals();
  }
});
// get and store number of people
peopleInput.addEventListener("input", (e) => {
  peopleErrorDOM.classList.remove("show-error");
  const value = e.target.value;
  if (!isNaN(value)) {
    numOfPeople = value;
    if (numOfPeople <= 0) {
      peopleErrorDOM.classList.add("show-error");
    }
  }
});
// clear all fields
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";
  tipAmount.innerHTML = `$0.00`;
  totalAmount.innerHTML = `$0.00`;
  bill = 0;
  selectedTip = "";
  numOfPeople = 0;
  tipAmt = 0;
  totalAmt = 0;
  billErrorDOM.classList.remove("show-error");
  peopleErrorDOM.classList.remove("show-error");
  clearActive();
});
