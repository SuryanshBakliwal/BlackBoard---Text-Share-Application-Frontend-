import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === 'email') {
      if (!trimmedValue) return 'Email is required.';
      if (!EMAIL_REGEX.test(trimmedValue)) return 'Enter a valid email address.';
    }

    if (name === 'password') {
      if (!value) return 'Password is required.';
      if (value.length < 6) return 'Password must be at least 6 characters.';
    }

    return '';
  };

  const validateAllFields = () => ({
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
    console.log('Login submitted:', formData);
  };

  return (
    <main className="bb-main flex-fill d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <section className="bb-main-card p-4 p-md-5 rounded-4">
              <h1 className="bb-title mb-2">Sign In</h1>
              <p className="bb-subtitle mb-4">Access your account using your email and password.</p>

              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label bb-form-label">
                    Email
                  </label>
                  <input
                    id="loginEmail"
                    name="email"
                    type="email"
                    className={`form-control bb-form-input ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby="loginEmailError"
                  />
                  {errors.email && (
                    <div id="loginEmailError" className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="loginPassword" className="form-label bb-form-label">
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    name="password"
                    type="password"
                    className={`form-control bb-form-input ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby="loginPasswordError"
                  />
                  {errors.password && (
                    <div id="loginPasswordError" className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn bb-primary-btn rounded-pill w-100 py-2">
                  Sign In
                </button>
              </form>

              <p className="bb-auth-switch mt-4 mb-0">
                Don't have an account? <Link to="/signup">Create one</Link>
              </p>

              {isSubmitted && !Object.values(errors).some(Boolean) && (
                <p className="bb-form-success mt-3 mb-0">Validation passed. Ready to login.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
