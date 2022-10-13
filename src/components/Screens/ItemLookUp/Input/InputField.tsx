import { EvilIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar as SearchBarType } from "@rneui/base";
import { Header, SearchBar, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import {
  ItemLookupStackParamList,
  OnChangeText,
} from "../../../../../CustomTypes/types";
import { clearListItems, setListItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemNamesArr } from "../../../../redux/selectors";
import {
  BACKGROUND_TRANSPARENT,
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_100,
  WIDTH_80,
} from "../../../../shared/sharedStyles";
import { search } from "../../../../shared/utilityFunctions";
import HeaderRightComponent from "../../../HeaderComponents/HeaderRightComponent";
import SearchIcon from "../../../HeaderComponents/SearchIcon";

const InputField: FC = () => {
  const [val, setVal] = useState("");
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const view = useRef<Animatable.View & View>(null);
  const inputRef = useRef<SearchBarType & TextInput>(null);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ItemLookupStackParamList>>();
  const inputFocused = route.params?.inputFocused ? true : false;

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_100);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_80);
  }, []);

  const clearHandler = useCallback((): void => {
    setVal("");
    dispatch(clearListItems());
  }, [dispatch]);

  const navigation =
    useNavigation<NativeStackNavigationProp<ItemLookupStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      inputFocused && inputRef.current?.focus();
      return () => {
        inputRef?.current?.searchBar?.input.isFocused()
          ? navigation.setParams({ inputFocused: true })
          : navigation.setParams({ inputFocused: false });
      };
    }, [inputFocused, navigation])
  );

  const changeVal: OnChangeText = useCallback(
    (text: string) => {
      const listItems = search(text, itemNames);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, itemNames]
  );

  const clearIcon = useMemo(
    () => (
      <EvilIcons
        name="close"
        color={ICON_GRAY_COLOR}
        onPress={clearHandler}
        size={24}
      />
    ),
    [clearHandler]
  );

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      containerStyle={styles.headerContainer}
      rightContainerStyle={[JC_AI_CENTER, styles.headerRightContainer]}
      leftContainerStyle={DISPLAY_NONE}
      rightComponent={HeaderRightComponent}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <Animatable.View
          ref={view}
          style={WIDTH_80}>
          <SearchBar
            returnKeyType="search"
            ref={inputRef}
            lightTheme
            keyboardAppearance={theme.mode}
            autoFocus
            focusable
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerStyle={[styles.searchBarContainer, BACKGROUND_TRANSPARENT]}
            placeholder="Search..."
            round
            inputContainerStyle={styles.inputContainer}
            onClear={clearHandler}
            onChangeText={changeVal}
            value={val}
            inputStyle={COLOR_WHITE}
            placeholderTextColor={ICON_GRAY_COLOR}
            searchIcon={SearchIcon}
            clearIcon={clearIcon}
          />
        </Animatable.View>
      }
    />
  );
};

const styles = StyleSheet.create({
  headerCenterContainer: {
    flex: 5,
  },
  headerContainer: {
    // height: 105,
  },
  headerRightContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: SEARCH_BAR_COLOR,
    borderRadius: 9999,
  },
  searchBarContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

export default memo(InputField);
