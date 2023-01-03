const {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Button,
  Tag,
} = require("@chakra-ui/react");
const { BiLike, BiDislike } = require("react-icons/bi");

const CommentStack = ({ comment }) => {
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
};

export default CommentStack;
