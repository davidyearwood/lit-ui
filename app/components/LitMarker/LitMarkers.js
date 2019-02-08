/* eslint-disable no-unused-vars */
import React from "react";
import LitMarker from "./LitMarker";

function LitMarkers({ places, ...attrs }) {
  const Markers = places.map(place => {
    let LatLng = {
      latitude: place.location.lat,
      longitude: place.location.lng
    };

    return (
      <LitMarker
        coordinate={LatLng}
        title={place.name}
        key={place.id}
        litness={place.litness}
        {...attrs}
      />
    );
  });

  return Markers;
}

export default LitMarkers;
