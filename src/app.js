App = {
  contracts: {},
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  loadWeb3: async () => {
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  },
  loadAccount: async () => {
    const accounts = await web3.eth.getAccounts()
    App.account = accounts[0]
  },
  loadContract: async () => {
    const todoBuildContract = await $.getJSON('Todo.json');
    App.contracts.Todo = new web3.eth.Contract(todoBuildContract.abi, todoBuildContract.networks[5777].address)
    App.taskId = await App.contracts.Todo.methods.taskId().call()
  },
  render: async () => {
    $('#account').text(App.account)
    for(let i = 1; i <= App.taskId; i++) {
      const task = await App.contracts.Todo.methods.tasks(i).call()
      $('.tasks').append('<li><input type="checkbox" class="mr-3" data-id="'+task.id+'" />'+task.content+'</li>')
      $('.tasks').find('li input[type=checkbox][data-id='+task.id+']').prop('checked', task.completed)
    }
    $('input[type=checkbox]').on('click', async (e) => {
      const taskId = $(e.target).data('id')
      App.contracts.Todo.methods.toggleCompleted(taskId).send({from: App.account}).then(() => {
        window.location.reload()
      })
    })
  },
  createTask: async () => {
    const content = $('#newTask').val()
    await App.contracts.Todo.methods.createTask(content).send({from: App.account})
    $('#newTask').val('')
    window.location.reload()
  }
}

$(() => {
  App.load()
})