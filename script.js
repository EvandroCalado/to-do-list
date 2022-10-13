// Variáveis
const inputElemet = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");
const editTasksDone = document.querySelectorAll(".fa-check");
const editTaskClose = document.querySelector(".fa-x");
const editTaskModal = document.querySelector(".edit-task-modal");
const editTaskInput = document.querySelector(".edit-task-input");

// Adicionar tarefa
addTaskButton.addEventListener("click", () => {
  // Verificação de campo vazío
  const inputElemetValue = inputElemet.value;
  if (inputElemetValue === "") {
    inputElemet.classList.add("error");

    setTimeout(function () {
      inputElemet.classList.remove("error");
    }, 2000);
  } else {
    // Criar elementos da tarefa
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = inputElemet.value;

    const editTask = document.createElement("i");
    editTask.classList.add("fa-solid");
    editTask.classList.add("fa-pen-to-square");

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(editTask);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
    tasksContainer.style.display = "block";

    // Completar tarefa
    taskContent.addEventListener("click", () => {
      taskContent.classList.toggle("completed");
      taskContent.parentNode.classList.toggle("completed-2");
    });

    // Editar tarefa
    editTask.addEventListener("click", () => {
      editTaskModal.style.display = "flex";
      editTaskInput.value = editTask.previousSibling.textContent;

      let todoTasks = document.querySelectorAll(".task-item p");

      todoTasks.forEach((todoTask) => {
        if (todoTask.innerText === editTaskInput.value) {
          todoTask.classList.add("editing");
          editTasksDone.forEach((editTaskDone) => {
            editTaskDone.addEventListener("click", () => {
              if (todoTask.className === "editing") {
                todoTask.classList.remove("editing");
                todoTask.innerText = editTaskInput.value;
                editTaskModal.style.display = "none";
              }
            });
          });
        }
      });

      // Cancelar editar tarefa
      editTaskClose.addEventListener("click", () => {
        editTaskModal.style.display = "none";
      });
    });

    // Apagar tarefa
    deleteItem.addEventListener("click", () => {
      deleteItem.parentNode.classList.add("delete");
      setInterval(() => {
        deleteItem.parentNode.remove();
      }, 500);
    });

    // Limpa input para nova tarefa
    inputElemet.value = "";
  }
});
