import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  Button,
  Textarea,
  VStack,
  Center,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const CodeConvertor = () => {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [convertedCode, setConvertedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://tame-jade-badger-veil.cyclic.app/basic/code",
        {
          prompt: code,
          language: selectedLanguage,
        }
      );
      console.log("Response from API:", response);
      setConvertedCode(response.data.result.message.content);
    } catch (error) {
      console.error("Error converting code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset the converted code when the language is changed
    setConvertedCode("");
  }, [selectedLanguage]);

  return (
    <Box p={4} w={800} margin={"auto"} border={"1px solid black"} mt={50}>
      <Heading>Code Convertor</Heading>
      <VStack spacing={4} align="flex-start">
        <Textarea
          placeholder="Enter code to convert"
          value={code}
          onChange={handleChange}
        />
        <Select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </Select>
        <Button colorScheme="teal" onClick={handleConvert}>
          Convert
        </Button>
        {isLoading && <Spinner size="sm" />}
        {convertedCode && (
          <Box>
            <strong>Converted Code:</strong>
            <Textarea value={convertedCode} readOnly rows={5} />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CodeConvertor;
