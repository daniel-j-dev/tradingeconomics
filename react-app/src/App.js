import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  // State -- useContext later?
  // // Store key as env later w/ dotenv?
  const [key, setKey] = useState("onsere55uzm9df6:i8n07a6g4oow03i");
  const [teData, setTeData] = useState({
    gdp: {
      time: [],
      values: [],
    },
    pmi: {
      time: [],
      values: [],
    },
    bp: {
      time: [],
      values: [],
    },
  });

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
        setTeData({
          ...teData,
          gdp: {
            time: fData.time,
            values: fData.values,
          },
        });
      });

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

  const formatData = (data) => {
    const timeArr = [];
    const valArr = [];

    for (const obj of data) {
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
          labels: teData.gdp.time,
          datasets: [
            {
              data: teData.gdp.values,
            },
          ],
        }}
        options={{
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
