import { useState, useEffect } from "react";

const useConfig = (): any => {
  const [config, setConfig] = useState(null);
  useEffect(() => {
    fetch('http://212.39.67.73:88/api/config', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then((response) => {
      response.json().then((data) => setConfig(data.data.attributes.json));
    });
  }, []);
  return config;
}

export default useConfig;