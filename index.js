const refs = {
  form: document.querySelector('.js-form'),
  list: document.querySelector('.js-container'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  //   const { field, days } = evt.currentTarget.elements;
  //   fetchWeather(field.value, days.value);
  fetchWeather(evt.currentTarget.elements.field.value)
    .then(data => (refs.list.innerHTML = renderMarkup(data.forecast.forecastday)))
    .catch(err => console.log(err))
    .finally(() => refs.form.reset());
}

function fetchWeather(town) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = '505b3a4f62df4484a68223506230512';

  return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${town}`).then(response => {
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
