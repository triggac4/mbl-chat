import { useState } from "react";
import PropTypes from "prop-types";
import { FaSignInAlt } from "react-icons/fa";
// import useAuthStore from "../../store/authStore";

// UI Components
import FormContainer from "./FormContainer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { errorFormatter } from "../../services/formatters";
import { useSendMessage } from "../../hooks/useMessages";
import TextArea from "../ui/TextArea";

const SendMessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    message: "",
    subject: "",
    email: "",
  });

  const { mutateAsync, isPending, error } = useSendMessage();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutateAsync(formData, {
        onSuccess: () => {
          onClose();
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <FormContainer
      title="Send Email"
      subtitle=""
      icon={FaSignInAlt}
      error={errorFormatter(error)}
      onSubmit={handleSubmit}
    >
      <Input
        id="subject"
        name="subject"
        type="text"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Enter The Subject Of This Email"
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Receiver Email Address"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email Address"
        required
      />
      <TextArea
        id="message"
        name="message"
        type="text"
        label="Message Content"
        value={formData.message}
        onChange={handleChange}
        placeholder="Enter Content"
        required
      />
      <Button type="submit" className="w-full" isLoading={isPending}>
        Send Message
      </Button>
    </FormContainer>
  );
};
SendMessageForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SendMessageForm;
