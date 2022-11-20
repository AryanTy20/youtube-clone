import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { videoType } from "./Feed";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  console.log(searchTerm);
  const [videos, setVideos] = useState<videoType[]>([]);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
    });
  }, [searchTerm]);

  console.log(videos);

  return (
    <Box p={2} sx={{ overflowY: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for : {""}
        <span style={{ color: "#f31503" }}>{searchTerm}</span>
      </Typography>
      <Box
        sx={{
          width: { xs: "90vw", sm: "initial" },
          overflowX: "hidden",
          padding: { sm: "0 1.5em", md: "0 7em" },
        }}
      >
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default SearchFeed;
