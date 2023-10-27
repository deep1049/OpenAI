import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Spinner,
  Heading,
} from "@chakra-ui/react";

const Assignment = () => {
  const [formData, setFormData] = useState({
    category: "",
    topic: "",
    language: "",
  });

  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start the loading indicator
    try {
      const response = await fetch(
        "https://tame-jade-badger-veil.cyclic.app/basic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle the API response here
      const data = await response.json();
      if (data && data.result && data.result.message) {
        setApiResponse(data.result.message.content);
      } else {
        setApiResponse("No content found in the API response");
      }
    } catch (error) {
      console.error("API request failed:", error);
      setApiResponse("API request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} w={800} margin={"auto"} border={"1px solid black"}>
      <Heading>Integrating Chat GPT to APP</Heading>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          name="language"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Joke">Joke</option>
          <option value="Shayari">Shayari</option>
          <option value="Description">Description</option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Topic</FormLabel>
        <Select name="language" value={formData.topic} onChange={handleChange}>
          <option value="Rose">Rose</option>
          <option value="Freinds">Freinds</option>
          <option value="Animals">Animals</option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Language</FormLabel>
        <Select
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Punjabi">Punjabi</option>
        </Select>
      </FormControl>

      {isLoading ? (
        <Spinner mt={4} />
      ) : (
        <>
          {" "}
          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
          <Textarea height={200} mt={4} value={apiResponse} isReadOnly />
        </>
      )}
    </Box>
  );
};

export default Assignment;
