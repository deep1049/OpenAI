import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";

const Pincode = () => {
  const [cityName, setCityName] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const apiResponse = await axios.post(
        "https://tame-jade-badger-veil.cyclic.app/basic/pincode",
        {
          message: cityName,
        }
      );

      console.log("abc", apiResponse);
      if (apiResponse.status === 200) {
        setResponse(apiResponse.data.response);
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
  console.log("resp", response);
  return (
    <Box p={4} w={800} margin={"auto"} border={"1px solid black"} mt={50}>
      <Heading>Pincode Generator</Heading>
      <form onSubmit={handleSubmit}>
        <FormLabel>
          Enter City Name :
          <Input type="text" value={cityName} onChange={handleInputChange} />
        </FormLabel>
        <Button type="submit">Submit</Button>
      </form>
      {isLoading && <p>Loading...</p>}
      {!isLoading && response && <p>Response from the server: {response}</p>}
    </Box>
  );
};

export default Pincode;
