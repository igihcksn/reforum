import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "states/users/userSlice";
import { getUserById, showFormattedDate } from "utilities";
import { BASE_URL } from "constants";
import { Link } from "react-router-dom";

const ThreadCard = ({ data }) => {
  const users = useSelector(selectUser);

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              {users.loading && <Skeleton height="10px" />}
              {!users.loading && (
                <Heading size="sm">
                  {data.ownerId &&
                    getUserById({ ownerId: data.ownerId, users })}
                </Heading>
              )}
              <Text>{showFormattedDate(data.createdAt)}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Link
          to={BASE_URL.THREAD_DETAIL.replace(":id", data.id)}
          state={{
            threadId: data.id,
          }}
        >
          <Heading as="h2" size="md">
            {data.title}
          </Heading>
        </Link>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Badge>{data.category}</Badge>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
