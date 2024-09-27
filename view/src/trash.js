//this file is to drop in suggestions from copilot for study and verification

<ol>
                {console.log('Rendering todoList:', todoList)} {/* Log todoList */}
                {todoList.map((todoItem, index) => {
                    console.log('Mapping todoItem:', todoItem); // Log each todoItem
                    if (!todoItem || !todoItem.description) {
                        console.error('Invalid todoItem:', todoItem);
                        return null; // Skip rendering if todoItem is invalid
                    }
                    return (
                        <li
                            key={todoItem.todo_id}
                            onClick={() => handleDelete(todoItem.todo_id)}
                        >
                            {todoItem.description}
                        </li>
                    );
                })}
            </ol>