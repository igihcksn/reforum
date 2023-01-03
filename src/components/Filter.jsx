import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterThreadByCategory,
  removeThreadByCategory,
  selectThread,
} from "states/threads/threadSlice";

const Filter = () => {
  const thread = useSelector(selectThread);
  const dispatch = useDispatch();

  const onFilterThread = ({ category }) => {
    dispatch(filterThreadByCategory(category));
  };

  return (
    <Flex gap="2" py="3">
      <InputGroup>
        <Input placeholder="Enter amount" />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<SearchIcon />}
        />
      </InputGroup>
      <Spacer />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Filter
        </MenuButton>
        <MenuList>
          {thread.data &&
            thread.data.map((thread) => (
              <MenuItem
                key={`id-${thread.category}`}
                onClick={() => onFilterThread({ category: thread.category })}
              >
                {thread.category.toUpperCase()}
              </MenuItem>
            ))}
          <MenuItem onClick={() => dispatch(removeThreadByCategory())}>
            Semua Kategori
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Filter;
