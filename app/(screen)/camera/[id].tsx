// import React, { useState } from "react";
// import {
//   ViroARScene,
//   ViroARSceneNavigator,
//   ViroARTrackingTargets,
//   ViroObjModel,
//   ViroARImageMarker,
// } from "@viro-community/react-viro";
// import { View, StyleSheet } from "react-native";

// // First, register the AR tracking target (marker)
// ViroARTrackingTargets.createTargets({
//   butterfly_marker: {
//     source: require("../../../assets/images/category/kupukupu.jpg"),
//     orientation: "Up",
//     physicalWidth: 0.1, // real-world width of the marker in meters
//   },
// });

// const MarkerBasedARScene = () => {
//   const [modelVisible, setModelVisible] = useState(false);

//   return (
//     <ViroARScene>
//       <ViroARImageMarker
//         target="butterfly_marker"
//         onAnchorFound={() => setModelVisible(true)}
//         onAnchorRemoved={() => setModelVisible(false)}
//       >
//         {modelVisible && (
//           <ViroObjModel
//             source={require("../../../assets/3d/source/Butterfly.obj")}
//             resources={[require("../../../assets/3d/source/Butterfly.mtl")]}
//             scale={[0.03, 0.03, 0.03]}
//             position={[0, 0.1, 0]}
//             rotation={[-90, 0, 0]}
//             type="OBJ"
//           />
//         )}
//       </ViroARImageMarker>
//     </ViroARScene>
//   );
// };

// const ARApp = () => {
//   return (
//     <View style={styles.container}>
//       <ViroARSceneNavigator
//         initialScene={{
//           scene: MarkerBasedARScene,
//         }}
//         style={styles.arView}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   arView: {
//     flex: 1,
//   },
// });

// export default ARApp;

// ARWebView.tsx
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Platform } from "react-native";

const ARWebView = () => {
  const injectedJavaScript = `
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          console.log('Camera access granted');
        })
        .catch(function(err) {
          console.log('Camera access error:', err);
        });
    }
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://93c0-125-162-209-179.ngrok-free.app" }}
        style={styles.webview}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        androidHardwareAccelerationDisabled={false}
        domStorageEnabled={true}
        cacheEnabled={false}
        geolocationEnabled={true}
        useWebKit={true}
        originWhitelist={["*"]}
        onShouldStartLoadWithRequest={() => true}
        startInLoadingState={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          console.log("Message from WebView:", event.nativeEvent.data);
        }}
        {...(Platform.OS === "ios"
          ? {
              mediaPlaybackRequiresUserAction: false,
              allowsInlineMediaPlayback: true,
            }
          : {
              androidLayerType: "hardware",
            })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },
});

export default ARWebView;
