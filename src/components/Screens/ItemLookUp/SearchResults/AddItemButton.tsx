import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../../../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { shallowEqual } from "react-redux";
import {
  FONT_WEIGHT_700,
  BACKGROUND_MAIN_COLOR,
} from "../../../../shared/sharedStyles";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { MaterialIcons } from "@expo/vector-icons";

const icon = <MaterialIcons name="add" color="white" size={24} />;

type Props = {
  itemObj: ItemObjType;
};

const AddItemButton: FC<Props> = ({ itemObj }): JSX.Element => {
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));

  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    !IfAddedToAllVendors && dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

  return (
    <Chip
      raised
      size="lg"
      onPress={clickHandler}
      title="Add"
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={icon}
    />
  );
};

export default memo<Props>(AddItemButton);
