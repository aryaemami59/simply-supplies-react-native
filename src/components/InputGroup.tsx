import React, {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { FC, memo } from "react";
import { Input, Button, SearchBar } from "@rneui/themed";
import {
  clearListItems,
  itemInterface,
  selectItemsArr,
  setListItems,
} from "../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { shallowEqual } from "react-redux";

const empty: [] = [];

const sortResults = (
  searchTerm: itemInterface,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.name.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.name.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.name.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.name.toLowerCase().match(re)) {
    return searchTerm.name.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputGroup: FC = (): JSX.Element => {
  const items: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsArr,
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef<null>(null);
  const [val, setVal]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);

  const listItemsFunc = useCallback(
    (text: string) => {
      const trimmedValue: string = text
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      const reg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) =>
          i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
        )
        .join(".*");
      const looseReg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re: RegExp = new RegExp(`${reg}|${looseReg}`, "gi");
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
            .slice(0, 100)
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    (text: string): void => {
      const listItems: itemInterface[] = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <SearchBar
      placeholder="Search..."
      round
      // onClear={clickHandler}
      onChangeText={changeVal}
      value={val}
    />
  );
};

export default memo(InputGroup);
