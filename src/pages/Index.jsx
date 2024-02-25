import React, { useState } from "react";
import { Box, Button, Text, VStack, Heading, Container, Center, useToast } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";

const Index = () => {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"];
  const [selectedName, setSelectedName] = useState("");
  const toast = useToast();

  const handleRaffleRoll = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    setSelectedName(name);
    toast({
      title: "Raffle Roll",
      description: `Congratulations ${name}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md">
      <Center py={10}>
        <VStack spacing={8}>
          <Heading>Raffle System</Heading>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Current Selection
            </Text>
            <Text fontSize="xl">{selectedName || "No name selected yet"}</Text>
          </Box>
          <Button leftIcon={<FaRedo />} colorScheme="teal" onClick={handleRaffleRoll}>
            Roll
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Index;
