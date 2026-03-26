import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/signup.css";

function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    homeCountry: "",
    studyProgram: "",
    languages: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1 && !selectedRole) return;
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      role: selectedRole,
      ...formData,
    };

    console.log("Signup data:", finalData);
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <Link to="/" className="signup-brand">
          <div className="signup-brand-icon">
            <Users size={22} />
          </div>
          <h1>KazakhBuddy</h1>
        </Link>

        <div className="signup-card">
          <h2>Create Your Account</h2>
          <p className="signup-step-text">Step {step} of 3</p>

          <div className="signup-progress">
            <span className={step >= 1 ? "active" : ""}></span>
            <span className={step >= 2 ? "active" : ""}></span>
            <span className={step >= 3 ? "active" : ""}></span>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {step === 1 && (
              <div className="signup-step-content">
                <p className="signup-section-label">I am...</p>

                <div className="role-grid">
                  <button
                    type="button"
                    className={`role-card ${
                      selectedRole === "international" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRole("international")}
                  >
                    <div className="role-icon">
                      <Globe size={28} />
                    </div>
                    <h3>International Student</h3>
                    <p>Looking for a local buddy</p>
                  </button>

                  <button type="button" className={`role-card ${
                      selectedRole === "local" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRole("local")}>
                    <div className="role-icon">
                      <MapPin size={28} />
                    </div>
                    <h3>Local Student</h3>
                    <p>Want to be a buddy</p>
                  </button>
                </div>

                <button type="button" className="signup-primary-btn full-width"
                  onClick={handleNext}>
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="signup-step-content">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">University Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="homeCountry">Home Country</label>
                  <input
                    id="homeCountry"
                    name="homeCountry"
                    type="text"
                    placeholder="e.g., Japan, Brazil, India"
                    value={formData.homeCountry}
                    onChange={handleChange}
                  />
                </div>

                <div className="signup-buttons-row">
                  <button type="button" className="signup-secondary-btn"
                    onClick={handleBack}>
                    <ChevronLeft size={18} />
                    Back
                  </button>

                  <button type="button" className="signup-primary-btn"
                    onClick={handleNext}>
                    Continue
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="signup-step-content">
                <div className="form-group">
                  <label htmlFor="studyProgram">Study Program</label>
                  <input
                    id="studyProgram"
                    name="studyProgram"
                    type="text"
                    placeholder="e.g., Computer Science, Business"
                    value={formData.studyProgram}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="languages">Languages Spoken</label>
                  <input
                    id="languages"
                    name="languages"
                    type="text"
                    placeholder="e.g., English, German, Spanish"
                    value={formData.languages}
                    onChange={handleChange}
                  />
                  <small>Separate with commas</small>
                </div>

                <div className="form-group">
                  <label htmlFor="hobbies">Hobbies & Interests</label>
                  <input
                    id="hobbies"
                    name="hobbies"
                    type="text"
                    placeholder="e.g., Hiking, Photography, Gaming"
                    value={formData.hobbies}
                    onChange={handleChange}
                  />
                  <small>Separate with commas</small>
                </div>

                <div className="signup-buttons-row">
                  <button type="button" className="signup-secondary-btn"
                    onClick={handleBack}>
                    <ChevronLeft size={18} />
                    Back
                  </button>

                  <button type="submit" className="signup-primary-btn">
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="signup-footer-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;