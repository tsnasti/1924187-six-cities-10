import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/offer';

function useMap (mapRef: MutableRefObject<HTMLElement | null>, city: City) : Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const {latitude, longitude, zoom} = city.location;
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    } map?.setView({lat: latitude, lng: longitude}, zoom);
  }, [mapRef, map, latitude, longitude, zoom, city]);

  return map;
}

export default useMap;
