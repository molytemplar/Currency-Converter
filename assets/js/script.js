const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "BRL" ? "selected" : "" : currency_code == "USD" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    loadFlag(fromCurrency);
    loadFlag(toCurrency)
    document.querySelector("#from-currency-icon").innerText = fromCurrency.value;
    document.querySelector("#to-currency-icon").innerText = toCurrency.value;
    
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    }); 
}

fromCurrency.addEventListener("change", e=>{
    document.querySelector("#from-currency-icon").innerText = fromCurrency.value;
    document.querySelector("form #output-amount").value = "";
})

toCurrency.addEventListener("change", e=>{
    document.querySelector("#to-currency-icon").innerText = toCurrency.value;
    document.querySelector("form #output-amount").value = "";
})

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form #sync-alt-icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    document.querySelector("#from-currency-icon").innerText = fromCurrency.value;
    document.querySelector("#to-currency-icon").innerText = toCurrency.value;
    document.querySelector("form #output-amount").value = "";
})

function getExchangeRate(){
    const amount = document.querySelector("form #input-amount");
    const exchangeRateTxt = document.querySelector("form #output-amount");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/9b8eedef3b2615ea2798b378/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.value = totalExRate;
    }).catch(() =>{
        exchangeRateTxt.value = "Something went wrong";
    });
}