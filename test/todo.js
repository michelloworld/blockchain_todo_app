const Todo = artifacts.require("Todo");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Todo", function (/* accounts */) {
  before(async () => {
    this.Todo = await Todo.deployed()
  })

  it('deploy successfully', async () => {
    const address = await this.Todo.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('list task', async () => {
    const taskId = await this.Todo.taskId()
    const task = await this.Todo.tasks(taskId)
    assert.equal(task.id.toNumber(), taskId.toNumber())
    assert.equal(task.id, 1)
    assert.equal(task.content, 'Hello')
    assert.equal(task.completed, false)
  })

  it('create tasks', async () => {
    const result = await this.Todo.createTask('World')
    const taskId = await this.Todo.taskId()
    assert.equal(taskId.toNumber(), 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'World')
    assert.equal(event.completed, false)
  })

  it('toggle task completion', async () => {
    const result = await this.Todo.toggleCompleted(1)
    const task = await this.Todo.tasks(1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })
});
