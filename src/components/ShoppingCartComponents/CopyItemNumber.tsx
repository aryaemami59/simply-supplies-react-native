import { FC, memo } from "react";
import { Fontisto } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { ItemObjType } from "../../../CustomTypes/types";
import { StyleSheet } from "react-native";

type Props = {
  itemObj: ItemObjType;
};

const CopyItemNumber: FC<Props> = ({ itemObj }): JSX.Element => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(itemObj.itemNumber);
  };
  return (
    <>
      <Fontisto
        onPress={copyToClipboard}
        name="copy"
        size={30}
        color="black"
        style={styles.IconStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  IconStyle: {
    marginStart: 10,
  },
});

export default memo(CopyItemNumber);
