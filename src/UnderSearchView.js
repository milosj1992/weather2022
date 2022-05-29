import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const UnderSearchView = ({lat, lon}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => response.json()).then(response => setData(response)).catch(err => {console.log(err)});
    }, [lat, lon])
    return (
        <div className="view-temp-wrapper">
            {data != undefined && data.main != undefined ?
                <div className="temp-inmap-wrapper">
                    <div className="left-side-undersearch">
                        <a><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                style={{width: "50px", height: "50px"}}/></a>
                    </div>
                    <div className="right-side-undersearch">
                        <div className="header-undersearch" style={{display: "flex"}}>
                            <div className="country-n-city">
                                <Link to={`/city`} state={{lat: data.coord.lat, lon: data.coord.lon}}>
                                    {data.name},{data.sys.country}</Link>
                            </div>
                            <div>
                                <a><img
                                    src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}/></a>
                            </div>
                            <div className="weather-header"><p>{data.weather[0].description}</p></div>
                        </div>
                        <div className="middle-undersearch" style={{display: "flex"}}>
                            <div><p><span className="span-cels">{data.main.temp}°С</span> temperature
                                from {data.main.temp_min} to {data.main.temp_max}°С wind {data.wind.speed} m/s,
                                clouds {data.clouds.all} %, {data.main.pressure} hpa
                            </p></div>
                        </div>
                        <div className="footer-undersearch" style={{display: "flex"}}>
                            <p>Geo cords </p>
                            <Link to={`/city`} state={{lat: data.coord.lat, lon: data.coord.lon}}>
                                [{data.coord.lon}{data.coord.lat}]
                            </Link>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}
