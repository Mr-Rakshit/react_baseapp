import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./User.css"

function Userdata() {
  //fetching userdata
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    async function fetchData() {
      fetch("/userdata", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("yaha hua");
          console.log(json);
          setUserdata(json);
        });
      console.log(userdata);
    }

    fetchData();
  }, []);

  const {
    sevenmarks,
    eightmarks,
    ninemarks,
    tenmarks,
    elevenmarks,
    twelvemarks,
    collegepercent,
  } = userdata;

  const dataarr = [
    sevenmarks,
    eightmarks,
    ninemarks,
    tenmarks,
    elevenmarks,
    twelvemarks,
    collegepercent,
  ];

  //data for chart
  const data = {
    labels: [
      "seventh",
      "eighth",
      "nineth",
      "tenth",
      "eleventh",
      "twelveth",
      "College",
    ],
    datasets: [
      {
        label: "Marks",
        data: dataarr,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="User">
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default Userdata;
