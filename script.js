
let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const outputElement = document.getElementById('output');
        
        const addTask = function(description) {
            const newTask = {
                id: Date.now(),
                description: description,
                completed: false,
                createdAt: new Date().toLocaleString()
            };
            tasks.push(newTask);
            logActivity(`Tarefa adicionada: "${description}"`);
            return newTask.id;
        };
        
        const listTasks = () => {
            tasksContainer.innerHTML = '';
            
            if (tasks.length === 0) {
                tasksContainer.innerHTML = '<p class="task-text">Nenhuma tarefa cadastrada.</p>';
                return;
            }
            
            tasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task';
                
                const taskText = document.createElement('div');
                taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
                taskText.textContent = `${index + 1}. ${task.description}`;
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                const completeBtn = document.createElement('button');
                completeBtn.className = 'task-btn complete-btn';
                completeBtn.textContent = task.completed ? 'Desfazer' : 'Concluir';
                completeBtn.onclick = () => executeOperation(toggleTask, task.id);
                
                const editBtn = document.createElement('button');
                editBtn.className = 'task-btn edit-btn';
                editBtn.textContent = 'Editar';
                editBtn.onclick = () => {
                    const newDescription = prompt('Editar tarefa:', task.description);
                    if (newDescription && newDescription.trim() !== '') {
                        executeOperation(updateTask, task.id, newDescription.trim());
                    }
                };
            
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'task-btn delete-btn';
                deleteBtn.textContent = 'Excluir';
                deleteBtn.onclick = () => executeOperation(removeTask, task.id);
                
                taskActions.appendChild(completeBtn);
                taskActions.appendChild(editBtn);
                taskActions.appendChild(deleteBtn);
                
                taskElement.appendChild(taskText);
                taskElement.appendChild(taskActions);
                
                tasksContainer.appendChild(taskElement);
            });
        };
        
        const removeTaskCallback = (id) => {
            const index = tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                const removedTask = tasks.splice(index, 1)[0];
                logActivity(`Tarefa removida: "${removedTask.description}"`);
                return true;
            }
            logActivity("Tarefa não encontrada.");
            return false;
        };
        
        const updateTaskCallback = (id, newDescription) => {
            const task = tasks.find(t => t.id === id);
            if (task) {
                const oldDescription = task.description;
                task.description = newDescription;
                logActivity(`Tarefa atualizada: "${oldDescription}" → "${newDescription}"`);
                return true;
            }
            logActivity("Tarefa não encontrada.");
            return false;
        };
        
        const toggleTaskCallback = (id) => {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                const status = task.completed ? "concluída" : "pendente";
                logActivity(`Tarefa "${task.description}" marcada como ${status}.`);
                return true;
            }
            logActivity("Tarefa não encontrada.");
            return false;
        };
        
        const executeOperation = (operation, ...args) => {
            const result = operation(...args);
            if (result) {
                listTasks();
            }
            return result;
        };
        
        const logActivity = (message) => {
            const timestamp = new Date().toLocaleTimeString();
            const activity = document.createElement('div');
            activity.textContent = `[${timestamp}] ${message}`;
            outputElement.appendChild(activity);
            outputElement.scrollTop = outputElement.scrollHeight;
        };
        
        const removeTask = removeTaskCallback;
        const updateTask = updateTaskCallback;
        const toggleTask = toggleTaskCallback;

        addTaskBtn.addEventListener('click', () => {
            const description = taskInput.value.trim();
            if (description !== '') {
                executeOperation(addTask, description);
                taskInput.value = '';
                listTasks();
            }
        });
        
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTaskBtn.click();
            }
        });
        
        logActivity("Sistema de gerenciamento de tarefas iniciado.");
        listTasks();
