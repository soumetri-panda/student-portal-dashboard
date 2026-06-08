import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    course: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.roll ||
      !formData.course
    ) {
      alert("Please fill all fields");
      return;
    }

    setStudents([
      ...students,
      {
        ...formData,
        id: Date.now(),
      },
    ]);

    setFormData({
      name: "",
      roll: "",
      course: "",
    });
  };

  const deleteStudent = (id) => {
    setStudents(
      students.filter(
        (student) => student.id !== id
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <div className="logo">
          Student Portal
        </div>

        <nav>
          <button
            onClick={() =>
              setActivePage("home")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              setActivePage("students")
            }
          >
            Students
          </button>

          <button
            onClick={() =>
              setActivePage("search")
            }
          >
            Search
          </button>

          <button
            onClick={() =>
              setActivePage("about")
            }
          >
            About
          </button>
        </nav>
      </header>

      <div className="container">

        {activePage === "home" && ( 
          <div className="hero">
            <h1>
              Welcome to Student Portal Dashboard
            </h1>

            <p>
              Manage students, organize
              records and search data
              efficiently with a modern
              dashboard experience.
            </p>

            <div className="counter-card">
              <h2>Total Students</h2>
              <span>
                {students.length}
              </span>
            </div>
          </div>
        )}

        {activePage === "students" && (
          <>
            <div className="glass-card">
              <h2>
                Add New Student
              </h2>

              <form
                onSubmit={addStudent}
                className="form-grid"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={formData.name}
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  name="roll"
                  placeholder="Roll Number"
                  value={formData.roll}
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  value={formData.course}
                  onChange={
                    handleChange
                  }
                />

                <button
                  type="submit"
                  className="add-btn"
                >
                  Add Student
                </button>
              </form>
            </div>

            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Course</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map(
                    (student) => (
                      <tr
                        key={
                          student.id
                        }
                      >
                        <td>
                          <div className="avatar">
                            {student.name
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>
                        </td>

                        <td>
                          {
                            student.name
                          }
                        </td>

                        <td>
                          {
                            student.roll
                          }
                        </td>

                        <td>
                          {
                            student.course
                          }
                        </td>

                        <td>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteStudent(
                                student.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activePage === "search" && (
          <div className="glass-card">
            <h2>
              Search Students
            </h2>

            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <div className="student-grid">
              {filteredStudents.map(
                (student) => (
                  <div
                    className="student-card"
                    key={
                      student.id
                    }
                  >
                    <div className="avatar large">
                      {student.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <h3>
                      {
                        student.name
                      }
                    </h3>

                    <p>
                      Roll:
                      {
                        student.roll
                      }
                    </p>

                    <p>
                      Course:
                      {
                        student.course
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activePage === "about" && (
          <div className="glass-card about">
            <h1>
              About This Project
            </h1>

            <p>
              Student Portal Dashboard
              is a ReactJS application
              developed to manage
              student records using
              modern front-end
              technologies.
            </p>

            <div className="features">
              <div>
                ReactJS
              </div>
              <div>
                LocalStorage
              </div>
              <div>
                Responsive UI
              </div>
              <div>
                State Management
              </div>
            </div>
          </div>
        )}
      </div>

      <footer>
        Made by Soumetri Panda ©
        2026
      </footer>
    </>
  );
}
export default App;