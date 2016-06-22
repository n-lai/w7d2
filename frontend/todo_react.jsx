const React = require('react');
const ReactDOM = require('react-dom');
const TodoList = require('./components/todo_list.jsx');

const TodoReact = React.createClass({
  render() {
    return(
      <div>
        <TodoList />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<TodoReact />, document.getElementById('main'));
});
