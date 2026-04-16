const taskInput  = document.getElementById('task-input');
const addBtn     = document.getElementById('add-btn');
const taskList   = document.getElementById('task-list');
const counter    = document.getElementById('counter');
const errorMsg   = document.getElementById('error-msg');
const emptyState = document.getElementById('empty-state');

// AGREGAR TAREA
function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    showError();
    return;
  }

  hideError();

  // Crear <li>
  const li = document.createElement('li');
  li.classList.add('task-item');

  // Crear checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-check');
  checkbox.addEventListener('change', function () {
    toggleTask(li, checkbox);
  });

  // Crear texto
  const span = document.createElement('span');
  span.classList.add('task-text');
  span.textContent = text;

  // Crear botón eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn-delete');
  deleteBtn.textContent = '✕';
  deleteBtn.setAttribute('aria-label', 'Eliminar tarea');
  deleteBtn.addEventListener('click', function () {
    deleteTask(li);
  });

  // Ensamblar en el DOM
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();

  updateCounter();
  updateEmptyState();
}

// MARCAR / DESMARCAR COMPLETADA
function toggleTask(li, checkbox) {
  if (checkbox.checked) {
    li.classList.add('done');
  } else {
    li.classList.remove('done');
  }
  updateCounter();
}

// ELIMINAR TAREA
function deleteTask(li) {
  taskList.removeChild(li);
  updateCounter();
  updateEmptyState();
}

// CONTADOR — lee directamente el DOM
function updateCounter() {
  const allItems     = taskList.querySelectorAll('.task-item');
  const doneItems    = taskList.querySelectorAll('.task-item.done');
  const pendingCount = allItems.length - doneItems.length;

  if (pendingCount === 1) {
    counter.textContent = '1 tarea pendiente';
  } else {
    counter.textContent = pendingCount + ' tareas pendientes';
  }
}

// ESTADO VACÍO — lee directamente el DOM
function updateEmptyState() {
  const allItems = taskList.querySelectorAll('.task-item');

  if (allItems.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}

// ERROR
function showError() {
  errorMsg.classList.remove('hidden');
  taskInput.focus();
}

function hideError() {
  errorMsg.classList.add('hidden');
}

// EVENTOS
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

taskInput.addEventListener('input', function () {
  if (taskInput.value.trim() !== '') {
    hideError();
  }
});

// INICIALIZACIÓN
updateCounter();
updateEmptyState();