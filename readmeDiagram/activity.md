stateDiagram-v2
[*] --> OpenApp
OpenApp --> HomeScreen

    HomeScreen --> MenuHewan
    HomeScreen --> LihatInfo
    HomeScreen --> ARCamera

    ARCamera --> InitializeCamera
    InitializeCamera --> ScanMarker

    ScanMarker --> MarkerDetected
    ScanMarker --> NoMarkerDetected

    NoMarkerDetected --> ScanMarker

    MarkerDetected --> Load3DModel
    Load3DModel --> Display3DAnimal

    Display3DAnimal --> ScanMarker

    state if_state <<choice>>
    MenuHewan --> if_state
    if_state --> HomeScreen: Back
    if_state --> LihatInfo: Select Animal

    LihatInfo --> HomeScreen: Back
