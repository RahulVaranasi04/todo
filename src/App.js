import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [todoItem, setTodoItem] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('task');
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    
    // Prevent adding empty tasks
    if (!todoItem.trim()) return;

    // Create new task object
    const newTask = {
      id: taskList.length,
      name: todoItem,
      completed: false
    };

    // Update task list
    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    
    // Save to localStorage
    localStorage.setItem('task', JSON.stringify(updatedTasks));
    
    // Reset input
    setTodoItem('');
  };

  const removeTask = (indexToRemove) => {
    const updatedTasks = taskList.filter((_, index) => index !== indexToRemove);
    setTaskList(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  const markDone = (taskToToggle) => {
    const updatedTasks = taskList.map(task => 
      task.id === taskToToggle.id 
        ? { ...task, completed: !task.completed } 
        : task
    );

    // Reorder tasks to move completed tasks to the end
    const sortedTasks = updatedTasks.sort((a, b) => 
      a.completed === b.completed ? 0 : (a.completed ? 1 : -1)
    );

    setTaskList(sortedTasks);
    localStorage.setItem('task', JSON.stringify(sortedTasks));
  };

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <div className="todo-header">
          <h1>Todo List</h1>
        </div>
        
        <div className="todo-content">
          <form onSubmit={addTask} className="todo-form">
            <input 
              className="todo-input"
              placeholder="Add a new task"
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
            />
            <button 
              type="submit"
              className="todo-add-button"
            >
              Add
            </button>
          </form>

          <div className="task-list">
            {taskList.map((task, index) => (
              <div 
                key={task.id} 
                className="task-item"
              >
                <p 
                  className={`task-text ${task.completed ? 'completed' : ''}`}
                  onClick={() => markDone(task)}
                >
                  {task.name}
                </p>
                <button 
                  type="button" 
                  className="task-delete-button"
                  onClick={() => removeTask(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;