import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogSrv from "../services/blogs";
describe("test for blog component", () => {
  test("title author displayed likes/url not displayed by default", () => {
    const blog = {
      title: "Component testing is done with react-testing-libray",
      author: "viki",
      likes: 3,
      url: "google.com",
      username: "testuser",
    };
    render(<Blog blog={blog} />);
    const element = screen.queryByText(
      "Component testing is done with react-testing-libray viki"
    );
    const likes = screen.queryByText("3");
    const url = screen.queryByText("google.com");
    expect(url).toBeNull();
    expect(element).toBeDefined();
    expect(likes).toBeNull();
  });

  test("url likes shown when clicked on view", async () => {
    const blog = {
      title: "Component testing is done with react-testing-libray",
      author: "viki",
      likes: 3,
      url: "google.com",
      username: "testuser",
      user: {
        name: "leo messi",
        username: "testuser",
      },
    };
    render(<Blog blog={blog} />);
    const button = screen.getByText("view");
    const user = userEvent.setup();

    await user.click(button);
    const likes = screen.getByText("Likes:3");
    const url = screen.getByText("google.com");
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("clicking on button twice calls likes function twice", async () => {
    const blog = {
      title: "Component testing is done with react-testing-libray",
      author: "viki",
      likes: 3,
      url: "google.com",
      username: "testuser",
      user: {
        name: "leo messi",
        username: "testuser",
      },
    };
    const mockHandler = jest.spyOn(blogSrv, "likePost");
    render(<Blog blog={blog} />);
    const user = userEvent.setup();

    const button1 = screen.getByText("view");
    await user.click(button1);
    const button = screen.getByText("like");
    await user.click(button);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
