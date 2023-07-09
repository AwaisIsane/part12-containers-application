import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";
import blogSrv from "../services/blogs";
describe("test for add blog component", () => {
  test("new blog created with right details", async () => {
    const newBlog = {
      title: "hello test",
      author: "test Uset",
      url: "google.com",
    };
    const nmessage = jest.fn();
    const { container } = render(<AddBlog setNotificationMessage={nmessage} />);
    const mockHandler = jest.spyOn(blogSrv, "postNew");
    const title = container.querySelector('input[name="title"]');
    const author = container.querySelector('input[name="author"]');
    const url = container.querySelector('input[name="url"]');
    const button = screen.getByText("create");

    const user = userEvent.setup();
    await user.type(title, newBlog.title);
    await user.type(author, newBlog.author);
    await user.type(url, newBlog.url);
    await user.click(button);

    expect(mockHandler).toHaveBeenCalledWith(newBlog);
  });
});
