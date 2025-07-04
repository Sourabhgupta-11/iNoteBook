import React, { useState } from "react";
import alertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
