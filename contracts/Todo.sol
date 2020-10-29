// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Todo {
  uint public taskId = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event ToggleCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createTask('Hello');
  }

  function createTask(string memory _content) public {
    taskId++;
    tasks[taskId] = Task(taskId, _content, false);
    emit TaskCreated(taskId, _content, false);
  }

  function toggleCompleted(uint _taskId) public {
    Task memory _task = tasks[_taskId];
    _task.completed = !_task.completed;
    tasks[_taskId] = _task;
    emit ToggleCompleted(_taskId, _task.completed);
  }
}
