import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useRedirectToDashboard, useRegister } from "../../hooks/useAuth";
import useAuthStore from "../../store/authStore";

// UI Components
import FormContainer from "./FormContainer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { errorFormatter } from "../../services/formatters";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  // useRedirectToDashboard();

  const { mutateAsync, isPending, error } = useRegister();
  // const error = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear password match error when typing in either password field
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      // Remove confirmPassword before sending to server
      // const { confirmPassword, ...userData } = formData;
      await mutateAsync(formData);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <FormContainer
      title="Create Account"
      subtitle="Join our messaging platform"
      icon={FaUserPlus}
      error={errorFormatter(error)}
      onSubmit={handleSubmit}
    >
      <Input
        id="username"
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Choose a username"
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        minLength={6}
        required
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        error={passwordError}
        required
      />

      <Button type="submit" className="w-full" isLoading={isPending}>
        Create Account
      </Button>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default RegisterForm;
