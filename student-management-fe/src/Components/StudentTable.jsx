import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
} from "@mui/material";
import api from "../axios/axios";
import AddStudentModal from "./StudentModal";
import AddSchoolModal from "./SchoolModal";
import "./StudentGrid.css";

function StudentGrid() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isStudentAdded, setIsStudentAdded] = useState(null);

  useEffect(() => {
    fetchStudents();
    if (isStudentAdded) {
      setIsStudentAdded(null);
    }
  }, [isStudentAdded]);

  const fetchStudents = () => {
    api
      .get("/students")
      .then((response) => {
        console.log("response", response);
        setStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const handlePageChange = (event, value) => setPage(value);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleOpenAddStudent = (student = null) => {
    if (student) setEditingStudent(student);
    setOpenAddStudent(true);
  };

  const handleCloseAddStudent = () => {
    setEditingStudent(null);
    setOpenAddStudent(false);
  };

  const handleDelete = (id) => {
    api
      .delete(`/students/${id}`)
      .then(() => fetchStudents())
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <div className="student-grid-container">
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenAddStudent(null)}
          >
            Add Student
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            value={search}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </Grid>
      </Grid>

      <TableContainer className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Check</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Date Modified</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .filter((student) =>
                `${student.firstName} ${student.lastName}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>{student.dateModified}</TableCell>
                  <TableCell>{student.isActive ? "True" : "False"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenAddStudent(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(students.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        className="pagination"
      />

      <AddStudentModal
        open={openAddStudent}
        handleClose={handleCloseAddStudent}
        fetchStudents={fetchStudents}
        setIsStudentAdded={setIsStudentAdded}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}

export default StudentGrid;
