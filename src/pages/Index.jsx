import React, { useState, useRef } from "react";
import { Box, Button, Text, VStack, Heading, Container, Center, useToast, keyframes, useStyleConfig, Input } from "@chakra-ui/react";

import { FaRedo } from "react-icons/fa";

const fadeInUpKeyframes = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInUpAnimation = `${fadeInUpKeyframes} 1s ease-in-out`;

const Index = () => {
  const styles = useStyleConfig("GlobalStyles");
  const names = useRef([]); // This will hold the list of names from the uploaded CSV
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [winnerCount, setWinnerCount] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);
        names.current = lines.slice(1); // Skip the first row (assumed header)
        setUploadComplete(true);
      };
      reader.readAsText(file);
    }
  };

  const handleRaffleRoll = () => {
    if (!names.current.length) {
      toast({
        title: "Raffle Roll",
        description: "The list of names is empty. Please upload a CSV file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const name = names.current.shift();
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
            <Box p={5} shadow="md" borderRadius="md" bg="gray.200" minH="200px" display="flex" alignItems="center" justifyContent="center">
              <Box as="iframe" title="Raffle Animation" src="https://u.pcloud.link/publink/show?code=XZVKtJ0ZWsH21t0nzd7EW4yhl3Iwiyb6pJjX" allowFullScreen allow="autoplay; encrypted-media" w="100%" h="200px" />
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" animation={selectedName && fadeInUpAnimation} bg="teal.800" color="white">
              {selectedName && (
                <VStack spacing={3}>
                  <VStack align="stretch" textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold">
                      Winner No. {winnerCount}
                    </Text>
                    <Text fontSize="xl">Category: Player Prize</Text>
                    <Text fontSize="xl">Prize: 1000PHPT</Text>
                    <Text fontSize="xl">Username: {selectedName}</Text>
                    <Text fontSize="xl">Congratulations!</Text>
                  </VStack>
                </VStack>
              )}
              {!selectedName && <Text fontSize="xl">Awaiting next winner...</Text>}
            </Box>
          </VStack>
          <Input type="file" accept=".csv" onChange={handleFileUpload} hidden={uploadComplete} />
          {uploadComplete && (
            <Button colorScheme="blue" onClick={handleRaffleRoll} leftIcon={<FaRedo />} mt="4">
              Roll Next Winner
            </Button>
          )}
        </VStack>
      </Center>
    </Container>
  );
};

<style jsx global>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  body {
    background-color: #f0e7db; /* light warm background */
  }
  #root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* subtle gradient for excitement */
    font-family: "Courier New", Courier, monospace; /* fun and exiting font style */
  }
`}</style>;

export default Index;
