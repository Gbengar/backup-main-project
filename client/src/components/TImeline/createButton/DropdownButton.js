import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Settings, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-toastify";

import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import "./createButtonn.scss";

const DropdownButton = ({ event, onEditSuccess }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setIsDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Settings />
        {anchorEl ? <ArrowDropUp /> : <ArrowDropDown />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
        <MenuItem onClick={handleEditClick}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "4px" }}
          >
            <span style={{ marginRight: "4px" }}>Edit</span>
            <EditIcon style={{ fontSize: 10 }} />
          </div>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
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
            <span style={{ marginRight: "4px" }}>Clone</span>
            <FileCopyIcon style={{ fontSize: 10 }} />
          </div>
        </MenuItem>
      </Menu>
      {isEditModalOpen && (
        <EditModal
          event={event}
          onEditSuccess={onEditSuccess}
          onClose={handleEditModalClose}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal event={event} onClose={handleDeleteModalClose} />
      )}
    </div>
  );
};

export default DropdownButton;
