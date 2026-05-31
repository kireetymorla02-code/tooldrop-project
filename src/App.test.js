import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ToolDrop splash", () => {
  render(<App />);
  expect(screen.getByText(/TOOLDROP/i)).toBeInTheDocument();
  expect(screen.getByText(/Precision Service\. Delivered\./i)).toBeInTheDocument();
});
