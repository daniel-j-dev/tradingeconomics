import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./App.css";

function App() {
  // State -- useContext later?
  //// Store key as env later?
  const [key, setKey] = useState("onsere55uzm9df6:i8n07a6g4oow03i");

  // Functions
  useEffect(() => {
    //Get GDP QoQ % Change
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/GDP%20Growth%20Rate?c=${key}`
      )
      .then((res) => console.log(res.data));

    //Get Building Permits
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/Building%20Permits?c=${key}`
      )
      .then((res) => console.log(res.data));

    //Get PMI
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/Composite%20PMI?c=${key}`
      )
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div className="App">
      <Bar
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr"],
          datasets: [
            {
              data: [100, 200, 300, 400],
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
