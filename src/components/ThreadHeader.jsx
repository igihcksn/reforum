import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";
import { BiDislike, BiLike } from "react-icons/bi";
import { showFormattedDate } from "utilities";

const ThreadHeader = ({ detailThreads }) => {
  return (
    <Flex spacing="4">
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar
          name={detailThreads.owner.name}
          src={detailThreads.owner.avatar}
        />

        <Box>
          {!detailThreads.loading && (
            <Heading size="sm">
              {detailThreads.owner && detailThreads.owner.name}
            </Heading>
          )}
          <Text>{showFormattedDate(detailThreads.createdAt)}</Text>
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
          rightIcon={<Tag>{detailThreads.upVotesBy.length}</Tag>}
        >
          Like
        </Button>
        <Button
          variant="ghost"
          leftIcon={<BiDislike />}
          rightIcon={<Tag>{detailThreads.downVotesBy.length}</Tag>}
        >
          Unlike
        </Button>
      </Flex>
    </Flex>
  );
};

export default ThreadHeader;
