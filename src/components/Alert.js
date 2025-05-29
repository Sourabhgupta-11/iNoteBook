import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

const Alert = () => {
  const { alert } = useContext(alertContext);

  return (
    alert && (
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
