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
  const names = []; // Add the provided names here.
  const [selectedName, setSelectedName] = useState("");
  const [winnerCount, setWinnerCount] = useState(0);

  const handleRaffleRoll = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    setSelectedName(name);
    setWinnerCount((prevCount) => prevCount + 1);
    toast({
      title: "Raffle Roll",
      description: `Congratulations ${name}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const toast = useToast();

  return (
    <Container maxW="container.md">
      <Center py={10}>
        <VStack spacing={8}>
          <Heading color="brand.800">Team Marc Grand Raffle Draw</Heading>
          <VStack spacing={8}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.200" minH="200px" display="flex" alignItems="center" justifyContent="center">
              <Box as="iframe" title="Raffle Animation" src="https://www.youtube.com/embed/LZ8t5BNv9tI?autoplay=1&loop=1&playlist=LZ8t5BNv9tI&controls=0&modestbranding=1" allow="autoplay; encrypted-media" w="100%" h="200px" />
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" animation={selectedName && fadeInUpAnimation}>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Congratulations Winner #:
              </Text>
              <Text fontSize="xl">{selectedName ? `Winner #${winnerCount}: ${selectedName}` : "Awaiting next winner..."}</Text>
              <Text fontSize="xl">{selectedName || "No name selected yet"}</Text>
            </Box>
          </VStack>
          {/* The Roll button is now hidden as the winners will pop up automatically after the clip */}
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
