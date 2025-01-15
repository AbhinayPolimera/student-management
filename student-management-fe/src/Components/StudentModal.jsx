import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import AddSchoolModal from "./SchoolModal";
import api from "../axios/axios";

const AddStudentModal = ({
  open,
  handleClose,
  setIsStudentAdded,
  editingStudent,
  setEditingStudent,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    school: "",
    major: "",
    isActive: true,
  });
  const [openAddSchool, setOpenAddSchool] = useState(false);
  const [schools, setSchools] = useState([]);

  const fetchSchools = () => {
    api
      .get("/schools")
      .then((response) => {
        console.log("response", response);
        setSchools(response.data.map((school) => school.name));
      }) // Ensure only school names are stored
      .catch((error) => console.error("Error fetching schools:", error));
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  useEffect(() => {
    if (schools.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        school: schools[0],
      }));
    }
  }, [schools]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleOpenAddSchool = () => setOpenAddSchool(true);
  const handleCloseAddSchool = () => setOpenAddSchool(false);

  const handleSave = () => {
    const payload = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      school: formData.school,
      major: formData.major,
      isActive: formData.isActive,
      dateModified: new Date(),
    };
    let method = "post";
    if (editingStudent) method = "put";
    const endpoint = formData.id ? `/Students/${formData.id}` : "/Students";

    api({
      method,
      url: endpoint,
      data: payload,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Success:", response.data);
        setIsStudentAdded(response);
        setEditingStudent(null);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsStudentAdded(null);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {formData.id ? "Edit Student" : "Add Student"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>School</InputLabel>
                <Select
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                >
                  {schools.map((school, index) => (
                    <MenuItem key={index} value={school}>
                      {school}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{
                  marginTop: "0.5rem",
                  color: "white",
                  backgroundColor: "blueviolet",
                  padding: "0.5rem",
                }}
                onClick={() => setOpenAddSchool(true)}
              >
                Add School
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    name="isActive"
                    onChange={handleCheckboxChange}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <AddSchoolModal
        open={openAddSchool}
        handleClose={handleCloseAddSchool}
        fetchSchools={fetchSchools}
      />
    </>
  );
};

export default AddStudentModal;
