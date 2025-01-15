import logo from "./logo.svg";
import "./App.css";
import StudentGrid from "./Components/StudentTable";
import { Grid } from "@mui/material";

function App() {
  return (
    <div style={{ height: "100vh", margin: "1rem", padding: "1rem" }}>
      <Grid md={12}>
        <StudentGrid />
      </Grid>
    </div>
  );
}

export default App;
