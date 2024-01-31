import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get_login_Error, get_login_request, get_login_success, loginfunc } from "../../redux/auth/action";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import logo from "../../assest/polar.gif";
import logo1 from "../../assest/florid.gif";
import axios from "axios";

const Login = () => {
  const data = useSelector((state) => state);
 // console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setSelectedRole] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Please provide both Email and Password.");
      return;
    }
    dispatch(get_login_request())
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        {
          email,
          password,
          role
        }
      );
  
      if (response.status === 200) {
        console.log(response.data);
        dispatch(get_login_success(response.data));
        localStorage.setItem("token12", response.data.user.city);
        toast.success("Login successful!");
  
        // Redirect based on user role after 3 seconds
        setTimeout(() => {
          if (response.data.user.role === "student") {
            navigate("/student"); // Redirect to student dashboard
          } else if (response.data.user.role === "teacher") {
            navigate("/teacher"); // Redirect to teacher dashboard
          } else {
            navigate("/"); // Default redirect if the role is not recognized
          }
        }, 3000);
      } else {
        const errorMessage =
          response.data && response.data.error
            ? response.data.error
            : "Invalid email or password please try again.";
        toast.error(errorMessage);
        dispatch(get_login_Error());
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(get_login_Error());
      toast.error("Invalid email or password please try again.");
    }
  };
  

  return (
    <>
      <Box
      
        width="100%"
        px={10}
        display="grid"
        gridTemplateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        <Box mt="150px">
          <Image src={logo} borderRadius={10}   width="80%"/>
        </Box>
        <Box
          p={4}
          m="auto"
          mt="200px"
          width="100%"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
          className="login-container slide-in-left"
        >
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Login
          </Heading>
          <form onSubmit={handleLogin}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="role">
                    <FormLabel>Select Role</FormLabel>
                    <Select value={role}  onChange={(e)=> setSelectedRole(e.target.value)} >
                    <option  >Select</option>
                    <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </Select>
                    
                 
                    </FormControl>
            <Button type="submit" colorScheme="green" size="lg" mt={4} w="100%">
              Login
            </Button>
          </form>
        </Box>

        <Box mt="150px">
          <Image src={logo1} borderRadius={10} width="80%" />
        </Box>
        <ToastContainer position="top-right" />
      </Box>
    </>
  );
};

export default Login;