
class Users extends Page {
  constructor(userId){
    super()

    this.userId = userId || '';
  }

  async getData() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}`);
    this.users = await response.json();
  }

  async render() {
    await this.getData();
    let html = '';

    if (Array.isArray(this.users)) {
      this.users.forEach(item => {
       html += this.getHTML(item);
      })
    } else {
      html += this.getHTML(this.users);
    }

    this.renderHTML(html);
    this.setEvents();
  }

  getHTML(item) {
    return `
      <div class="container mt-5 d-flex justify-content-center">
        <div class="card-user p-3">
          <div class="d-flex align-items-center">
            <div class="image">
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155">
            </div>
            <div class="ml-3 w-100">
              <h4 class="mb-0 mt-0">${item.name}</h4>
              <span>Username: ${item.username}</span></br>
              <span>${item.email}</span>
              <div class="p-2 mt-2 bg-primary d-flex justify-content-between text-white stats">
                <div class=" user-info d-flex flex-column">
                  <span class="articles">City</span>
                  <span class="number1">${item.address.city}</span>
                </div>
                <div class=" user-info d-flex flex-column">
                  <span class="followers">Company</span>
                  <span class="number2">${item.company.name}</span>
                </div>
                <div class=" user-info d-flex flex-column">
                  <span class="rating">Web-site</span>
                  <span class="number3">${item.website}</span>
                </div>
              </div>
              <div class="button mt-2 d-flex flex-row align-items-center">
                <button class="btn btn-user btn-sm btn-outline-primary w-100" data-albums=${item.id}>Albums</button>
                <button class="btn btn-user btn-sm btn-primary w-100 ml-2" data-todos=${item.id}>Todos</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

