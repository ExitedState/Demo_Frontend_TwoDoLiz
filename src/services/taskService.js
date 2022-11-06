const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`;

export const loadTasks = async () => {
    const res = await fetch(baseUrl);
    return await res.json();
}

export const getTasks = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);
    return await res.json();
}

export const createTask = async (task) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: task.title,
            detail: task.detail,
            completed: task.completed,
            completedAt : task.completAt,
            tag : task.tag,
        }),
    });
    return await res.json();
};

export const updateTask = async (task) => {
    const res = await fetch(`${baseUrl}/${task.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: task.id,
            title: task.title,
            detail: task.detail,
            completed: task.completed,
            completedAt : task.completAt,
            tag : task.tag,
        }),
    });
    return await res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
};