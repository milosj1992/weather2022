import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
const timeConverter = (timestamp) => {
    var i = 0;
    var data = {list: [{dt: timestamp}]};
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayNum = new Date(data.list[i].dt * 1000).getDay();
    var result = days[dayNum];
    return result;
}
export const Nextdays = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    console.log(process.env);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.state.lat}&lon=${location.state.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => response.json()).then(response => setData(response));

    }, [])
    return (
        <div style={{display: "inline"}} className="next-day-wrapper">
            <Link to={"/"}>Home</Link>
            {data != undefined && data.daily ?
                <div className="next-map-wrapper">
                    {data.daily.map((day) => {
                        return (
                            <div key={day.dt} className="next-single">
                                <div className="header-city"><p>{timeConverter(day.dt)}</p></div>
                                <div className="middle-city"><a><img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/></a>
                                </div>
                                <div className="footer-city"><p className="light-cels">{day.temp.min}°</p> <p
                                    className="bold-cels">{day.temp.max}°</p></div>
                                <div><br/></div>
                            </div>
                        )
                    })}
                </div>
                : <div>{null}</div>}
        </div>
    )
}
