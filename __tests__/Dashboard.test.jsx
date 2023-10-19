import { render, screen, fireEvent } from "@testing-library/react";
import UserPreview from "../src/components/dashboard/UserPreview";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

test("Renders the UserPreview component with user data", () => {
  const userData = { username: "testuser" };
  render(<UserPreview userData={userData} />);

  const welcomeText = screen.getByText("WELCOME");
  const usernameText = screen.getByText("Username: testuser");
  const logoutButton = screen.getByText("Logout");

  expect(welcomeText).toBeInTheDocument();
  expect(usernameText).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
});

test('Signs out when the "Logout" button is clicked', async () => {
  const userData = { username: "testuser" };
  render(<UserPreview userData={userData} />);

  const logoutButton = screen.getByText("Logout");
  fireEvent.click(logoutButton);
});
