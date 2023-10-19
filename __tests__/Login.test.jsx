import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../src/pages/login";
import LoginForm from "../src/components/authentification/LoginForm";

test("Renders the login form", () => {
  render(<Login />);
  const formTitle = screen.getByText("LOGIN");
  expect(formTitle).toBeInTheDocument();
});

test("Fails to submit the form with empty fields", async () => {
  render(<LoginForm />);
  const submitButton = screen.getByText("Login");
  fireEvent.click(submitButton);
  await waitFor(() => {
    const usernameErrorMessage =
      screen.getByText("Username must be at least 2 characters.") ||
      screen.getByText("Password must be at least 2 characters.");
    expect(usernameErrorMessage).toBeInTheDocument();
  });
});

test("Submits the form with correct credentials", async () => {
  // Mock next-auth signIn
  jest.mock("next-auth/react", () => ({
    signIn: async (method, data) => {
      if (data.username === "testuser" && data.password === "password123") {
        // Authentication succeeded
      } else {
        throw new Error("Invalid credentials");
      }
    },
  }));

  render(<LoginForm />);
  const usernameInput = screen.getByPlaceholderText("Your username");
  const passwordInput = screen.getByPlaceholderText("Your password");
  const submitButton = screen.getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = screen.queryByText("Server error");
    expect(errorMessage).toBeNull();
  });
});
