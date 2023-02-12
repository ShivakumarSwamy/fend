/* Global Variables */
baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = '&appid=e69cb8bccc84bf78132076343903816a&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector("#generate").addEventListener("click", performAction);

function performAction() {
  getWeatherDataBasedOnZipCode()
    .then(data => postData("/newData", { temperature: data.main.temp,
                                         date: newDate,
                                         content: document.querySelector("#feelings").value
                                       })
     )
    .then(updateUI);
}

async function getWeatherDataBasedOnZipCode() {
  const zipCode = document.querySelector("#zip").value;

  try {
    const response = await fetch(`${baseURL}?zip=${zipCode},in${apiKey}`);
    return await response.json();
  } catch(error) {
    console.error(`Unable to get weather data for zipCode=${zipCode}, Reason:`, error);
    throw new Error();
  }
}

async function postData(url, data) {
  try {
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
   } catch(error) {
      console.error("Unable to save data, Reason:", error);
      throw new Error();
   }
}

async function updateUI() {
  let allData = {};

  try {
    const response = await fetch("/all");
    allData = await response.json();
  } catch(error) {
      console.error("Unable to fetch data, Reason:", error);
      throw new Error();
  }

  document.querySelector("#date").innerHTML = allData.date;
  document.querySelector("#temp").innerHTML = allData.temperature + " &degC";
  document.querySelector("#content").innerHTML = allData.content;
}