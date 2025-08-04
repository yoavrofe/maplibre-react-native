import { MapView, type MapViewRef } from "@maplibre/maplibre-react-native";
import { useRef, useState } from "react";
import { Text, View } from "react-native";

import { Bubble } from "../../components/Bubble";
import { sheet } from "../../styles/sheet";

export function LayersVisibility() {
  const mapViewRef = useRef<MapViewRef>(null);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [roadsVisible, setRoadsVisible] = useState(true);

  const toggleLabels = () => {
    // Toggle visibility of all label layers
    const labelLayers = [
      "country-label",
      "state-label", 
      "place-label",
      "poi-label"
    ];
    
    mapViewRef.current?.setLayersVisibility(!labelsVisible, labelLayers);
    setLabelsVisible(!labelsVisible);
  };

  const toggleRoads = () => {
    // Toggle visibility of road layers
    const roadLayers = [
      "road-motorway",
      "road-trunk", 
      "road-primary",
      "road-secondary",
      "road-tertiary",
      "road-street"
    ];
    
    mapViewRef.current?.setLayersVisibility(!roadsVisible, roadLayers);
    setRoadsVisible(!roadsVisible);
  };

  return (
    <>
      <MapView ref={mapViewRef} style={sheet.matchParent} />
      <View style={{ position: 'absolute', top: 50, left: 10, right: 10 }}>
        <Bubble onPress={toggleLabels}>
          <Text>{`${labelsVisible ? "Hide" : "Show"} All Labels`}</Text>
        </Bubble>
        <View style={{ height: 10 }} />
        <Bubble onPress={toggleRoads}>
          <Text>{`${roadsVisible ? "Hide" : "Show"} All Roads`}</Text>
        </Bubble>
      </View>
    </>
  );
}
