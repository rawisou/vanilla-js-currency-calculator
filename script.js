//Variables
const currencyOne = document.getElementById('currency-one')
const currencyTwo = document.getElementById('currency-two')

const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')

const displayRate = document.getElementById('rate')
const swapCurrencyButton = document.getElementById('btn')


//Event listeners
currencyOne.addEventListener('change', calculateRate)
currencyTwo.addEventListener('change', calculateRate)
amountOne.addEventListener('input', calculateRate)
amountTwo.addEventListener('input', calculateRate)


//main function
function calculateRate() {
    const fromCurrency = currencyOne.value
    const toCurrency = currencyTwo.value

    let API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[toCurrency]
            displayRate.innerHTML = `
             1 <span style="color:green;"> ${fromCurrency}</span> = ${rate} <span style="color:blue;"> ${toCurrency}</span>
            `
            amountTwo.value=(amountOne.value*rate).toFixed(2)

        })
}

//swap currency

swapCurrencyButton.addEventListener('click', () => {
    const store = currencyOne.value 
    //store the from currency as the currencyOne will store the currencyTwo
    currencyOne.value = currencyTwo.value
    currencyTwo.value = store
    //call the calculateRate function for the currency calculator to work
    calculateRate()
})

calculateRate()