import React from "react";
import Styles from "./Conditions.module.css";

const conditions = (props) => {
  return (
    <div className={Styles.Wrapper}>
      {props.error && (
        <small className={Styles.Small}>Please enter a valid city.</small>
      )}

      {props.loading && <div className={Styles.Loader} />}

      {props.responseObj.cod === 200 ? (
        <div>
          <p>
            <strong>{props.responseObj.name}</strong>
          </p>
          <p>
            It is currently {Math.round(props.responseObj.main.temp)} degrees
            out with {props.responseObj.weather[0].description}.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default conditions;
