import React, {useState} from 'react';
import OutputList from '../OutputList/OutputList';



const InputForm =  (props) => {

    let [weatherObj, setWeatherObj] = useState({});
    let [city, setCity] = useState("");
    let [country, setCountry] = useState("");
    let [unit, setUnit] = useState("imperial");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(true);


    function getWeatherObject(event){
        
        event.preventDefault();
        //submitted without entering a city, set error to true, then the Conditions component
        //will render a reminder message.
        if (city === "") {
            setError(true);
            setCountry("");
            return;
        }
  
        setError(false);
        //set the loading status to true at the beginning of the fetch process.
        setLoading(true);
        //init the weather obj to a empty object each time the fetch beginning.
        setWeatherObj({});
  
        //compose the uri encoded string of "city"+","+"country", then pass it into the format string
        //as the argument for the fetch().
        let encodedCityText = encodeURIComponent(city + "," + country);
        console.log(weatherObj);
  
        fetch(
            `https://community-open-weather-map.p.rapidapi.com/weather?q=${encodedCityText}&lat=0&lon=0&id=2172797&lang=en&units=${unit}`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": process.env.REACT_APP_WEATHER_API_KEY,
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                }
            }
        )
        .then((response) => {
            //any response other than 200 indicates failed.
            if (!response.ok) {
                throw new Error("failed to fetch weather.");  
            } else {
                //check for the response type
                console.log(response.type);
                setError(false);
                //extract the body data from the response and return a promise.
                return response.json();
            }
        })
        .then((data) => {
            //put the response json data to a state.
            setWeatherObj(data);
            //loading completed.
            setLoading(false);
            console.log(weatherObj);
        })
        .catch((err) => {
            //if any error caught, setError to true, and set loading to false.
            console.error(err);
            setError(true);
            setLoading(false);
        });

    }


        return (
            <div className="form-container">
                <form className="input-form" onSubmit={getWeatherObject}>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder="City" 
                        value={city}
                        onChange={(e) =>setCity(e.target.value.toUpperCase())}
                    />
                    <input 
                        type="text" 
                        id="country" 
                        placeholder="Country"
                        value={country} 
                        onChange={(e) =>setCountry(e.target.value.toUpperCase())}
                    />
                    <input 
                        type="submit" 
                        id="submit-button" 
                        value="Get Weather" 
                    />
                </form>
                <OutputList error={error} loading={loading} responseObj={weatherObj}/>
            </div>
            
        )

}

export default InputForm;