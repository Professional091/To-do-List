document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => addTaskToDOM(task));

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            addTaskToDOM(task);
            saveTasks();
            newTaskInput.value = '';
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function() {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                li.firstChild.nodeValue = task.text;
                saveTasks();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        li.addEventListener('click', function() {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
