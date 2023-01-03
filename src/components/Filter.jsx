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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterThreadByCategory,
  removeThreadByCategory,
  selectThread,
} from "states/threads/threadSlice";

const Filter = () => {
  const thread = useSelector(selectThread);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const onFilterThread = ({ category }) => {
    dispatch(filterThreadByCategory(category));
  };

  useEffect(() => {
    if (thread.data !== null) {
      const categories = thread.data.map((data) => data.category);
      const filteredCategories = categories.filter((category, index) => !categories.includes(category, index + 1));
      setCategories(filteredCategories)      
    }
  },[thread])

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
          {categories.length &&
            categories.map((category) => (
              <MenuItem
                key={`id-${category}`}
                onClick={() => onFilterThread({ category })}
              >
                {category.toUpperCase()}
              </MenuItem>
            ))}
          <MenuItem onClick={() => dispatch(removeThreadByCategory())}>
            SEMUA KATEGORI
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Filter;
