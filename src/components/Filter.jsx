/* eslint-disable linebreak-style */
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterThreadByCategory,
  removeThreadByCategory,
  selectThread,
} from 'states/threads/threadSlice';

function Filter() {
  const dispatch = useDispatch();
  const thread = useSelector(selectThread);
  const [categories, setCategories] = useState([]);

  const onFilterThread = ({ category }) => {
    dispatch(filterThreadByCategory(category));
  };

  useEffect(() => {
    if (thread.data !== null) {
      const mapCategory = thread.data.map((data) => data.category);
      const filteredCategories = mapCategory.filter(
        (category, index) => !mapCategory.includes(category, index + 1),
      );
      setCategories(filteredCategories);
    }
  }, [thread]);

  return (
    <Flex gap="2" py="3">
      <InputGroup>
        <Input placeholder="Enter amount" />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Spacer />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Filter
        </MenuButton>
        <MenuList>
          {categories.length
            && categories.map((category) => (
              <MenuItem
                key={`id-${category}-${Math.random()}`}
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
}

export default Filter;
