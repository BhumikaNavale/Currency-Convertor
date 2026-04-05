const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Fill dropdowns
for (let select of dropdowns) {
  for (let curr in countryList) {
    let option = document.createElement("option");
    option.value = curr;
    option.innerText = curr;

    if (select.name === "from" && curr === "USD") option.selected = true;
    if (select.name === "to" && curr === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", () => {
    updateFlag(select);
    updateExchangeRate();
  });
}

// Update flag
function updateFlag(element) {
  let code = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${code}/flat/64.png`;
}

// Main function
async function updateExchangeRate() {
  let amount = document.querySelector("input");
  let amtVal = amount.value || 1;

  try {
    let res = await fetch(`${BASE_URL}/${fromCurr.value}`);
    let data = await res.json();

    let rate = data.rates[toCurr.value];

    let final = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${final.toFixed(2)} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Error fetching data ❌";
    console.log(err);
  }
}

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Load default
window.addEventListener("load", updateExchangeRate);