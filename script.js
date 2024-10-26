document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Mark task as completed
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Remove task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Hapus';
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.childNodes[0].textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            // Mark task as completed
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            // Remove task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                li.remove();
                saveTasks();
            });

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }
});