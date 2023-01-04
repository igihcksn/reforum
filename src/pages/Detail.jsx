/* eslint-disable linebreak-style */
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  CommentForm,
  CommentStack,
  ThreadHeader,
  ThreadNotFound,
} from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  detailThereadAsync,
  selectDetailThread,
} from 'states/threads/threadSlice';

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const detailThreads = useSelector(selectDetailThread);

  useEffect(() => {
    if (params.id) {
      dispatch(detailThereadAsync(params.id));
    }
  }, [dispatch, params]);

  return (
    <Card>
      {detailThreads && (
        <>
          <CardHeader>
            <ThreadHeader detailThreads={detailThreads} />
          </CardHeader>
          <CardBody>
            <Heading as="h2">{detailThreads.title}</Heading>
            <Text dangerouslySetInnerHTML={{ __html: detailThreads.body }} />
          </CardBody>
          <CardFooter flexDirection="column" gap={5}>
            <Heading as="h4" size="md">
              Komentar
              {' '}
              <Tag>{detailThreads.comments.length}</Tag>
            </Heading>
            <Divider />
            <Stack divider={<StackDivider />} spacing="4">
              {!detailThreads.comments.length && (
                <Box>Komentar belum ada...</Box>
              )}
              {detailThreads.comments.length
                && detailThreads.comments.map((comment) => (
                  <CommentStack key={comment.id} comment={comment} />
                ))}
            </Stack>
            <CommentForm />
          </CardFooter>
        </>
      )}
      {!detailThreads && <ThreadNotFound />}
    </Card>
  );
}

export default DetailPage;
