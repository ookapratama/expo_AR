import { Image, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface IBulletCategory {
  title: string;
  url: undefined;
}

const BulletCategory = ({ title, url }: IBulletCategory) => {
  return (
    <ThemedView>
      <TouchableOpacity
        style={{
          backgroundColor: "#fbca9d",
          padding: 10,
          width: 64,
          height: 64,
          borderRadius: 32,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: undefined, height: undefined, flex: 1 }}
          source={url}
        />
      </TouchableOpacity>
      <ThemedText
        style={{
          textTransform: "capitalize",
          letterSpacing: 0.2,
          textAlign: "center",
          fontWeight: "400",
          fontSize: 14,
        }}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
};

export default BulletCategory;
