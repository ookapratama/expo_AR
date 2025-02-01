import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import {
  Camera as ExpoCamera,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import { GLView } from "expo-gl";
import { Canvas } from "@react-three/fiber";
import { DeviceMotion } from "expo-sensors";
import * as THREE from "three";

const { width, height } = Dimensions.get("window");

// Define interfaces
interface Position {
  x: number;
  y: number;
  z: number;
}

interface Surface {
  position: Position;
  normal: Position;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

interface PlacedObject {
  id: number;
  position: Position;
}

interface TouchEvent {
  locationX: number;
  locationY: number;
}

interface MotionData {
  x: number;
  y: number;
  z: number;
}

interface Model3DProps {
  position: Position;
}

// Define Camera props interface
interface CameraProps {
  style: any;
  type: CameraType;
  onCameraReady: () => void;
  onFrameProcessed: (frame: CameraCapturedPicture) => void;
  children: React.ReactNode;
}

const MarkerlessAR: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [surfaces, setSurfaces] = useState<Surface[]>([]);
  const [placedObjects, setPlacedObjects] = useState<PlacedObject[]>([]);
  const motionData = useRef<MotionData>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      DeviceMotion.setUpdateInterval(16);
      DeviceMotion.addListener(({ rotation }) => {
        if (rotation) {
          motionData.current = {
            x: rotation.alpha || 0,
            y: rotation.beta || 0,
            z: rotation.gamma || 0,
          };
        }
      });
    })();

    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  const detectSurfaces = (cameraFrame: CameraCapturedPicture): void => {
    const detectedSurfaces: Surface[] = [];
    const surfaceData = analyzeDepthData(cameraFrame);
    if (surfaceData) {
      detectedSurfaces.push(surfaceData);
    }
    setSurfaces(detectedSurfaces);
  };

  const analyzeDepthData = (frame: CameraCapturedPicture): Surface => {
    return {
      position: { x: 0, y: -1, z: -2 },
      normal: { x: 0, y: 1, z: 0 },
      dimensions: { width: 2, height: 0.01, depth: 2 },
    };
  };

  const Model3D: React.FC<Model3DProps> = ({ position }) => {
    return (
      <mesh position={[position.x, position.y, position.z]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
  };

  const handleTap = (event: { nativeEvent: TouchEvent }): void => {
    const touchPosition = convertToWorldSpace(event.nativeEvent);
    setPlacedObjects((prevObjects) => [
      ...prevObjects,
      { id: Date.now(), position: touchPosition },
    ]);
  };

  const convertToWorldSpace = (touchEvent: TouchEvent): Position => {
    return {
      x: (touchEvent.locationX / width) * 2 - 1,
      y: -(touchEvent.locationY / height) * 2 + 1,
      z: -2,
    };
  };

  if (hasPermission === null || hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpoCamera
        style={styles.camera}
        type={CameraType.back}
        onCameraReady={() => console.log("Camera ready")}
        onFrameProcessed={detectSurfaces}
      >
        <GLView
          style={styles.arView}
          onContextCreate={(gl: WebGLRenderingContext) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
              75,
              gl.drawingBufferWidth / gl.drawingBufferHeight,
              0.1,
              1000
            );
            const renderer = new THREE.WebGLRenderer({
              context: gl,
              antialias: true,
            });
            renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
          }}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {surfaces.map((surface, index) => (
              <mesh
                key={index}
                position={[
                  surface.position.x,
                  surface.position.y,
                  surface.position.z,
                ]}
                rotation={[
                  surface.normal.x,
                  surface.normal.y,
                  surface.normal.z,
                ]}
              >
                <planeGeometry
                  args={[surface.dimensions.width, surface.dimensions.depth]}
                />
                <meshStandardMaterial
                  color="#444444"
                  transparent={true}
                  opacity={0.5}
                />
              </mesh>
            ))}
            {placedObjects.map((object) => (
              <Model3D key={object.id} position={object.position} />
            ))}
          </Canvas>
        </GLView>
        <TouchableOpacity style={styles.placementButton} onPress={handleTap}>
          <Text style={styles.buttonText}>Place Object</Text>
        </TouchableOpacity>
      </ExpoCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  arView: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  placementButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
  },
});

export default MarkerlessAR;
