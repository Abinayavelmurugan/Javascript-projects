class ToDo {
    constructor() {
        this.tasks = [];              // Array to store pending tasks
        this.completedTasks = [];      // Array to store completed tasks
    }

    // Add a new task
    addTask() {
        const taskInput = document.getElementById('taskinput');
        const text = taskInput.value.trim();  // Get the input value

        if (text === "") {  // Ensure the task is not empty
            alert('Enter a task');
            return;
        }

        const newTask = {
            id: Date.now(),            // Unique task ID
            task: text,                // Task description
            isCompleted: false,        // Initially not completed
            completedDate: null        // No completion date initially
        };

        this.tasks.push(newTask);       // Add task to the tasks array
        taskInput.value = '';           // Clear input field
        this.showTasks();               // Update task list
    }

    // Show all pending tasks
    showTasks() {
        const taskList = document.getElementById('tasklist');
        taskList.innerHTML = ''; // Clear task list before showing updated tasks

        this.tasks.forEach(t => {
            const li = document.createElement('li');  // Create list item
            li.innerHTML = `
                <input class="check" type="checkbox" onchange="todo.completeTask(${t.id})"> <!-- Checkbox for completion -->
                <span>${t.task}</span>
            `;
            taskList.appendChild(li);  // Append to the task list
        });
    }

    // Show completed tasks
    showCompletedTasks() {
        const completedList = document.getElementById('completedlist');
        completedList.innerHTML = '';  // Clear completed list

        this.completedTasks.sort((a, b) => a.completedDate - b.completedDate);  // Sort by completion date

        this.completedTasks.forEach(t => {
            const li = document.createElement('li');  // Create list item for completed tasks
            li.innerHTML = `
                <span>${t.task}</span> <small>(Completed on: ${new Date(t.completedDate).toLocaleString()})</small>
            `;
            completedList.appendChild(li);  // Append to the completed task list
        });
    }

    // Mark a task as completed
    completeTask(taskId) {
        // Find the task and remove it from the 'tasks' list
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const completedTask = this.tasks.splice(taskIndex, 1)[0];  // Remove from pending tasks
            completedTask.isCompleted = true;
            completedTask.completedDate = Date.now();  // Set the completion date

            this.completedTasks.push(completedTask);  // Add to completed tasks
            this.showTasks();                         // Update pending task list
            this.showCompletedTasks();                // Update completed task list
        }
    }
}

// Create an instance of the ToDo class
const todo = new ToDo();
