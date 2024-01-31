import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FaEnvelope, FaMapPin, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_All_User } from '../../redux/auth/action';

const Student = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.AuthReducer.userdata);
  const isLoading = useSelector((store) => store.AuthReducer.isLoad);
  const allUsers = useSelector((store) => store.AuthReducer.alluser.users) || [];
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(get_All_User());
  }, [dispatch]);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <Flex
          bg="#edf3f8"
          _dark={{
            bg: "#3e3e3e",
          }}
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          {!user ? (
            <Heading>No User Found please login</Heading>
          ) : (
            <Box>
              <Box display="flex" flexDirection={["column", "row"]}>
                <Flex
                  shadow="lg"
                  rounded="lg"
                  bg="#edf3f8"
                  _dark={{
                    bg: "gray.800",
                  }}
                  mb={8}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    bg="#edf3f8"
                    _dark={{
                      bg: "#3e3e3e",
                    }}
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    height="100%"
                    width="100%"
                    borderRadius="lg"
                    p={8}
                    display="flex"
                    alignItems="left"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="Profile Picture"
                      borderRadius="full"
                      boxSize="150px"
                      shadow="lg"
                      border="5px solid"
                      mb={-20}
                      borderColor="gray.800"
                      _dark={{
                        borderColor: "gray.200",
                      }}
                    />
                  </Box>
                  <Box
                    gridColumn="span 8"
                    p={8}
                    width="full"
                    height="full"
                    borderRadius="lg"
                    textAlign="left"
                    mt={10}
                  >
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      color="gray.800"
                      _dark={{
                        color: "white",
                      }}
                    >
                      Welcome {user.name}
                    </Text>

                    <HStack
                      spacing={3}
                      color="gray.700"
                      _dark={{
                        color: "gray.200",
                      }}
                    >
                      <FaMapPin size={20} />
                      <Text fontSize="lg">{user.city || "please Logout"}</Text>
                    </HStack>
                    <HStack
                      spacing={3}
                      color="gray.700"
                      _dark={{
                        color: "gray.200",
                      }}
                    >
                      <FaEnvelope size={20} />
                      <Text fontSize="lg">{user.email || "please Logout"}</Text>
                    </HStack>
                  </Box>
                </Flex>
              </Box>
              {isLoading ? (
                <Center mt="2">
                  <Heading>Loading...</Heading>
                </Center>
              ) : (
                <>
                  <Center mt="2">
                    <Heading>Students Active</Heading>
                  </Center>
                  <Flex
                    mt="5"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                    wrap="wrap"
                    gap="10"
                  >
                    <InputGroup mb={4} width="100%">
                      <Box w="50%" m="auto">
                        <Input
                          bg="blue.200"
                          placeholder="Search by Email, Mobile, or Name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Box>
                    </InputGroup>

                    {filteredUsers.map((el) => (
                      <Center
                        key={el._id}
                        py={6}
                        _hover={{
                          transform: "scale(1.05)",
                          transition: "transform, 0.5s",
                        }}
                      >
                        <Box
                          maxW={"320px"}
                          w={"full"}
                          boxShadow={"2xl"}
                          rounded={"lg"}
                          p={6}
                          textAlign={"center"}
                        >
                          <Avatar
                            size={"xl"}
                            src={
                              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                            }
                            mb={4}
                            pos={'relative'}
                            _after={{
                              content: '""',
                              w: 4,
                              h: 4,
                              bg: 'green.300',
                              border: '2px solid white',
                              rounded: 'full',
                              pos: 'absolute',
                              bottom: 0,
                              right: 3,
                            }}
                          />
                          <Text
                            fontWeight={600}
                            color={"gray.500"}
                            textAlign="left"
                            mb={4}
                          >
                            Email: {el.email}
                          </Text>
                          <Box>
                            <Text
                              fontWeight={600}
                              color={"gray.500"}
                              textAlign="left"
                              mb={4}
                            >
                              Phone: {el.mobile}
                            </Text>
                          </Box>
                          <Box>
                            <Text
                              fontWeight={600}
                              color={"gray.500"}
                              textAlign="left"
                              mb={4}
                            >
                              Name: {el.name}
                            </Text>
                          </Box>
                        </Box>
                      </Center>
                    ))}
                  </Flex>
                </>
              )}
            </Box>
          )}
        </Flex>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default Student;
