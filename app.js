// ===================== app.js =====================

// Elements
const navItems = document.querySelectorAll(".nav-item");
const mainTitle = document.getElementById("mainTitle");
const mainSub = document.getElementById("mainSub");
const contentSection = document.getElementById("content");
const calcBtn = document.getElementById("calcBtn");
const dynOut = document.getElementById("dynOut");
const dynHistory = document.getElementById("dynHistory");
const resetAll = document.getElementById("resetAll");

let currentInputs = null;
let history = [];

// Helper functions for algorithms
function sumPolygon(n) {
  return (n - 2) * 180;
}
function basketballPoints(twoPointers, threePointers) {
  return twoPointers * 2 + threePointers * 3;
}
function calcAge(age) {
  return age * 365;
}
function remainder(x, y) {
  return x % y;
}
function cube(n) {
  return n ** 3;
}
function lessThan100(x, y) {
  return x + y < 100;
}
function countTrue(arr) {
  return arr.filter((v) => v === true).length;
}
function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

// Generate dynamic input fields
function createInputs(type) {
  contentSection.innerHTML = "";
  const card = document.createElement("div");
  card.classList.add("card");
  const row = document.createElement("div");
  row.classList.add("row");

  let inputA = document.createElement("input");
  inputA.id = "numA";
  inputA.type = "text";

  let inputB = document.createElement("input");
  inputB.id = "numB";
  inputB.type = "text";

  switch (type) {
    case "polygon":
    case "age":
    case "cube":
      inputA.placeholder = "Enter number";
      row.appendChild(inputA);
      break;
    case "countTrue":
    case "minMax":
      inputA.placeholder = "Enter comma separated values";
      row.appendChild(inputA);
      break;
    default:
      inputA.placeholder = "Number A";
      inputB.placeholder = "Number B";
      row.appendChild(inputA);
      row.appendChild(inputB);
  }

  const calcButton = document.createElement("button");
  calcButton.textContent = "Calculate";
  calcButton.classList.add("btn");
  row.appendChild(calcButton);

  const output = document.createElement("div");
  output.id = "dynOut";
  output.classList.add("output");
  output.textContent = "Result will appear here";

  const historyDiv = document.createElement("div");
  historyDiv.id = "dynHistory";
  historyDiv.classList.add("history");

  card.appendChild(row);
  card.appendChild(output);
  card.appendChild(historyDiv);
  contentSection.appendChild(card);

  currentInputs = { inputA, inputB, output, historyDiv, type };

  calcButton.addEventListener("click", () => {
    calculateDynamic();
  });
}

// Dynamic calculation based on input type
function calculateDynamic() {
  const { inputA, inputB, output, historyDiv, type } = currentInputs;
  const a = inputA.value;
  const b = inputB ? inputB.value : null;

  let result;
  switch (type) {
    case "polygon":
      result = sumPolygon(parseFloat(a));
      break;
    case "basketball":
      result = basketballPoints(parseFloat(a), parseFloat(b));
      break;
    case "age":
      result = calcAge(parseFloat(a));
      break;
    case "remainder":
      result = remainder(parseFloat(a), parseFloat(b));
      break;
    case "cube":
      result = cube(parseFloat(a));
      break;
    case "lessThan100":
      result = lessThan100(parseFloat(a), parseFloat(b));
      break;
    case "countTrue":
      result = countTrue(a.split(",").map((v) => v.trim() === "true"));
      break;
    case "minMax":
      result = minMax(a.split(",").map(Number));
      break;
  }

  output.textContent = `Result: ${result}`;
  const time = new Date().toLocaleTimeString();
  history.push(`[${time}] ${type} => ${result}`);
  historyDiv.innerHTML = history.map((h) => `<div>${h}</div>`).join("");
}

// Reset inputs and output
resetAll.addEventListener("click", () => {
  if (currentInputs) {
    currentInputs.inputA.value = "";
    if (currentInputs.inputB) currentInputs.inputB.value = "";
    currentInputs.output.textContent = "Result will appear here";
    currentInputs.historyDiv.innerHTML = "";
  }
  history = [];
});

// Sidebar navigation to dynamically create inputs
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    const target = item.dataset.target;
    mainTitle.textContent = item.textContent;

    switch (target) {
      case "polygon":
        mainSub.textContent = "Calculate sum of interior angles";
        break;
      case "points":
        mainSub.textContent = "Basketball points from 2 & 3 pointers";
        break;
      case "age":
        mainSub.textContent = "Convert age to days";
        break;
      case "remainder":
        mainSub.textContent = "Calculate remainder of division";
        break;
      case "cube":
        mainSub.textContent = "Cube of a number";
        break;
      case "lessthan":
        mainSub.textContent = "Check if sum < 100";
        break;
      case "counttrue":
        mainSub.textContent = "Count true values in array";
        break;
      case "minmax":
        mainSub.textContent = "Find min & max in array";
        break;
    }

    createInputs(target);
  });
});
