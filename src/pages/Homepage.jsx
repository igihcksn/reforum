/* eslint-disable linebreak-style */
import React, { lazy, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { listAsync, selectThread } from 'states/threads/threadSlice';
import { listUserAsync } from 'states/users/userSlice';

const ThreadCardComponent = lazy(() => import('../components/ThreadCard'));

function Homepage() {
  const threads = useSelector(selectThread);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAsync());
    dispatch(listUserAsync());
  }, [dispatch]);

  return (
    <SimpleGrid columns={{ xl: 3, sm: 2 }} spacing={{ xl: 10, sm: 5 }}>
      {threads.loading && <>Loading...</>}
      {!threads.loading
        && !threads.filtered
        && threads.data
        && threads.data.map((thread) => (
          <ThreadCardComponent key={thread.id} data={thread} />
        ))}
      {!threads.loading
        && threads.filtered
        && threads.filtered.map((thread) => (
          <ThreadCardComponent key={thread.id} data={thread} />
        ))}
    </SimpleGrid>
  );
}

export default Homepage;
