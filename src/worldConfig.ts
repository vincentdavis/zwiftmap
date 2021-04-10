import { LatLngTuple } from "leaflet";
import critCityMap from "./maps/crit-city.png";
import franceMap from "./maps/france.png";
import innsbruckMap from "./maps/innsbruck.png";
import londonMap from "./maps/london.png";
import newYorkMap from "./maps/new-york.png";
import parisMap from "./maps/paris.png";
import richmondMap from "./maps/richmond.png";
import watopiaMap from "./maps/watopia.png";
import yorkshireMap from "./maps/yorkshire.png";
import { World } from "./types";

export type WorldConfig = {
  imageBounds: [LatLngTuple, LatLngTuple];
  routeBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
};

export const worldConfigs: Record<World, WorldConfig> = {
  "crit-city": {
    imageBounds: [
      [-10.3657, 165.7824],
      [-10.4038, 165.8207],
    ],
    routeBounds: [
      [53.999691, -1.560305],
      [53.99099, -1.545435],
    ],
    image: critCityMap,
    backgroundColor: "#7c9938",
  },
  france: {
    imageBounds: [
      [-21.64155, 166.1384],
      [-21.7564, 166.26125],
    ],
    routeBounds: [
      [-21.652087, 166.148225],
      [-21.74491, 166.251404],
    ],
    image: franceMap,
    backgroundColor: "#6f992d",
  },
  innsbruck: {
    imageBounds: [
      [47.2947, 11.3501],
      [47.2055, 11.4822],
    ],
    routeBounds: [
      [47.280902, 11.386414],
      [47.214544, 11.445934],
    ],
    image: innsbruckMap,
    backgroundColor: "#7c9938",
  },
  london: {
    imageBounds: [
      [51.5362, -0.1776],
      [51.4601, -0.0555],
    ],
    routeBounds: [
      [51.511272, -0.164224],
      [51.474343, -0.061869],
    ],
    image: londonMap,
    backgroundColor: "#6f992d",
  },
  "new-york": {
    imageBounds: [
      [40.81725, -74.0227],
      [40.74085, -73.9222],
    ],
    routeBounds: [
      [40.799618, -73.982068],
      [40.763547, -73.949602],
    ],
    image: newYorkMap,
    backgroundColor: "#bbbbb7",
  },
  paris: {
    imageBounds: [
      [48.9058, 2.2561],
      [48.82945, 2.3722],
    ],
    routeBounds: [
      [48.874328, 2.294207],
      [48.860895, 2.331992],
    ],
    image: parisMap,
    backgroundColor: "#b9b9b9",
  },
  richmond: {
    imageBounds: [
      [37.5774, -77.48954],
      [37.5014, -77.394],
    ],
    routeBounds: [
      [37.558393, -77.467668],
      [37.520429, -77.415864],
    ],
    image: richmondMap,
    backgroundColor: "#7c9938",
  },
  watopia: {
    imageBounds: [
      [-11.62597, 166.87747],
      [-11.70255, 167.03255],
    ],
    routeBounds: [
      [-11.634595, 166.88756],
      [-11.693004, 167.002777],
    ],
    image: watopiaMap,
    backgroundColor: "#0884e2",
  },
  yorkshire: {
    imageBounds: [
      [54.0254, -1.632],
      [53.9491, -1.5022],
    ],
    routeBounds: [
      [53.999691, -1.592961],
      [53.974875, -1.539474],
    ],
    image: yorkshireMap,
    backgroundColor: "#7c9938",
  },
};
