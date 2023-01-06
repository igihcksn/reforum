/* eslint-disable linebreak-style */
import React from 'react';
import {
  Avatar, Box, Button, Flex, Heading, Tag, Text,
} from '@chakra-ui/react';
import { BiDislike, BiLike } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { showFormattedDate } from 'utilities';

function CommentStack({
  comment, upVoteCommentHandler, downVoteCommentHandler, user,
}) {
  const isVoteByMe = comment.upVotesBy
    && comment.upVotesBy.includes(user);
  const isDownVoteByMe = comment.downVotesBy
    && comment.downVotesBy.includes(user);

  return (
    <Box key={comment.id}>
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar
          name={comment.owner.name}
          src={comment.owner.avatar}
          size="sm"
        />

        <Box>
          <Heading size="sm">{comment.owner && comment.owner.name}</Heading>
          <Text>{showFormattedDate(comment.createdAt)}</Text>
          <Text dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Box>
      </Flex>
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="flex-end"
        flexWrap="wrap"
      >
        <Button
          variant={isVoteByMe ? 'solid' : 'ghost'}
          leftIcon={<BiLike />}
          rightIcon={<Tag variant={isVoteByMe ? 'solid' : 'ghost'} colorScheme={isVoteByMe && 'gray'}>{comment.upVotesBy.length}</Tag>}
          onClick={() => upVoteCommentHandler({ commentId: comment.id })}
          disabled={isVoteByMe}
          colorScheme={isVoteByMe && 'green'}
        >
          Like
        </Button>
        <Button
          variant={isDownVoteByMe ? 'solid' : 'ghost'}
          leftIcon={<BiDislike />}
          rightIcon={<Tag variant={isDownVoteByMe ? 'solid' : 'ghost'} colorScheme={isDownVoteByMe && 'gray'}>{comment.downVotesBy.length}</Tag>}
          onClick={() => downVoteCommentHandler({ commentId: comment.id })}
          disabled={isDownVoteByMe}
          colorScheme={isDownVoteByMe && 'red'}
        >
          Unlike
        </Button>
      </Flex>
    </Box>
  );
}

CommentStack.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  upVoteCommentHandler: PropTypes.func.isRequired,
  downVoteCommentHandler: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default CommentStack;
