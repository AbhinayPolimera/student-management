import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import api from "../axios/axios";

const AddSchoolModal = ({ open, handleClose, fetchSchools }) => {
  const initialForm = {
    id: 0,
    name: "",
    address1: "",
    city: "",
    state: "",
    zipCode: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSchool = () => {
    const payload = {
      id: formData.id,
      name: formData.name,
      address1: formData.address1,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      address2: "default",
    };

    api
      .post("/Schools", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        fetchSchools();
        setFormData(initialForm);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding school:", error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add School</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Address 1"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              label="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddSchool} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSchoolModal;
