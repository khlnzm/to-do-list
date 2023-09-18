import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TodoForm = () => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [task, setTask] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const todo = { task };

    const response = await fetch("/api/todoList/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTask("");
      setError(null);
      setEmptyFields([])
      dispatch({type: 'CREATE_TODO', payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task: </label>
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        className={emptyFields.includes('task') ? 'error': ''}
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoForm;
