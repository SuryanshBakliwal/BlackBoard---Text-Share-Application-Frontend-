import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === 'name') {
      if (!trimmedValue) return 'Name is required.';
      if (trimmedValue.length < 2) return 'Name must be at least 2 characters.';
    }

    if (name === 'email') {
      if (!trimmedValue) return 'Email is required.';
      if (!EMAIL_REGEX.test(trimmedValue)) return 'Enter a valid email address.';
    }

    if (name === 'password') {
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
        return 'Password must include at least one letter and one number.';
      }
    }

    return '';
  };

  const validateAllFields = () => ({
    name: validateField('name', formData.name),
    email: validateField('email', formData.email),
    password: validateField('password', formData.password),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const fieldErrors = validateAllFields();
    setErrors(fieldErrors);

    const hasError = Object.values(fieldErrors).some(Boolean);
    if (hasError) return;

    // Auth API integration can be added here.
    console.log('Signup submitted:', formData);
  };

  return (
    <main className="bb-main flex-fill d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <section className="bb-main-card p-4 p-md-5 rounded-4">
              <h1 className="bb-title mb-2">Create Account</h1>
              <p className="bb-subtitle mb-4">Sign up with your name, email, and password.</p>

              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="signupName" className="form-label bb-form-label">
                    Name
                  </label>
                  <input
                    id="signupName"
                    name="name"
                    type="text"
                    className={`form-control bb-form-input ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby="signupNameError"
                  />
                  {errors.name && (
                    <div id="signupNameError" className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="signupEmail" className="form-label bb-form-label">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    name="email"
                    type="email"
                    className={`form-control bb-form-input ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby="signupEmailError"
                  />
                  {errors.email && (
                    <div id="signupEmailError" className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="signupPassword" className="form-label bb-form-label">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    className={`form-control bb-form-input ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="At least 8 chars with letters and numbers"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby="signupPasswordError"
                  />
                  {errors.password && (
                    <div id="signupPasswordError" className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn bb-primary-btn rounded-pill w-100 py-2">
                  Sign Up
                </button>
              </form>

              <p className="bb-auth-switch mt-4 mb-0">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>

              {isSubmitted && !Object.values(errors).some(Boolean) && (
                <p className="bb-form-success mt-3 mb-0">Validation passed. Ready to register.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
