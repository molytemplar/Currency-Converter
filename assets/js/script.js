// Define constants for elements
const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
convertButton = document.querySelector("form button"),
fromCurrencyIcon =  document.querySelector("#from-currency-icon"),
toCurrencyIcon =  document.querySelector("#to-currency-icon"),
outputAmount = document.querySelector("form #output-amount"),
inputAmount = document.querySelector("form #input-amount"),
exchangeIcon = document.querySelector("form #sync-alt-icon");


// Initialize currency dropdowns
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "BRL" ? "selected" : "" : currency_code == "USD" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    loadFlag(fromCurrency);
    loadFlag(toCurrency)
    fromCurrencyIcon.innerText = fromCurrency.value;
    toCurrencyIcon.innerText = toCurrency.value;
    
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    }); 
}

// Event listeners for currency dropdown changes
fromCurrency.addEventListener("change", handleCurrencyChange)
toCurrency.addEventListener("change", handleCurrencyChange)

// Event listener for exchange rate button click
convertButton.addEventListener("click", handleExchangeRate);

// Event listener for currency exchange icon click
exchangeIcon.addEventListener("click", handleCurrencySwap)

// Function to load currency flag
function handleCurrencyChange(e) {
    const selectedCurrency = e.target.value; 
    loadFlag(e.target); 
    if (e.target === fromCurrency) {
      fromCurrencyIcon.innerText = selectedCurrency; 
      outputAmount.value = ""; 
    } else if (e.target === toCurrency) {
      toCurrencyIcon.innerText = selectedCurrency; 
      outputAmount.value = "";
    }
}

// Function to load currency flag
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

// Function to handle currency swap
function handleCurrencySwap() {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency); 
    fromCurrencyIcon.innerText = fromCurrency.value; 
    toCurrencyIcon.innerText = toCurrency.value; 
    outputAmount.value = ""; 
  }

// Function to handle exchange rate retrieval
function handleExchangeRate(e){
    e.preventDefault;
    const amount = inputAmount
    const exchangeRateTxt = outputAmount
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Calculando valor...";
    let url = `https://v6.exchangerate-api.com/v6/9b8eedef3b2615ea2798b378/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.value = totalExRate;
    }).catch(() =>{
        exchangeRateTxt.value = "Algo deu errado";
    });
}