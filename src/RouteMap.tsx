import mapboxgl, { LinePaint, LngLatBounds, Map } from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import ReactMapboxGl, {
  GeoJSONLayer,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
import { FitBounds } from "react-mapbox-gl/lib/map";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { MAPBOX_STYLE, MAPBOX_TOKEN } from "./constants";
import { getRouteGeoJSON } from "./RouteGeoJSONRepository";
import styles from "./RouteMap.module.css";

// @ts-ignore
mapboxgl.workerClass = mapboxWorker;

const MAX_BOUNDS: FitBounds = [
  [166.8778, -11.70256],
  [167.0321, -11.6259],
];
const MIN_ZOOM = 13;
const MAX_ZOOM = 18;

const Mapbox = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
});

const routePaint: LinePaint = {
  "line-color": "#fc6719",
  "line-width": 4,
};

interface Props {
  routeSlug: string | undefined;
}

export default function RouteMap({ routeSlug }: Props) {
  const { result: geojson } = useAsync(async () => {
    if (!routeSlug) {
      return undefined;
    }

    return await getRouteGeoJSON(routeSlug);
  }, [routeSlug]);

  const [map, setMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    if (!map || !geojson) {
      return;
    }

    const coordinates: [number, number][] = geojson.geometry.coordinates;

    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinates[0], coordinates[0])
    );

    map.fitBounds(bounds, {
      padding: 20,
    });
  }, [map, geojson]);

  return (
    <Mapbox
      // eslint-disable-next-line react/style-prop-object
      style={MAPBOX_STYLE}
      className={styles.Container}
      maxBounds={MAX_BOUNDS}
      onStyleLoad={(map) => setMap(map)}
    >
      <ZoomControl />
      <ScaleControl />
      {geojson && <GeoJSONLayer data={geojson} linePaint={routePaint} />}
    </Mapbox>
  );
}
