import { MapView, type MapViewRef } from "@maplibre/maplibre-react-native";
import { useRef, useState } from "react";
import { Text, View } from "react-native";

import { Bubble } from "../../components/Bubble";
import { sheet } from "../../styles/sheet";

export function LayoutProperty() {
  const mapViewRef = useRef<MapViewRef>(null);
  const [textSize, setTextSize] = useState(12);
  const [lineWidth, setLineWidth] = useState(1);
  const [iconSize, setIconSize] = useState(1);

  const toggleTextSize = () => {
    const newSize = textSize === 12 ? 20 : 12;
    // Change text size for country labels
    mapViewRef.current?.setLayoutProperty("country-label", "text-size", newSize);
    setTextSize(newSize);
  };

  const toggleLineWidth = () => {
    const newWidth = lineWidth === 1 ? 4 : 1;
    // Change line width for major roads
    mapViewRef.current?.setLayoutProperty("road-motorway", "line-width", newWidth);
    mapViewRef.current?.setLayoutProperty("road-trunk", "line-width", newWidth);
    setLineWidth(newWidth);
  };

  const toggleIconSize = () => {
    const newSize = iconSize === 1 ? 1.5 : 1;
    // Change icon size for POI icons
    mapViewRef.current?.setLayoutProperty("poi-label", "icon-size", newSize);
    setIconSize(newSize);
  };

  const toggleLayerVisibility = () => {
    // Demonstrate using setLayoutProperty for visibility (alternative to setLayersVisibility)
    mapViewRef.current?.setLayoutProperty("water", "visibility", "none");
    // Show it back after 2 seconds
    setTimeout(() => {
      mapViewRef.current?.setLayoutProperty("water", "visibility", "visible");
    }, 2000);
  };

  return (
    <>
      <MapView ref={mapViewRef} style={sheet.matchParent} />
      <View style={{ position: 'absolute', top: 50, left: 10, right: 10 }}>
        <Bubble onPress={toggleTextSize}>
          <Text>{`Text Size: ${textSize}px`}</Text>
        </Bubble>
        <View style={{ height: 10 }} />
        <Bubble onPress={toggleLineWidth}>
          <Text>{`Line Width: ${lineWidth}px`}</Text>
        </Bubble>
        <View style={{ height: 10 }} />
        <Bubble onPress={toggleIconSize}>
          <Text>{`Icon Size: ${iconSize}x`}</Text>
        </Bubble>
        <View style={{ height: 10 }} />
        <Bubble onPress={toggleLayerVisibility}>
          <Text>Hide Water (2s)</Text>
        </Bubble>
      </View>
    </>
  );
}
