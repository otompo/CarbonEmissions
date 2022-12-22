import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import testLaData from "../data/tesla-sites.json";
import corbonData from "../data/corbonData.json";

export default function Map() {
  const [position, setPossition] = useState([]);
  useEffect(() => {
    setPossition(corbonData);
  }, []);

  const filteredStations = position.filter(
    (tesla) => tesla.address.country === "Ghana"
  );

  return (
    <Fragment>
      <div className=" bg-gray-100 lg:py-20 relative lg:py-32 ">
        <section className="services ">
          <div className="card my-5">
            <div className="card-body">
              <MapContainer
                center={[7.9465, -1.0232]}
                zoom={7}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredStations.map((tsla) => (
                  <Marker
                    position={[tsla.gps.latitude, tsla.gps.longitude]}
                    key={tsla.id}
                  >
                    <Popup>
                      <div>
                        <h3>{`Name: ` + tsla.name}</h3>
                        <p>{`Region: ` + tsla.region}</p>
                        <h5>{`Carbon Emission:` + tsla.emission}</h5>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
          {/* </div> */}
        </section>
      </div>
    </Fragment>
  );
}
