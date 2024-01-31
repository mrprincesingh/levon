import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Flex,
  Stack,
  Image,
  Text,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { signupfunc } from "../../redux/auth/action";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { useNavigate } from "react-router";
import logo from "../../assest/face.gif";

const Signup = () => {
  const dispatch = useDispatch();
  const { createAccount } = useSelector((state) => state);
  // console.log(createAccount);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setSelectedRole] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (createAccount === true) {
      toast.success("Signup Success!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [createAccount, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    dispatch(
      signupfunc(
        {
          name: name,
          email: email,
          password: password,
          city: city,
          role:role,
          mobile: mobile,
        },
        toast,
        navigate
      )
    );

    setName("");
    setEmail("");
    setPassword("");
    setCity("");
    setSelectedRole("")
    setMobile("");
   
  };

  return (
    <>
      <Box  width="100%" px={5}   display="grid"
        
        gridTemplateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
        ]}>
        <Box  mt="100px">
          <Image src={logo} borderRadius={10} width="100%" />
        </Box>
        <Box  mt="200px">
          <Flex justifyContent="center" alignItems="center" minHeight="100vh">
            <Container p={4} borderWidth="1px" borderRadius="md">
              <Heading as="h2" size="xl" textAlign="center" mb={6}>
                Sign Up
              </Heading>
              <form onSubmit={handleSignup}>
                <Stack spacing={4}>
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Text fontSize="sm" color="gray.500">
                      Your full name, e.g., John Doe
                    </Text>
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Text fontSize="sm" color="gray.500">
                      Your email address, e.g., john.deo@example.com
                    </Text>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Text fontSize="sm" color="gray.500">
                      Password must be at least 6 characters
                    </Text>
                  </FormControl>
                  <FormControl id="role">
                    <FormLabel>Select Role</FormLabel>
                    <Select value={role}  onChange={(e)=> setSelectedRole(e.target.value)} >
                    <option  >Select</option>
                    <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </Select>
                    
                    <Text fontSize="sm" color="gray.500">
                      Your username, e.g Teacher
                    </Text>
                  </FormControl>
                  <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    <Input
                      type="tel"
                      placeholder="Enter your City Name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      maxLength={10}
                      required
                    />
                    <Text fontSize="sm" color="gray.500">
                      City : Delhi
                    </Text>
                  </FormControl>
                  <FormControl id="phone">
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={10}
                      required
                    />
                    <Text fontSize="sm" color="gray.500">
                      Your phone number length is 10, e.g., 1234567890
                    </Text>
                  </FormControl>

                  <Button type="submit" colorScheme="green" size="lg">
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Container>
          </Flex>
        </Box>{" "}
        <ToastContainer position="top-right" />
      </Box>
    </>
  );
};

export default Signup;