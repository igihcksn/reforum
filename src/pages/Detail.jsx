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
  downVoteCommentAsync,
  downVoteThreadAsync,
  selectDetailThread,
  upVoteCommentAsync,
  upVoteThreadAsync,
} from 'states/threads/threadSlice';
import { selectUser } from 'states/users/userSlice';

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const detailThreads = useSelector(selectDetailThread);

  const upVoteThreadHandler = () => dispatch(upVoteThreadAsync({ threadId: detailThreads.id }));
  const downVoteThreadHandler = () => dispatch(downVoteThreadAsync({ threadId: detailThreads.id }));
  const upVoteCommentHandler = ({
    commentId,
  }) => dispatch(upVoteCommentAsync({ threadId: detailThreads.id, commentId }));
  const downVoteCommentHandler = ({
    commentId,
  }) => dispatch(downVoteCommentAsync({ threadId: detailThreads.id, commentId }));

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
            <ThreadHeader
              detailThreads={detailThreads}
              upVoteThreadHandler={upVoteThreadHandler}
              downVoteThreadHandler={downVoteThreadHandler}
              user={users && users.detail && users.detail.id}
            />
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
              {users.detail && detailThreads.comments.length
                && detailThreads.comments.map((comment) => (
                  <CommentStack
                    key={comment.id}
                    comment={comment}
                    user={users && users.detail.id}
                    upVoteCommentHandler={upVoteCommentHandler}
                    downVoteCommentHandler={downVoteCommentHandler}
                  />
                ))}
            </Stack>
            {users && users.authenticated && (
              <CommentForm />
            )}
            {users && !users.authenticated && (
              <>Login untuk menambahkan komentar...</>
            )}
          </CardFooter>
        </>
      )}
      {!detailThreads && <ThreadNotFound />}
    </Card>
  );
}

export default DetailPage;
