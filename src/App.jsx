
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import WeatherContainer from './Components/WeatherContainer';

function App() {

  const [weather, setweather] = useState(null);
  const [loading, setLoading] = useState(true);

  const sucess = (pos) => {

    const {
      coords: {latitude, longitude},
    } = pos;
    
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=02a9d4eaae34cf2e680e1559c312edbd&lang=sp&units=metric`)
    .then(({ data }) => setweather(data))
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));

  };


  useEffect(() => {
    const timeoutDuration = 3000;
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeoutDuration));
    
    navigator.geolocation.getCurrentPosition(sucess);

    timeoutPromise.then(() => setLoading(false));

  }, [])

  const bgImages = {
    "01d": "bg-[url(/public/img-d.jpg)]",
    "01n": "bg-[url(/public/img-nocheDespejada.jpg)]",
    "02d": "bg-[url(/public/img-pocasNubes.jpg)]",
    "02n": "bg-[url(/public/img-nochePocasNubes.jpg)]",
    "03d": "bg-[url(/public/img-diaNubesDispersas.jpg)]",
    "03n": "bg-[url(/public/img-noche-NubesDispersas.jpg)]",
    "04d": "bg-[url(/public/nubesCortadasDia.jpg)]",
    "04n": "bg-[url(/public/img-nuboso.jpg)]",
    "09d": "bg-[url(/public/img-Aguacero.jpg)]",
    "09n": "bg-[url(/public/img-lluvia)]",
    "10d": "bg-[url(/public/img-Aguacero.jpg)]",
    "10n": "bg-[url(/public/img-nocheAguacero.jpg)]",
    "11d": "bg-[url(https://grupovierci.brightspotcdn.com/dims4/default/28452a0/2147483647/strip/true/crop/1474x830+0+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-grupo-vierci.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fadjuntos%2F161%2Fimagenes%2F008%2F023%2F0008023958.jpeg)",
    "11n": "bg-[url(https://p4.wallpaperbetter.com/wallpaper/877/1000/896/storm-thunder-storm-thunderbolt-nature-landscape-hd-wallpaper-preview.jpg)]",
    "13d": "bg-[url(https://img.freepik.com/foto-gratis/hermoso-paisaje-nevado-montanas_181624-26450.jpg)]",
    "13n": "bg-[url(/public/img-nieve.jpg)]",
    "50d": "bg-[url(https://p1.pxfuel.com/preview/195/203/732/light-mist-fog-forest-mystery-haze.jpg)]",
    "50n": "bg-[url(niebla.jpg)]",
    // Imagen predeterminada si no coincide con ninguna condición
    "defaultIcon": "url(https://i.pinimg.com/originals/3d/9d/38/3d9d38d12fd98092d3c9b7b4d2832b5a.jpg)", 
  };
  
  const iconClass = weather?.weather[0]?.icon || "defaultIcon";
  const mainClasses = `flex justify-center items-center h-screen bg-white text-white bg-cover ${bgImages[iconClass]} bg-no-repeat bg-center`;
  
  return (
    <main className={mainClasses}>
      {loading ? (
        <div className='loading'>
          <img src='/public/reloj-arena-color.gif' alt='loading' className='loading-gif bg-none w-20 h-20' />
        </div>
      ) : (
        <>
          {weather ? (
            <WeatherContainer weather={weather} setweather={setweather} />
          ) : (
            <span>Cargando...</span>
          )}
          
        </>
      )}
  </main>
  )
}

export default App
