import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { videoType } from "./Feed";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState<videoType>(
    {} as videoType
  );
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg,rgba(0,238,247,1) 0% , rgba(206,3,184,1) 100% ,rgba(0,212,255,1) 100%",
            zIndex: 10,
            height: "300px",
          }}
        >
          {channelDetail.id && (
            <ChannelCard channelDetail={channelDetail} marginTop="360px" />
          )}
        </div>
      </Box>
      <Box display="flex" p={2} mt={30}>
        <Box sx={{ margin: "0 auto", padding: { sm: "0 3em", md: "initial" } }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
