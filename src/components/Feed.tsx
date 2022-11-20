import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromApi";

export type videoType = {
  kind: string;
  id: {
    kind: string;
    videoId: string;
    channelId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    subscriberCount?: string;
    favoriteCount?: string;
    commentCount?: string;
  };
  brandingSettings?: {
    channel: {
      title: string;
      description: string;
      keywords: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  contentDetails?: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
};

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState<videoType[]>([]);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          minWidth: "fit-content",
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff", ml: { xs: "1em" } }}
        >
          Copyright 2022 Aryan Ty
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
        </Typography>
        <Box
          sx={{
            width: { xs: "90vw", md: "82vw" },
            overflowY: "auto",
            height: { sx: "auto", md: "81vh" },
          }}
        >
          <Videos videos={videos} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
