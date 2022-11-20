import React from "react";
import { videoType } from "./Feed";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

type channelCardProps = {
  channelDetail: videoType;
  marginTop?: string;
};

const ChannelCard = ({ channelDetail, marginTop }: channelCardProps) => {
  return (
    <Box
      className="channel-Card"
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        // width: { zs: "360px", md: "320px" },
        height: "290px",
        margin: "auto",
      }}
    >
      <Link
        to={`channel/${
          channelDetail.id.channelId
            ? channelDetail?.id.channelId
            : channelDetail?.id
        }`}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={
              channelDetail.snippet.thumbnails.high.url || demoProfilePicture
            }
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
              marginTop,
            }}
          />
          <Typography variant="h6">
            {channelDetail.snippet.title}
            <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(
                channelDetail?.statistics?.subscriberCount
              ).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
