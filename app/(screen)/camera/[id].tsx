// ARWebView.tsx
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ARWebView = () => {
  const { idx } = useLocalSearchParams<{ idx: string }>();
  console.log(idx);
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
        source={{ uri: `https://3b99-103-164-170-225.ngrok-free.app?animal=${idx}` }}
        style={styles.webview}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        mixedContentMode="always"
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
