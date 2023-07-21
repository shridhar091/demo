import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import { startGetAllStations } from "../Actions/stationAction";

const Map = (props) => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
    dispatch(startGetAllStations());
  }, [dispatch]);

  const chargingStations = useSelector((state) => {
    return state.station.data;
  });

  console.log(chargingStations, "1234");

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const currentMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/8013/8013394.png",
    iconSize: [40, 40],
  });

  const stationMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/9357/9357947.png",
    iconSize: [30, 30],
  });
  console.log(currentLocation, "current loc");

  const handleBooking = (props) => {
    if (window.confirm("You want to book the slot")) {
      props.history.push("/booking");
    }
  };

  return (
    <div>
      {currentLocation && (
        <MapContainer
          style={containerStyle}
          center={currentLocation}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={currentLocation} icon={currentMarkerIcon}>
            <Popup>My current Location</Popup>
          </Marker>

          {chargingStations.map((station) => (
            <Marker
              position={[station.geo.latitude, station.geo.longitude]}
              icon={stationMarkerIcon}
            >
              <Popup>
                Name - {station.name} <br />
                Address - {station.address}
                {" - "}
                {station.landmark} <br />
                Staff-{station.staff}
                <br />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => { handleBooking(props) }}
                >
                  Book Now
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
