document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Load tasks from local storage
    loadTasks();

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    addTaskBtn.addEventListener('click', function () {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    function addTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const completeBtn = document.createElement('span');
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(completeBtn);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span:nth-child(2)').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                if (task.completed) {
                    taskItem.classList.add('completed');
                }

                const completeBtn = document.createElement('span');
                completeBtn.className = 'complete-btn';
                completeBtn.addEventListener('click', function () {
                    taskItem.classList.toggle('completed');
                    saveTasks();
                });

                const taskText = document.createElement('span');
                taskText.textContent = task.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '×';
                deleteBtn.addEventListener('click', function () {
                    taskList.removeChild(taskItem);
                    saveTasks();
                });

                taskItem.appendChild(completeBtn);
                taskItem.appendChild(taskText);
                taskItem.appendChild(deleteBtn);

                taskList.appendChild(taskItem);
            });
        }
    }
});
