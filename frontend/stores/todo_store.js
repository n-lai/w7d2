let _todos = {};
let _callbacks = [];

const TodoStore = {
  changed() {
    for (let i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  addChangedHandler(handler) {
    _callbacks.push(handler);
  },

  removeChangeHandler(handler) {
    const index = _callbacks.indexOf(handler);
    _callbacks.splice(index, 1);
  },

  all() {
    return $.extend({}, _todos);
  },

  fetch() {
    $.ajax({
      url: '/api/todos',
      method: 'GET',
      success: function(objects) {
        objects.forEach(object => {
          _todos[object.id] = object;
        });
        TodoStore.changed();
      }
    });
  },

  create(object) {
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: {todo: object},
      success: function(obj) {
        _todos[obj.id] = obj;
        TodoStore.changed();
      }
    });
  },

  destroy(id) {
    const todo = _todos[id];
    if (todo) {
      $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + id,
        success: function() {
          delete _todos[id];
          TodoStore.changed();
        }
      });
    }
  },

  toggleDone(id) {
    const todo = _todos[id];
    const state = !todo.done;

    if (todo) {
      $.ajax({
        method: 'PATCH',
        url: '/api/todos/' + id,
        data: {todo: { done: state } },
        success: function() {
          todo.done = state;
          TodoStore.changed();
        }
      });

    }
  }

};

module.exports = TodoStore;
window.TodoStore = TodoStore;
