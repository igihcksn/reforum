/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Avatar,
  Box, Card, CardHeader, Flex, Heading, Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardAsync, selectLeaderboard } from 'states/leaderboards/leaderboardSlice';

function LeaderBoardPage() {
  const LeaderBoard = useSelector(selectLeaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboardAsync());
  }, []);

  return (
    <>
      {!LeaderBoard.loading && LeaderBoard.data && LeaderBoard.data.map((leaderboard) => (
        <Card key={leaderboard.user.id} my={2}>
          <CardHeader>
            <Flex spacing="4" direction={{ md: 'row', sm: 'column' }}>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={leaderboard.user.name}
                  src={leaderboard.user.avatar}
                />

                <Box>
                  {!LeaderBoard.loading && (
                  <Heading size="sm">
                    {leaderboard.user && leaderboard.user.name}
                  </Heading>
                  )}
                </Box>
              </Flex>
              <Flex
                flex="1"
                alignItems="center"
                justifyContent="center"
                direction={{ md: 'row', sm: 'row' }}
              />
              <Text>
                Score :
                {' '}
                {leaderboard.score}
              </Text>
            </Flex>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}

export default LeaderBoardPage;
