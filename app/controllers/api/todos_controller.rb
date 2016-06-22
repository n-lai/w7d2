class Api::TodosController < ApplicationController
  def index
    render json: Todo.all
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    todo = Todo.create!(todo_params)

    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_params)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])

    if todo
      todo.destroy
      render json: {message: "Deleted"}
    else
      render json: {message: "Not able to delete"}
    end

  end

  private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
