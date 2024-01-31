import { Box, Flex, FormControl, FormLabel, GridItem, HStack, Heading, Image, Input, SimpleGrid, Stack, Text,Button , chakra, Textarea, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaMapPin } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { deleteCourse, editCourse, getAllCourse, postCourse } from '../../redux/course/action';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Teacher = () => {
  const {user} = useSelector((store) => store.AuthReducer.userdata)
  const {isAuth} = useSelector((store) => store.AuthReducer)
  console.log(isAuth)
  const data = useSelector((store) => store.AppReducer.course)
  const isLoading = useSelector((store)=> store.AppReducer.isLoad)
  const [image , setImage] = useState("")
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editedImage, setEditedImage] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCourseId, setEditedCourseId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async()=>{
    if (!image || !title || !description) {
      toast.error("Please provide all the details.");
      return;
    }
  await dispatch(postCourse({title , description , image}))

  await dispatch(getAllCourse())

  setImage("")
  setTitle("")
  setDescription("")

  }

  const handelDelete = async(id)=>{

    await dispatch(deleteCourse(id))
    await dispatch(getAllCourse())
  }

  const handleEdit = (id) => {
    // Find the course with the given id
    setEditedCourseId(id);
    const courseToEdit = data.find((el) => el._id === id);

    // Set the state variables with the current data
    setEditedImage(courseToEdit.image);
    setEditedTitle(courseToEdit.title);
    setEditedDescription(courseToEdit.description);

    // Open the modal
    onOpen();
  };

  const handleSaveEdit = async () => {
   
   await dispatch(editCourse({
    image: editedImage,
     title:editedTitle,
     description: editedDescription,
     id: editedCourseId
 
    }))
   await dispatch(getAllCourse())

    onClose();
    setEditedCourseId(null);
  };

    useEffect(()=>{
     dispatch(getAllCourse())
    },[])


  

  return (
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
  {!user ? <Heading>No User Found please Logout</Heading> :
  <Box>
  <Box display="flex" flexDirection={["column" ,"row"]} >
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
     Welcome  {user.name }
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
  <Box
  bg="#edf3f8"
  _dark={{
    bg: "#111",
  }}
  p={10}
>
  <Box mt={[10, 0]}>
    <SimpleGrid
      display={{
        base: "initial",
        md: "grid",
      }}
      columns={{
        md: 3,
      }}
      spacing={{
        md: 6,
      }}
    >
      <GridItem
        colSpan={{
          md: 1,
        }}
      >
        <Box px={[4, 0]}>
          <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
         
          </Heading>
         
        </Box>
      </GridItem>
      <GridItem
        mt={[5, null, 0]}
        colSpan={{
          md: 2,
        }}
      >
        <chakra.form
          method="POST"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{
            sm: "hidden",
          }}
        >
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg="white"
            _dark={{
              bg: "#141517",
            }}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Image Link
                </FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  value = {image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="last_name"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Title
                </FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 4]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                Description
                </FormLabel>
                <Textarea
                  type="text"
                  name="email_address"
                  id="email_address"
                  autoComplete="email"
                  mt={1}
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </SimpleGrid>
          </Stack>
          <Box
            px={{
              base: 4,
              sm: 6,
            }}
            py={3}
            bg="gray.50"
            _dark={{
              bg: "#121212",
            }}
            textAlign="right"
          >
            <Button
     
           colorScheme='facebook'
          
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </chakra.form>
      </GridItem>
    </SimpleGrid>
  </Box>

 

</Box>
  </Box>
  {isLoading ? (
        <Center mt="2">
          <Heading>Loading...</Heading>
        </Center>
      ) : (
      <>
      <Center mt="2">
          <Heading>Available Courses </Heading>
        </Center>
      <Flex
        mt="5"
        justifyContent="center"
        w="100%"
        h="100%"
        wrap="wrap"
        gap="10"
      >
         <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Fields for editing details */}
            <FormControl>
              <FormLabel>Image Link</FormLabel>
              <Input
                type="text"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        { data && data.length > 0 &&
          data.map((el) => (
            <Center key={el._id} py={6}   _hover={{
                transform: "scale(1.05)",
                transition: "transform, 0.5s",
              }}>
              <Box
               
                maxW={"320px"}
                w={"full"}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
               
              >
                <Image
                  size={"2xl"}
                  src={el.image}
                  atl={el.title}
                  mb={4}
                  pos={"relative"}
                  _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg: "green.300",
                    border: "2px solid white",
                    rounded: "full",
                    pos: "absolute",
                    bottom: 0,
                    right: 3,
                  }}
                />
                <Text fontWeight={600} color={"gray.500"} textAlign="left"  mb={4}>
                  Title: {el.title}
                </Text>
                <Box h="100px" overflowY={"auto"} >
                <Text fontWeight={600} color={"gray.500"} textAlign="left" mb={4}>
                  {el.description}
                </Text>
                </Box>
                
                <Box w="100%" >
                <Button marginRight="6" colorScheme="blue" mt={2} onClick={() => handleEdit(el._id)}>
                <CiEdit />
                Edit
              </Button>
  <Button colorScheme='red' mt={2} onClick={() => handelDelete(el._id)} > <MdDelete />
 Delete</Button>


</Box>
              
              </Box>
            </Center>
            
          ))}
         
      </Flex>
      </>
      )}

  </Box>
  }
  
</Flex>



<ToastContainer position="top-right" />

    </div>
  )
}

export default Teacher