import { Box, Divider, HStack, Icon, VStack,Text } from '@chakra-ui/react'
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <Box
  bg="white"
  _dark={{
    bg: "gray.600",
  }}
>
 
  <Divider
    w="95%"
    mx="auto"
    color="gray.600"
    _dark={{
      color: "#F9FAFB",
    }}
    h="3.5px"
  />
  <VStack py={3}>
    <HStack justify="center">
      <Link>
        <Icon
          color="gray.800"
          _dark={{
            color: "white",
          }}
          h="20px"
          w="20px"
          as={FaFacebookF}
        />
      </Link>
      <Link>
        <Icon
          color="gray.800"
          _dark={{
            color: "white",
          }}
          h="20px"
          w="20px"
          as={FiTwitter}
        />
      </Link>
      <Link>
        <Icon
          _dark={{
            color: "white",
          }}
          h="20px"
          w="20px"
          as={GrInstagram}
        />
      </Link>
      <Link>
        <Icon
          _dark={{
            color: "white",
          }}
          h="20px"
          w="20px"
          as={FaLinkedinIn}
        />
      </Link>
    </HStack>

    <Text
      textAlign="center"
      fontSize="smaller"
      _dark={{
        color: "white",
      }}
    >
      © 2024 LEVON. All rights reserved
    </Text>
  </VStack>
</Box>

    </div>
  )
}

export default Footer