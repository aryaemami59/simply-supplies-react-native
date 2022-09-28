import { Badge, ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectVendorOfficialName,
  addedItemsLength,
} from "../../../redux/addedSlice";
import { StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { useNavigation } from "@react-navigation/native";
import {
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../CustomTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { FONT_WEIGHT_BOLD, AI_CENTER } from "../../../shared/sharedStyles";

type Props = {
  vendorName: vendorNameType;
};

const CartVendorColumns: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  const status = addedItemsLen ? "success" : "primary";

  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("CartColumnListItems", { vendorName });
  }, [navigation, vendorName]);

  return (
    <ListItem
      bottomDivider
      Component={TouchableScale}
      containerStyle={[AI_CENTER, styles.listItemContainer]}
      onPress={clickHandler}
      pad={50}>
      <ListItem.Content>
        <>
          <ListItem.Title>{officialVendorName}</ListItem.Title>
          <Badge
            textStyle={FONT_WEIGHT_BOLD}
            status={status}
            value={addedItemsLen}
            containerStyle={styles.badgeContainer}
          />
        </>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    justifyContent: "space-between",
  },
  badgeContainer: {
    position: "absolute",
    right: 60,
  },
});

export default memo<Props>(CartVendorColumns);
