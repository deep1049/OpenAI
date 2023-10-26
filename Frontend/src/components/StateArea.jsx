import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";

const StateArea = () => {
  const [stateName, setstateName] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setstateName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const ApiResponse = await axios.post(
        "https://tame-jade-badger-veil.cyclic.app/basic/state",
        {
          message: stateName,
        }
      );

      if (ApiResponse.status === 200) {
        setResponse(ApiResponse.data.response);
        setIsLoading(false);
      } else {
        setResponse("Error: Unable to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setResponse("Error: An error occurred");
      setIsLoading(false);
    }
  };
  // useEffect(()=>{

  // },[response])
  return (
    <Box w={800} margin={"auto"}>
      <Heading>State Area Info</Heading>
      <form onSubmit={handleSubmit}>
        <FormLabel>
          Enter State Name:
          <Input type="text" value={stateName} onChange={handleInputChange} />
        </FormLabel>
        <Button type="submit">Submit</Button>
      </form>
      {isLoading && <p>Loading...</p>}
      {!isLoading && response && <p>Response from the server: {response}</p>}
    </Box>
  );
};

export default StateArea;
