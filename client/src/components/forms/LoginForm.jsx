import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useRedirectToDashboard, useSignIn } from "../../hooks/useAuth";
import useAuthStore from "../../store/authStore";

// UI Components
import FormContainer from "./FormContainer";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  useRedirectToDashboard();
  const { mutateAsync, isPending } = useSignIn();
  const error = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <FormContainer
      title="Welcome Back"
      subtitle="Sign in to your account"
      icon={FaSignInAlt}
      error={error}
      onSubmit={handleSubmit}
    >
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
        placeholder="Enter your password"
        required
      />

      <Button type="submit" className="w-full" isLoading={isPending}>
        Sign In
      </Button>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginForm;
