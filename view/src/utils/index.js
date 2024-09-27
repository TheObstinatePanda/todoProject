/* eslint-disable */
export const createTodo = async (todo) => {
    try {
        const res = await fetch('/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        const result = await res.json();
        console.log(`Results from the server: ${result}.`)
        if (!res.ok) {
            throw new Error(result.error || 'Failed to create todo');
        }
        return result;
    } catch (err) {
        const res = await fetch('/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        console.error('Error Creating todo:', err);
        return { error: res };
    }
};

export const getTodos = async () => {
    try {
        const res = await fetch('/api/todos');
        console.log('this is the response: ' + res);
        if (!res.ok) {
            throw new Error(res.error || 'Failed to get todos');
        }
        const data = await res.json();
        console.log('Todos: ', data);
        if (!Array.isArray(data)) {
            throw new Error('Fetched data is not an array');
        }
        return data;
    } catch (err) {
        console.error('Error fetching todos: ', err);
        return []
    }
};

export const removeTodo = async (id) => {
    try {
        const res = await fetch(`api/todo/${id}`, {
            method: 'DELETE',
        });
        return 'Deleted'
    } catch (err) {
        return { err };
    }
};