import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import {
  ItemsByVendorStackParamList,
  VendorNameType,
} from "../../../../../CustomTypes/types";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import ItemsByVendorVendorList from "./ItemsByVendorVendorList";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <ItemsByVendorVendorList vendorName={item} />
);

const keyExtractor = (item: VendorNameType) => item.toString();

type Props = NativeStackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }) => {
  const allVendors = useAppSelector(selectVendorsArr);
  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.background }, HEIGHT_100]}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={allVendors}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorScreen);
