import React, { useState } from "react";
import { Box, Button, Text, VStack, Heading, Container, Center, useToast, keyframes, useStyleConfig } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";

const fadeInUpKeyframes = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInUpAnimation = `${fadeInUpKeyframes} 1s ease-in-out`;

const Index = () => {
  const styles = useStyleConfig("GlobalStyles");
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
          <Heading color="brand.800">Raffle System</Heading>
          <VStack spacing={8}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.200" minH="200px" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="xl">Animation will be added here.</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" animation={selectedName && fadeInUpAnimation}>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Current Selection
              </Text>
              <Text fontSize="xl">{selectedName || "No name selected yet"}</Text>
            </Box>
          </VStack>
          <Button leftIcon={<FaRedo />} colorScheme="purple" variant="solid" onClick={handleRaffleRoll}>
            Roll
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

<style>
  {`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}
</style>;

export default Index;
