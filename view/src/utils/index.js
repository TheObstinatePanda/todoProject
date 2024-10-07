/* eslint-disable */
export const createTodo = async (todo) => {
    console.log('creating a todo: ' + JSON.stringify(todo))
    try {
        console.log('trying to create a todo...')
        const res = await fetch('/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        console.log(res.ok);
        console.log('fetch complete')
        if (!res.ok) {
            throw new Error(result.error || 'Failed to create todo');
        }
        const result = await res.json();
        console.log(`Results from the server: `, result) 
        return result;
    } catch (err) {
        console.error('Error Creating todo:', err);
        return { error: res };
    }
};

export const getTodos = async () => {
    try {
        const res = await fetch('/api/todos');
        
        if (!res.ok) {
            throw new Error(res.error || 'Failed to get todos');
        }
        const data = await res.json();
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
    console.log('removing todo ', id);
    try {
        const res = await fetch(`api/todo/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Failed to delete todo');
        }
        const result = await res.json()
        return result;
    } catch (err) {
        console.error('Error deleting todo: ', err);
        return { err };
    }
};