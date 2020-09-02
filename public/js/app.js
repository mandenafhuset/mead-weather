const resultsDiv = document.querySelector('#results');

const getForecast = (address) => {
    resultsDiv.innerText = 'Loading...'

    fetch('/weather?address=' + address)
    .then((res) => {
    return res.json();
    })
    .then((data) => {
        if (data.error) {
            return resultsDiv.innerText = data.error;
        }

        resultsDiv.innerText = `The weather in ${data.location} is ${data.forecast}`;
    })
    .catch((err) => {
        console.log(err);
    })
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    getForecast(search.value);

    search.value = '';
})