import React from 'react';

function OutputList(props) {

  if(props.error || props.loading){
    return (
      <div className="output-list">
        <div className="output-item">
          <p className="output-list-label" >Please enter a city.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="output-list">
      <div className="output-item">
        <p className="output-list-label">Location:</p>
        <p className="output-list-content">{props.responseObj.name + ', ' + props.responseObj.sys.country}</p> 
      </div>
      <div className="output-item">
        <p className="output-list-label">Temperature:</p>
        <p className="output-list-content">{Math.round(props.responseObj.main.temp) + ' F'}</p>
      </div>
      <div className="output-item">
        <p className="output-list-label" htmlFor="humidity">Humidity:</p>
        <p className="output-list-content">{props.responseObj.main.humidity + ' %'}</p>
      </div>
      <div className="output-item">
        <p className="output-list-label">Conditions:</p>
        <p className="output-list-content">{props.responseObj.weather[0].description}</p>
      </div>            
    </div>   
  );
}

export default OutputList;