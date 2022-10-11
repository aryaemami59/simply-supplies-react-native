import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { TouchableHighlight } from "react-native";
import {
  OfficialVendorNameType,
  VendorNameType,
} from "../../../../../CustomTypes/types";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { WIDTH_100 } from "../../../../shared/sharedStyles";

type Props = {
  title: OfficialVendorNameType;
  vendorName: VendorNameType;
};

const BottomSheetVendorCheckbox: FC<Props> = ({ title, vendorName }) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { background } = theme.colors;

  const onToggleCheck = useCallback(() => {
    checked
      ? dispatch(setVendorsForAllUncheck({ vendorName }))
      : dispatch(setVendorsForAllCheck({ vendorName }));
    setChecked(prev => !prev);
  }, [checked, dispatch, vendorName]);

  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={onToggleCheck}
      activeOpacity={0.6}>
      <ListItem
        bottomDivider
        containerStyle={{ backgroundColor: background }}>
        <ListItem.Content style={WIDTH_100}>
          <ListItem.CheckBox
            checked={checked}
            title={title}
            onPress={onToggleCheck}
          />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableHighlight>
  );
};

export default memo<Props>(BottomSheetVendorCheckbox);
