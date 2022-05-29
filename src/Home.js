import './App.css';
import {useState} from "react";
import {UnderSearchView} from "./UnderSearchView";

export const Home = () => {
    const [listCity, setListCity] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [displayw, setDisplayW] = useState(false);
    const updateValue = (e) => {
        setSearchCity(e.target.value);
    }
    const submitUrl = (url) => {
        submitCity(url);
    }
    const submitCity = async (url) => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${url}&limit=5&&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json()).then(response => setListCity(response));
        setDisplayW(true);
    };
    return (
        <div className="App">
            <div className="SearchField">
                <input type='text' value={searchCity} onChange={(e) => updateValue(e)}/>
                <button onClick={(e) => submitUrl(searchCity)}>Search</button>
            </div>
            <div className="Home-wrapper">
                {listCity && listCity.length > 0 && displayw ?
                    listCity.map((item) => {
                        return (<UnderSearchView key={item.lat+item.lon} lat={item.lat} lon={item.lon}/>)
                    }) : null}
            </div>
        </div>
    );
}

