import { Box, Button, CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Text, chakra, useColorModeValue, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import ToggleColorMode from '../theme/ToggleColorMode';
import { Link, useNavigate } from 'react-router-dom';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useDispatch, useSelector } from 'react-redux';
import { logoutfunc } from '../../redux/auth/action';



const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  

 const token = localStorage.getItem("token12");
  const {userdata} = useSelector((state)=>state.AuthReducer)
  const options1 = {
    items: ["Home" ],
    links: ["/"]
  };
  if(token ){

   let user = userdata.user.role
    options1.items.push(user)
    options1.links.push(`/${user}`)
    options1.items.push("Logout");
    options1.links.push(`/logout`);
  }else{
    options1.items.push("Login", "Signup");
    options1.links.push("/login", "/signup");
  }



  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("token12");
    dispatch(logoutfunc())
   navigate("/")
  };

  return (
    <div>
      <Fragment>
        <chakra.header
          bg={bg}
          w="full"
          px={{
            base: 2,
            sm: 4,
          }}
          py={4}
          shadow="md"
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <chakra.a
                href="/"
                title="Choc Home Page"
                display="flex"
                alignItems="center"
              >
      
              </chakra.a>
              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                LEVON
              </chakra.h1>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{
                  base: "none",
                  md: "inline-flex",
                }}
              >
                {options1.items.map((el, index) => (
                  <Fragment key={index}>
                  {el === "Logout" ? (
                    <Button variant="ghost" onClick={handleLogout}>
                      {el}
                    </Button>
                  ) : (
                    <Link to={options1.links[index]}>
                      <Button variant="ghost">{el}</Button>
                    </Link>
                  )}
                </Fragment>
                ))}

                <Text
                  cursor="pointer"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  <ToggleColorMode />
                </Text>
              </HStack>
              <Button colorScheme="brand" size="sm">
                Get Started
              </Button>
              <Box
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
              >
                <IconButton
                  display={{
                    base: "flex",
                    md: "none",
                  }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>LEVON</DrawerHeader>
                    <DrawerBody>
                      {options1.items.map((el, index) => (
                        <Fragment key={index}>
                        {el === "Logout" ? (
                          <Button variant="ghost" onClick={handleLogout}>
                            {el}
                          </Button>
                        ) : (
                          <Link to={options1.links[index]}>
                            <Button variant="ghost">{el}</Button>
                          </Link>
                        )}
                      </Fragment>
                      ))}
                      <Box m="25px auto" fontSize={18} fontWeight={"500"}>
                        <Link to={""}>
                          <ToggleColorMode />
                        </Link>
                      </Box>
                      <Box m="25px auto"></Box>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </Fragment>
    </div>
  );
}

export default Navbar;