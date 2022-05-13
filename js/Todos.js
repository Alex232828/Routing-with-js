class Todos extends Page {
  constructor(todosId) {
    super()

    this.todosId = todosId || '';
  }

  async getData() {
    const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${this.todosId}/todos`);
    this.todos = await responseTodos.json();
    const responseUsersName = await fetch(`https://jsonplaceholder.typicode.com/users/${this.todosId}`);
    this.todosUserName = await responseUsersName.json();
  }

  async render() {
    await this.getData();
    let html = '';

    if (Array.isArray(this.todos)) {
      this.todos.forEach(item => {
        html += this.getHTML(item);
      })
    } else {
      html += this.getHTML(this.todos)
    }

    this.renderHTML(html);
  }

  getHTML(item) {
    return `
      <div class="container mt-5 d-flex justify-content-center">
        <div class="card-user p-3" >
          <div class="d-flex align-items-center">
            <div class="image">
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155">
            </div>
            <div class="ml-3 w-100">
              <h4 class="mb-0 mb-1"">Todos ${this.todosUserName.name}</h4>
              <input class="input__checkbox" type="checkbox" ${item.completed ? 'checked': 'disabled'}/> <span style="font-weight: bold; text-align: center;">${item.title.toUpperCase()}</span></br>
            </div>
          </div>
        </div>
    </div>
    `;
  }
}




