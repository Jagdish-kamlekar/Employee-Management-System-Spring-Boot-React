import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const navigator = useNavigate();
  const footerHeight = 64 // must match FooterComponent height

  useEffect(() => { getAllEmployees(); },[])

  function getAllEmployees(){
    setLoading(true);
    listEmployees()
      .then(res => setEmployees(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  function addNewEmployee(){ navigator('/add-employee') }
  function updateEmployee(id){ navigator(`/edit-employee/${id}`) }

  function removeEmployee(id){
    if(!window.confirm('Are you sure you want to delete this employee?')) return;
    deleteEmployee(id).then(() => getAllEmployees()).catch(err => console.error(err))
  }

  const filtered = employees.filter(emp => {
    const q = query.trim().toLowerCase()
    if(!q) return true
    return (
      (emp.firstName || '').toLowerCase().includes(q) ||
      (emp.lastName || '').toLowerCase().includes(q) ||
      (emp.email || '').toLowerCase().includes(q) ||
      String(emp.id).includes(q)
    )
  })

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: footerHeight + 24 }}>
      <div className="card mb-4 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center"
             style={{
               background: 'linear-gradient(90deg,#0d47a1,#1976d2)',
               color: 'white',
               borderTopLeftRadius: 8,
               borderTopRightRadius: 8
             }}>
          <h5 className="mb-0" style={{ fontWeight: 700 }}>List Of Employees</h5>
          <span className="badge bg-white text-primary" style={{ fontWeight: 700 }}>
            Total: {employees.length}
          </span>
        </div>

        <div className="card-body">
          <div className="row g-2 align-items-center mb-3">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email or id..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4 d-flex gap-2 justify-content-md-end">
              <button className="btn btn-outline-secondary" onClick={() => setQuery('')}>Clear</button>
              <button className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
            </div>
          </div>

          {/* table container with rounded corners so the header radius shows */}
          <div className="table-responsive shadow-sm rounded" style={{ overflow: 'hidden' }}>
            <table className="table table-hover mb-0 align-middle">
              <thead
                style={{
                  background: 'linear-gradient(90deg,#111827,#1f2937)', // dark gradient
                  color: '#fff',
                  fontSize: 14
                }}
              >
                <tr>
                  <th style={{ whiteSpace: 'nowrap', width: '8%', padding: '16px', fontWeight: 700 }}>Employee ID</th>
                  <th style={{ whiteSpace: 'nowrap', width: '24%', padding: '16px', fontWeight: 700 }}>First Name</th>
                  <th style={{ whiteSpace: 'nowrap', width: '24%', padding: '16px', fontWeight: 700 }}>Last Name</th>
                  <th style={{ whiteSpace: 'nowrap', width: '30%', padding: '16px', fontWeight: 700 }}>Email</th>
                  <th className="text-center" style={{ whiteSpace: 'nowrap', width: '14%', padding: '16px', fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
                )}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No employees found. Add a new employee to get started.
                    </td>
                  </tr>
                )}

                {!loading && filtered.map(employee => (
                  <tr key={employee.id}>
                    <td className="fw-semibold" style={{ padding: '14px' }}>{employee.id}</td>
                    <td style={{ padding: '14px' }}>{employee.firstName}</td>
                    <td style={{ padding: '14px' }}>{employee.lastName}</td>
                    <td style={{ padding: '14px' }}>{employee.email}</td>
                    <td className="text-center" style={{ padding: '14px' }}>
                      <div className="d-inline-flex gap-2">
                        <button className="btn btn-sm btn-outline-success" onClick={() => updateEmployee(employee.id)}>Update</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeEmployee(employee.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> {/* table-responsive */}
        </div> {/* card-body */}
      </div> {/* card */}

      {/* spacer to prevent fixed footer overlap */}
      <div style={{ height: footerHeight }} />
    </div>
  )
}

export default ListEmployeeComponent;
