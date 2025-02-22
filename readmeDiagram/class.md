classDiagram
class App {
-currentScreen: Screen
+initialize()
+navigateToScreen(screen: Screen)
}

    class HomeScreen {
        +displayMenu()
        +navigateToAR()
        +navigateToAnimalList()
    }

    class ARCamera {
        -isActive: boolean
        -currentMarker: Marker
        +initializeCamera()
        +startScanning()
        +stopScanning()
    }

    class MarkerDetector {
        -markerList: Marker[]
        +detectMarker(frame: Frame)
        +validateMarker(marker: Marker)
    }

    class Animal {
        -id: string
        -name: string
        -description: string
        -modelPath: string
        +getInfo()
        +load3DModel()
    }

    class Model3DRenderer {
        -currentModel: Model
        +loadModel(path: string)
        +renderModel()
        +updatePosition(x,y,z)
    }

    App --> HomeScreen
    App --> ARCamera
    ARCamera --> MarkerDetector
    MarkerDetector --> Animal
    Animal --> Model3DRenderer
