import { FC, memo, useEffect, useMemo, useCallback } from "react";
import {
  Image,
  View,
  Platform,
  Share,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  StackScreenProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";
import { JC_AI_CENTER_HEIGHT100 } from "../../../../shared/sharedStyles";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = StackScreenProps<ShoppingCartStackParamList, "BarcodeImage">;

const BarcodeImageScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { src, name } = route.params;

  const options: StackNavigationOptions = useMemo(() => {
    return {
      title: name,
    };
  }, [name]);

  const shareContent = useMemo(() => {
    return {
      title: `Barcode Image for ${name}`,
      message: `This is the barcode image for ${name}`,
      url: src,
    };
  }, [name, src]);

  const imageSource = useMemo(() => {
    return {
      uri: src,
    };
  }, [src]);

  const shareBarcode = useCallback(() => {
    Share.share(shareContent);
  }, [shareContent]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  return (
    <View style={[JC_AI_CENTER_HEIGHT100, styles.container]}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareBarcode}>
        <Octicons name={iconName} size={50} style={styles.icon} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  image: {
    aspectRatio: 33 / 28,
    width: "90%",
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginEnd: 15,
  },
});

export default memo<Props>(BarcodeImageScreen);
