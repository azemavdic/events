import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

const EventMap = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    Geocode.fromAddress(evt.address).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  if (isLoading) return false;
  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(e) => setViewport(e)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
};

export default EventMap;
