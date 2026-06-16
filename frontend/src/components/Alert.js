import React, { useContext, useEffect, useState } from "react";
import alertContext from "../context/alert/alertContext";
import './Alert.css';

const ICONS = {
  success: '✓',
  danger:  '✕',
  warning: '⚠',
  info:    'ℹ',
};

const Alert = () => {
  const { alert } = useContext(alertContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3200);
      return () => clearTimeout(t);
    }
  }, [alert]);

  if (!alert || !visible) return null;

  return (
    <div className={`nb-alert nb-alert-${alert.type}`}>
      <span className="nb-alert-icon">{ICONS[alert.type] || 'ℹ'}</span>
      <span className="nb-alert-msg">{alert.msg}</span>
    </div>
  );
};

export default Alert;
