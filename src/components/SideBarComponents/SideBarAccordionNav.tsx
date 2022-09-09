import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { itemInterface, selectSidebarNavs } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

interface Props {
  category: string;
}

const SideBarAccordionNav: FC<Props> = ({ category }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);
  const sidebarItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectSidebarNavs(category),
    shallowEqual
  );

  return (
    <>
      <ListItem.Accordion
        containerStyle={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
        content={<ListItem.Title>{category}</ListItem.Title>}
        isExpanded={expanded}
        onPress={clickHandler}>
        {sidebarItems.map(f => (
          <SingleSideBarAccordionListItem
            category={category}
            itemObj={f}
            key={`${f.name}-SingleSideBarAccordionListItem`}
          />
        ))}
      </ListItem.Accordion>
    </>
  );
};

export default memo(SideBarAccordionNav);
