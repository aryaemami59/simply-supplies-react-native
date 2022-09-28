import { View, StyleSheet, Platform } from "react-native";
import React, { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchNavList,
  checkIfLoading,
  selectErrMsg,
} from "../redux/addedSlice";
import IsLoadingComponents from "../shared/IsLoadingComponents";
import ErrMsgComponent from "../shared/ErrMsgComponent";
import TabBarMain from "./TabBarComponents/TabBarMain";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);

  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    <TabBarMain />
    // <View style={styles.container}>
    //   <TabBarMain />
    // </View>
    // <SafeAreaProvider>
    //   <TabBarMain />
    // </SafeAreaProvider>
  );
};

export default memo(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: statusBarHeight,
    // paddingTop: Constants.statusBarHeight,
    // paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white",
    height: "100%",
  },
  DarkModeStyle: {
    color: "white",
    height: "100%",
  },
  LightModeStyle: {
    backgroundColor: "white",
    color: "black",
    height: "100%",
  },
});
