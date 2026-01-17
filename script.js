const weatherApi = {
key: "ea2481871d2487f4fb120bb0bb40a933",
baseUrl: "https://api.openweathermap.org/data/2.5/weather",

};
const txtInput=document.getElementById("input-box");
const btnweather=document.getElementById("button");
const htemp=document.getElementById("temp");
const hcity=document.getElementById("city");
const divweatherbody=document.getElementById("weather-body");
const diverrormessage=document.getElementById("error-message");
const pdate=document.getElementById("date");
const pminmax=document.getElementById("min-max");
const pweather=document.getElementById("weather");
const phumidity=document.getElementById("humidity");
const pwind=document.getElementById("wind");
const ppresure=document.getElementById("presure");

clearWeatherrDisplay();
btnweather.addEventListener("click",async()=>{
  await getWeatherReport(txtInput.value);
});
txtInput.addEventListener("keypress",async(event)=>{
    if (event.key==="Enter") {
        await getWeatherReport(event.target.value);
    }
});
async function getWeatherReport(city) {
    try {
        const response=await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        if (!response.ok) {
            throw new Error("City not Found");
            
        }
        const data=await response.json();
        showWeatherReport(data);
        divweatherbody.classList.remove("d-none");
        diverrormessage.classList.add("d-none");

    } catch (error) {
        divweatherbody.classList.add("d-none");
        diverrormessage.classList.remove("d-none");
        clearWeatherrDisplay();
    }
}

function showWeatherReport(weather) {
     console.log(`${weather.weather[0].main}`);
    hcity.innerText=`${weather.name},${weather.sys.country}`
    pdate.innerText=formatedate(new Date());
    htemp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;
    pweather.innerText=`${weather.weather[0].main}`;
    pminmax.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;
    phumidity.innerText=`${weather.main.humidity}`
    pwind.innerText=`${weather.wind.speed} Kmph`;
    ppresure.innerText=`${weather.main.pressure} hPa`
    updatebg(weather.weather[0].main);
}
function formatedate(date) {
    const Obj={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",

    }
    return date.toLocaleDateString(undefined,Obj)
}
function updatebg(wtype) {
   
    const WeatherBackground={
        clear:"media/images/clear.jpg",
        Clouds:"media/images/weather.jpg",
        Haze:"media/images/weather.jpg",
        Rain:"media/images/rain.jpg",
        Thunderstorm:"media/images/rainy.jpg",
        Sunny:"media/images/sunny.jpg"
        ,Snow:"media/images/winter.jpg"
    };
    document.body.style.backgroundImage=`url(${WeatherBackground[wtype]||"media/images/sunny.jpg"})`;
}
function clearWeatherrDisplay() {
    hcity.innerText="";
    pdate.innerText="";
    htemp.innerText="";
    pminmax.innerText="";
    pweather.innerText="";
    phumidity.innerText="";
    pwind.innerText="";
    ppresure.innerText=""; 

}