import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  // State -- useContext later?
  // // Store key as env later w/ dotenv?
  const [key, setKey] = useState("onsere55uzm9df6:i8n07a6g4oow03i");

  const seriesFormat = {
    time: [],
    vlaues: [],
  };

  const [gdp, setGDP] = useState(seriesFormat);
  const [bp, setBP] = useState(seriesFormat);
  const [pmi, setPMI] = useState(seriesFormat);

  // Functions
  useEffect(() => {
    //Get GDP QoQ % Change
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/GDP%20Growth%20Rate?c=${key}`
      )
      .then((res) => {
        //Format data
        const fData = formatData(res.data);

        //Add to state
        setGDP({
          time: fData.time,
          values: fData.values,
        });
      });

    //Get Building Permits
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/Building%20Permits?c=${key}`
      )
      .then((res) => {
        //Format data
        const fData = formatData(res.data);

        //Add to state
        setBP({
          time: fData.time,
          values: fData.values,
        });
      });

    //Get PMI
    axios
      .get(
        `https://api.tradingeconomics.com/historical/country/new%20zealand/indicator/Composite%20PMI?c=${key}`
      )
      .then((res) => {
        //Format data
        const fData = formatData(res.data);

        //Add to state
        setPMI({
          time: fData.time,
          values: fData.values,
        });
      });
  }, []);

  const formatData = (data) => {
    const timeArr = [];
    const valArr = [];

    for (const obj of data) {
      //If "Free accounts have access to..." entry appears, skip over it.
      if (obj.Category === "") continue;

      timeArr.push(obj.DateTime);
      valArr.push(obj.Value);
    }
    return {
      time: timeArr,
      values: valArr,
    };
  };

  return (
    <div className="App">
      <Line
        data={{
          labels: gdp.time,
          datasets: [
            {
              data: gdp.values,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "GDP QoQ % Change",
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
              },
            ],
          },
        }}
      />

      <Line
        data={{
          labels: bp.time,
          datasets: [
            {
              data: bp.values,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Building Permits",
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
              },
            ],
          },
        }}
      />

      <Line
        data={{
          labels: pmi.time,
          datasets: [
            {
              data: pmi.values,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Composite PMI",
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default App;
