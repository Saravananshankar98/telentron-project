import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [state, setState] = React.useState([]);

  const fetchApi = () => {
    axios
      .get("http://localhost:4000/state/list")
      .then((res) => setState(res.data));
  };
  useEffect(() => {
    fetchApi();
  }, []);
  console.log("state", state);
  return (
    <div className="App">
      {state && (
        <select>
          <option value="">Select State</option>
          {state.map((x, index) => (
            <option key={index} value={x.state_code}>
              {x.state_name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default App;
