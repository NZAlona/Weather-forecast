const refs = {
  form: document.querySelector('.js-form'),
  list: document.querySelector('.js-container'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const { field, days } = evt.currentTarget.elements;
  fetchWeather(field.value, days.value)
    .then(data => (refs.list.innerHTML = renderMarkup(data.forecast.forecastday)))
    .catch(err => console.log(err));
}

function fetchWeather(town, day) {
  const BASE_URL = 'https://api.weatherapi.com/v1';
  const API_KEY = '505b3a4f62df4484a68223506230512';

  return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${town}&days=${day}`).then(response => {
    if (!response.ok) {
      throw new Error('Bad request');
    }
    return response.json();
  });
}

function renderMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { text, icon },
        },
      }) =>
        `<li class="item">
        <img src="${icon}" alt="${text}" class="img">
         <p class="text"> Condition: ${text}</p>
          <p class="text"> Date: ${date}</p>
           <p class="text"> Avarage temperarure: ${avgtemp_c}</p>

      </li>`
    )
    .join(' ');
}

// fetch(
//   'http://api.weatherapi.com/v1/forecast.json?key=505b3a4f62df4484a68223506230512&q=Perth&days=2'
// ).then(response => console.log(response.json()));
