import React, { SetStateAction } from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

type sidebarType = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
};
const Sidebar = ({ selectedCategory, setSelectedCategory }: sidebarType) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        width: { xs: "100vw", md: "10em" },
        flexDirection: { md: "column" },
      }}
    >
      {categories?.map((item, i) => (
        <button
          className="category-btn"
          key={i}
          style={{
            background:
              item.name === selectedCategory ? "#FC1503" : "transparent",
            color: "white",
            minWidth: "fit-content",
          }}
          onClick={() => setSelectedCategory(item.name)}
        >
          <span
            style={{
              color: item.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {item.icon}
          </span>
          <span
            style={{
              opacity: item.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {item.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
