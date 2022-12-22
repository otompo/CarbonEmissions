import React, { Fragment, useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

export default function Chart() {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    showDailyData();
    const interval = setInterval(() => {
      showDailyData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const showDailyData = async () => {
    try {
      const { data } = await axios.get(`/api/carbondata/dailyplan`);
      setDailyData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const lineChartData = {
    labels: dailyData.map((x) => [moment(x._id).format("LL")]),
    datasets: [
      {
        data: dailyData.map((x) => x.temperature),
        label: "Temperature",
        borderColor: "#FF6C00",
        backgroundColor: "#FF6C00 ",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: dailyData.map((x) => x.humidity),
        label: "Humidity",
        borderColor: "#b6a28e",
        backgroundColor: "#b6a28e ",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: dailyData.map((x) => x.airQuality),
        label: "Air Quality",
        borderColor: "#a6e7ff",
        backgroundColor: "#a6e7ff ",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: dailyData.map((x) => x.airPollution),
        label: "Air Pollution",
        borderColor: "#001758",
        backgroundColor: "#001758",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: dailyData.map((x) => x.altitude),
        label: "Altitude",
        borderColor: "#5697bb",
        backgroundColor: "#5697bb",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: dailyData.map((x) => x.pressure),
        label: "Pressure",
        borderColor: "#cbffd9",
        backgroundColor: "#cbffd9",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };
  return (
    <Fragment>
      <div className=" bg-gray-100 lg:py-20 relative lg:py-32">
        <section className="chart">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card my-3">
                  <div className="card-body">
                    {/* <pre>{JSON.stringify(dailyData, null, 2)}</pre> */}
                    <div className="card-title">
                      <h5 className="font-weight-bold text-center text-uppercase">
                        Environmental Data Chart For Tamale
                      </h5>
                    </div>

                    <Line
                      height={90}
                      options={{
                        legend: {
                          display: true,
                          position: "right",
                        },
                        title: {
                          display: true,
                          text: " Environmental Data For Tamale",
                        },
                      }}
                      data={lineChartData}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card my-3">
                  <div className="card-body">
                    <div className="card-title ">
                      <h5 className="font-weight-bold text-center text-uppercase">
                        Environmental Data Chart For Bolgatanga
                      </h5>
                    </div>

                    <Bar
                      height={90}
                      options={{
                        legend: {
                          display: true,
                          position: "right",
                        },
                        title: {
                          display: true,
                          text: " Environmental Data For Bolgatanga",
                        },
                      }}
                      data={lineChartData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
