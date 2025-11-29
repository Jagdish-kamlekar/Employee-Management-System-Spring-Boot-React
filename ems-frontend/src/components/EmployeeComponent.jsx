import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const { id } = useParams()
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' })
  const [saving, setSaving] = useState(false)

  const navigator = useNavigate()
  const footerHeight = 64 // keep in sync with FooterComponent

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          const e = response.data || {}
          setFirstName(e.firstName || '')
          setLastName(e.lastName || '')
          setEmail(e.email || '')
        })
        .catch((error) => console.error(error))
    }
  }, [id])

  function validateForm() {
    let valid = true
    const errs = { ...errors }

    if (firstName.trim()) errs.firstName = ''
    else { errs.firstName = 'First Name is required'; valid = false }

    if (lastName.trim()) errs.lastName = ''
    else { errs.lastName = 'Last Name is required'; valid = false }

    if (email.trim()) errs.email = ''
    else { errs.email = 'Email is required'; valid = false }

    setErrors(errs)
    return valid
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault()
    if (!validateForm()) return

    const employee = { firstName, lastName, email }
    setSaving(true)

    const action = id ? updateEmployee(id, employee) : createEmployee(employee)

    action
      .then((response) => {
        // success
        navigator('/employees')
      })
      .catch((error) => {
        console.error(error)
        // optionally show a toast here
      })
      .finally(() => setSaving(false))
  }

  function pageTitle() {
    return id ? 'Update Employee' : 'Add Employee'
  }

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: footerHeight + 24 }}>
      <div className="row">
        <div className="card col-12 col-md-8 offset-md-2 shadow-sm" style={{ borderRadius: 10, overflow: 'hidden' }}>
          {/* Card header */}
          <div
            className="p-3 d-flex justify-content-between align-items-center"
            style={{
              background: 'linear-gradient(90deg,#0d47a1,#1976d2)',
              color: '#fff'
            }}
          >
            <h4 className="mb-0" style={{ fontWeight: 700 }}>{pageTitle()}</h4>
            <span className="badge bg-white text-primary" style={{ fontWeight: 700 }}>
              {id ? 'Edit Mode' : 'Create Mode'}
            </span>
          </div>

          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee} noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Enter Employee First Name"
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Enter Employee Last Name"
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter Employee Email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigator('/employees')}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success" disabled={saving}>
                  {saving ? 'Saving...' : (id ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
