import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import Todo from "../Todos/Todo"

test("renders todo correctly", () => {
    const todo = {
        text: "To Be DELETED",
        done: false,
    }
    const deleteTodo = jest.fn()
    const completeTodo = jest.fn()

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

    expect(screen.getByText("To Be DELETED")).toBeInTheDocument()
    expect(screen.getByText("This todo is not done")).toBeInTheDocument()

})