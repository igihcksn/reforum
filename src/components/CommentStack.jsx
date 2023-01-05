/* eslint-disable linebreak-style */
import React from 'react';
import {
  Avatar, Box, Button, Flex, Heading, Tag, Text,
} from '@chakra-ui/react';
import { BiDislike, BiLike } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { showFormattedDate } from 'utilities';

function CommentStack({ comment }) {
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
          variant="ghost"
          leftIcon={<BiLike />}
          rightIcon={<Tag>{comment.upVotesBy.length}</Tag>}
        >
          Like
        </Button>
        <Button
          variant="ghost"
          leftIcon={<BiDislike />}
          rightIcon={<Tag>{comment.downVotesBy.length}</Tag>}
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
};

export default CommentStack;
