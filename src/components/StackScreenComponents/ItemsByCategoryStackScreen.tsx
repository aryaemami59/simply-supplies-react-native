import { FC, memo } from "react";
import {
  ItemsByCategoryStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsByCategoryScreen from "../Screens/ItemsReference/ItemsByCategory/ItemsByCategoryScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByCategory"
>;

const Stack = createNativeStackNavigator<ItemsByCategoryStackParamList>();
// const Stack = createStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByCategoryScreen"
        component={ItemsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsByCategoryStackScreen);
