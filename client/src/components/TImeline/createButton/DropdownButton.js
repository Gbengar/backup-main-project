import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Settings, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const DropdownButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Settings />
        {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "4px" }}
          >
            <span style={{ marginRight: "4px" }}>Edit</span>
            <EditIcon style={{ fontSize: 10 }} />
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "4px" }}
          >
            <span style={{ marginRight: "4px" }}>Delete</span>
            <DeleteIcon style={{ fontSize: 10 }} />
          </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "4px" }}
          >
            <span style={{ marginRight: "4px" }}>Clone </span>
            <FileCopyIcon style={{ fontSize: 10 }} />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownButton;
