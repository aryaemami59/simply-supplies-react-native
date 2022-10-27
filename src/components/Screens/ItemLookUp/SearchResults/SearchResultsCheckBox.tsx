import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { setVendors } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
} from "../../../../redux/selectors";
import useItemName from "../../../../shared/customHooks/useItemName";
import useOfficialVendorName from "../../../../shared/customHooks/useOfficialVendorName";
import useVendorName from "../../../../shared/customHooks/useVendorName";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/sharedStyles";

const SearchResultsCheckBox: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const officialVendorName = useOfficialVendorName(vendorName);

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <ListItem.CheckBox
      checked={checked}
      disabled={disabled}
      onPress={clickHandler}
      title={officialVendorName}
      style={BACKGROUND_TRANSPARENT}
      textStyle={BACKGROUND_TRANSPARENT}
    />
  );
};

export default memo(SearchResultsCheckBox);
