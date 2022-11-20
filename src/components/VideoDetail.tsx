import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";
import ReactPlayer from "react-player";
import { videoType } from "./Feed";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState<videoType>({} as videoType);
  const [video, setVideo] = useState<videoType[]>([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideo(data.items)
    );
  }, [id]);

  if (!videoDetail.snippet) return <p>loading...</p>;
  const {
    snippet: { title, channelId, channelTitle },
    statistics,
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", postion: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" alignItems="center" gap="20px">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(statistics?.viewCount as string).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(statistics?.likeCount as string).toLocaleString()}{" "}
                  views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          flex={0.5}
          pl={2}
          py={{ md: 1, xs: 5 }}
          sx={{
            overflowY: "auto",
            height: { sx: "auto", md: "100vh" },
          }}
        >
          <Videos videos={video} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
