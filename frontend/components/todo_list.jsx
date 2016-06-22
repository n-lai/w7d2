const React = require('react');
const TodoStore = require('../stores/todo_store.js');


const TodoList = React.createClass({
  getInitialState() {
    return { list: TodoStore.all() };
  },

  todosChanged() {
    this.setState({ list: TodoStore.all() });
  },

  componentDidMount() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  render() {
    const newList = [];
    for (var x in this.state.list){
      newList.push(<ToDoListItem key={x} unique={x} item={this.state.list[x]}/>);
    }

    return (
      <div>
          {newList}
        <br></br>
      <ToDoForm/>
      </div>
    );

  }
});

const ToDoListItem = React.createClass({
  getInitialState() {
    return { focused: false };
  },

  handleClick() {
    this.setState({focused: !this.state.focused});
  },

  render(){
    return (
      <div className='container'>
        <div onClick={this.handleClick} key={this.props.unique + this.props.item.title}>{this.props.item.title}</div>
        <DoneButton item={this.props.item} />

        { this.state.focused ? <TodoDetailView item={this.props.item} className='pull-right'/> : null }
      </div>
    );
  }
});

const ToDoForm = React.createClass({
  getInitialState(){
    return {title: "", body: "", done: false};
  },
  updateTitle(e){
    this.setState({title: e.currentTarget.value});
  },
  updateBody(e){
    this.setState({body: e.currentTarget.value});
  },
  handleSubmit(){
    TodoStore.create(this.state);
    this.setState = {title: "", body: "", done: false};
  },
  render(){
    return(
      <div>
        <form className='form-group' onSubmit={this.handleSubmit}>
          <label for="Title">Title</label>
          <input id="Title" type="text" value={this.state.title} onChange={this.updateTitle} className='form-control'></input>
            <br></br>
            <label for="Body">Body</label>
          <input id="Body" type="text" value={this.state.body} onChange={this.updateBody} className='form-control'></input>
          <br></br>
          <input type="submit" value="Crackers" className="btn btn-primary"></input>
        </form>
      </div>
    );
  }
});

const DoneButton = React.createClass({
  handleDone() {
    TodoStore.toggleDone(this.props.item.id);
  },

  render() {
    let text = "Done";

    if (this.props.item.done){
      text = "Undo";
    }
    return (
      <button onClick={this.handleDone} name="done" className="btn btn-success btn-xs">{text}</button>
    );
  }
});

const TodoDetailView = React.createClass({
  handleDestroy(e) {
    TodoStore.destroy(this.props.item.id);
  },


  render() {

    return (
      <div>
        <div key={this.props.unique + this.props.item.body}>{this.props.item.body}</div>
        <button onClick={this.handleDestroy} name="Destroy" className='btn btn-danger btn-xs'>Destroy</button>
      </div>
    );

  }
});

module.exports = TodoList;
