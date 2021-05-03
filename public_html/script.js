// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const body = document.querySelector('body');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const town = document.getElementById('town');
const btnWether = document.querySelector('.btnWether');

num = Math.round(Math.random(20) * 19) + 1;
shift = 0;

function showTime() {
  let today = new Date(),
    weekDay = today.getDay(),
    day = today.getDate(),
    month = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  time.innerHTML = `${getWeekDay(weekDay)}<span>, </span>${day}<span> </span>${getMonth(month)}<span> </span>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if ((min === 0) && (sec === 0)) changeBackground();
  
  setTimeout(showTime, 1000);
}

function changeBackground() {
    shift ++;
    num ++;
    if (num === 21) num = 1;
    
  let today = new Date();
    hour = today.getHours();
    hour += shift;
    hour %= 24;
    s = "url(./images/";
    a = "";
    if (num < 10) a = "0";
  if (hour < 6) {
      s += "night/" + a + num + ".jpg)";
    document.body.style.color = 'white';
    document.querySelector(".quoteBlock").style.color = 'black';
  } else if (hour < 12) {
      s += "morning/" + a + num + ".jpg)";
    document.body.style.color = 'black';
  } else if (hour < 18) {
      s += "day/" + a + num + ".jpg)";
    document.body.style.color = 'black';
  } else {
      s += "evening/" + a + num + ".jpg)";
    document.body.style.color = 'black';
  }
  
    body.style.backgroundImage = s;
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getWeekDay(n) {
  switch (parseInt(n, 10))
  {
      case 1: return "Понедельник";
      case 2: return "Вторник";
      case 3: return "Среда";
      case 4: return "Четверг";
      case 5: return "Пятница";
      case 6: return "Суббота";
      case 0: return "Воскресенье";
  }
}

function getMonth(n) {
  switch (parseInt(n, 10))
  {
      case 0: return "января";
      case 1: return "февраля";
      case 2: return "марта";
      case 3: return "апреля";
      case 4: return "мая";
      case 5: return "июня";
      case 6: return "июля";
      case 7: return "августа";
      case 8: return "сентября";
      case 9: return "октября";
      case 10: return "ноября";
      case 11: return "декабря";
  }
}

function setBgGreet() {
    shift = 0;
    num += 1;
    num %= 24;
    
  let today = new Date(),
    hour = today.getHours();
    s = "url(./images/";
    a = "";
    if (num < 10) a = "0";
  if (hour < 6) {
      s += "night/" + a + num + ".jpg)";
    greeting.textContent = 'Доброй ночи, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
      s += "morning/" + a + num + ".jpg)";
    greeting.textContent = 'Доброе утро, ';
    document.body.style.color = 'black';
  } else if (hour < 18) {
      s += "day/" + a + num + ".jpg)";
    greeting.textContent = 'Добрый день, ';
    document.body.style.color = 'black';
  } else {
      s += "evening/" + a + num + ".jpg)";
    greeting.textContent = 'Добрый вечер, ';
    document.body.style.color = 'black';
  }
  
  body.style.backgroundImage = s;
}

function isEmpty(s)
{
    for (i = 0; i < s.length; i++)
        if  ((s.charCodeAt(i) !== 0x0020) && 
             (s.charCodeAt(i) !== 0x0009) &&
             (s.charCodeAt(i) !== 0x000B) &&
             (s.charCodeAt(i) !== 0x00A0) &&
             (s.charCodeAt(i) !== 0x000A) &&
             (s.charCodeAt(i) !== 0x000C)) return false;
    return true;
}

function clearName(e) {
  e.target.innerText = "";
}

function clearFocus(e) {
  e.target.innerText = "";
}

function getName() {
  if ((localStorage.getItem('name') === null) || (isEmpty(localStorage.getItem('name')))) {
    name.textContent = '[Enter Name]';
    localStorage.setItem('focus', '[Enter Name]');
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      if (isEmpty(e.target.innerText)) name.textContent = localStorage.getItem('name'); else
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else
  {
      if (isEmpty(e.target.innerText)) name.textContent = localStorage.getItem('name'); else
      localStorage.setItem('name', e.target.innerText);
      name.blur();
  }
}

function getFocus() {
  if ((localStorage.getItem('focus') === null) || (isEmpty(localStorage.getItem('focus')))) {
    focus.textContent = '[Enter Focus]';
    localStorage.setItem('focus', '[Enter Focus]');
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      if (isEmpty(e.target.innerText)) focus.textContent = localStorage.getItem('focus'); else
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else
  {
      if (isEmpty(e.target.innerText)) focus.textContent = localStorage.getItem('focus'); else
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
  }
}

async function getQuote() {  
  const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru&timestamp='+new Date();
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

name.addEventListener('focus', clearName);
focus.addEventListener('focus', clearFocus);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

showTime();
setBgGreet();
getName();
getFocus();

                                                                      //1c8ad131b90fb72d557d6164628cbc08
//https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=1c8ad131b90fb72d557d6164628cbc08&units=metric






async function getWeather() {
   
   try
   {
  url = 'https://api.openweathermap.org/data/2.5/weather?q='+town.value+'&lang=ru&appid=1c8ad131b90fb72d557d6164628cbc08&units=metric';
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = 'Температура: ' + `${data.main.temp}°C`;
  wind.textContent = 'Скорость ветра: ' + `${data.wind.speed}м/с`;
  humidity.textContent = 'Влажность: ' + `${data.main.humidity}%`;
   }
   catch(e)
   {
       weatherIcon.classList.add(`owf-0`);
       temperature.textContent = "Нет данных о городе";
       wind.textContent = '';
       humidity.textContent = '';
   }
}

function clearTown ()
{
    town.value = "";
}

function setTown ()
{
  if (isEmpty(town.value)) {
    town.value = localStorage.getItem('town');
  } else {
    localStorage.setItem('town', town.value);
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
btnWether.addEventListener('click', getWeather);
town.addEventListener('focus', clearTown);
town.addEventListener('blur', setTown);
setTown();