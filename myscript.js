// 'use strict';
let task=[];
const getPriorityName = function (priority){
    switch (priority) {
        case "1":
        return "High";
        case "2":
        return "Medium";
        case "3":
        return "Low";
        default:
        return "";
    }
};

const addButton = function () {
    console.log(this);
    const taskName = document.querySelector("#taskName").value;
    const priority = document.querySelector("#task_priority").value;
    if (taskName !== "" && priority > 0) {
      task.push({
        name: taskName,
        priority: priority,
        isEdit: false
      });
      renderTable();
    }
  };

  document.querySelector('#addButton').addEventListener('click', addButton)

const renderTable = function () {
    const tbody = document.querySelector("#tasks");
    tbody.innerHTML = "";
    task.forEach((t, i) => {
      const row = `
          <tr>
          <td>${i + 1}</td>
          <td>${ t.isEdit ? 
            `
            <input type="text" id="taskName_${i}" class="form-control" placeholder="task name" value="${t.name}"/>
            <select id="task_priority_${i}" class="form-control">
                        <option value="1">high</option>
                        <option value="2">medium</option>
                        <option value="3">low</option>
                    </select>
            `
            : t.name}</td>
          <td>${getPriorityName(t.priority)}</td>
          <td>
          ${
            i > 0
              ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
              : ``
          }
          ${
            i < task.length - 1
              ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
              : ``
          }
          </td>
          <td>
          ${t.isEdit == false? 
          `<button class="btn btn-primary btn-sm" id="edit" onclick="editTask(${i})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>`
          :
          `<button class="btn btn-success btn-sm" id="save" onclick="save(${i})">Save</button>
          <button class="btn btn-danger btn-sm" id="cancel" onclick="cancel(${i})">Cancel</button>`
    }
          </tr>
          `;
      tbody.insertAdjacentHTML("beforeEnd", row);

    });
  };

  const moveUp = function(i){
      if (i == 0 ) return;
      const oldTask = task[i];
      task[i] = task [i-1];
      task[i-1] = oldTask;
      renderTable();
  };

  const moveDown = function(i){
    if (i == task.length - 1) return;
    const oldTask = task[i];
    task[i] = task [i+1];
    task[i+1] = oldTask;
    renderTable();
};



  const deleteTask = function (i) {
    if (!confirm("Are you sure ?")) return;
    task.splice(i, 1);
    renderTable();
  };

  debugger;

  const editTask = function (i) {
  task[i].isEdit = true;
   renderTable();
  }

  const cancel = function (i){
    task[i].isEdit = false;
    renderTable();
  }

  var save =function(i){
   var x = document.getElementById("taskName_"+i);
    var y = document.getElementById("task_priority_"+i);
    debugger;
    task[i].name = x.value; 
    task[i].priority = y.value;
    task[i].isEdit = false;
    console.log(i)
    renderTable();
  }