import React, { useEffect, useState, useRef } from "react";

import {
  Button,
  HStack,
  VStack,
  Text,
  Box,
  Stack,
  Center,
  Divider,
  Avatar,
  Icon,
  View,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";

const GOOGLE_MAPS_API_KEY = "sduhbdsbfv-sdjdshvjhdfvb";
const MAP_SCRIPT_WITH_API_KEY = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
const vehicle = require("../../assets/UberGo.png");

export default function WebEnRoute() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if map script is already present in DOM
    if (!document.body.dataset.mapLoaded) {
      const mapScript = document.createElement("script");
      mapScript.src = MAP_SCRIPT_WITH_API_KEY;

      mapScript.onload = () => {
        // set dataset property on body to indicate map script has been loaded.
        document.body.dataset.mapLoaded = "true";
        setMapLoaded(true);
      };
      document.head.appendChild(mapScript);
    }
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      //@ts-ignore
      const map = new window.google.maps.Map(mapContainerRef.current, {
        zoom: 17,
        mapTypeId: "terrain",
        center: { lat: 12.90852, lng: 77.60059 },
      });

      const pathCoords = [
        {
          lat: 12.91072,
          lng: 77.60173,
        },
        {
          lat: 12.91003,
          lng: 77.60191,
        },
        {
          lat: 12.90932,
          lng: 77.60214,
        },
        {
          lat: 12.90863,
          lng: 77.60231,
        },
        {
          lat: 12.9086,
          lng: 77.60185,
        },
        {
          lat: 12.90857,
          lng: 77.60166,
        },
        {
          lat: 12.90852,
          lng: 77.60059,
        },
        {
          lat: 12.90851,
          lng: 77.60038,
        },
        {
          lat: 12.90825,
          lng: 77.60041,
        },
        {
          lat: 12.90806,
          lng: 77.60041,
        },
        {
          lat: 12.90784,
          lng: 77.60044,
        },
        {
          lat: 12.90744,
          lng: 77.60055,
        },
        {
          lat: 12.90731,
          lng: 77.60061,
        },
        {
          lat: 12.90701,
          lng: 77.60089,
        },
        {
          lat: 12.90579,
          lng: 77.60183,
        },
        {
          lat: 12.90556,
          lng: 77.60195,
        },
        {
          lat: 12.9055,
          lng: 77.60196,
        },
        {
          lat: 12.90546,
          lng: 77.60197,
        },
        {
          lat: 12.90545,
          lng: 77.60186,
        },
        {
          lat: 12.90552,
          lng: 77.60183,
        },
        {
          lat: 12.90557,
          lng: 77.60181,
        },
        {
          lat: 12.90555,
          lng: 77.60173,
        },
        {
          lat: 12.90596,
          lng: 77.60145,
        },
      ];

      //@ts-ignore
      const deliveryPath = new window.google.maps.Polyline({
        path: pathCoords,
        geodesic: true,
        strokeColor: "#000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      deliveryPath.setMap(map);

      //@ts-ignore
      new window.google.maps.Marker({
        position: pathCoords[0],
        map: map,
        Icon: {
          url: vehicle,
          scaledSize: new google.maps.Size(50, 50),
        },
        title: "source",
      });

      //@ts-ignore
      new window.google.maps.Marker({
        position: pathCoords[pathCoords.length - 1],
        map: map,

        title: "destination",
      });
    }
  }, [mapLoaded]);

  return (
    <>
      {mapLoaded ? (
        <VStack
          safeAreaBottom
          flex="1"
          space={{ base: "4", md: "0" }}
          // px={{ base: "0", md: "10", lg: "0" }}
          // pb={{ base: "4", md: "8" }}
          rounded={{ md: "lg" }}
          borderWidth={{ base: "0", md: "1" }}
          _light={{
            bg: { md: "white", base: "primary.50" },
            borderColor: "coolGray.200",
          }}
          _dark={{
            bg: { base: "coolGray.700", md: "coolGray.700" },
            borderColor: "coolGray.700",
          }}
        >
          <View flex="1" ref={mapContainerRef} />
        </VStack>
      ) : (
        "Loading ..."
      )}
    </>
  );
}
