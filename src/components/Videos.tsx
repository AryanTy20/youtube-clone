import React from "react";
import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard } from ".";
import { videoType } from "./Feed";

type videosProps = {
  videos: videoType[];
};

const Videos = ({ videos }: videosProps) => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((item, i) => (
        <Box key={i}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id?.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
