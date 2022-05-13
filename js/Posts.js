class Posts extends Page {
  constructor(id) {
    super();

    this.id = id || '';
    this.usersIds = {};
  }

  async getData() {
    const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
    this.posts = await responsePosts.json();
    const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    this.users = await responseUsers.json();
    this.getSorted(this.users, this.usersIds);
  }

  async render() {
    await this.getData();
    let html = '';

    if (Array.isArray(this.posts)) {
      this.posts.forEach(element => {
        html += this.getHTML(element);
      })
    } else {
      html += this.getHTML(this.posts);
    }

    this.renderHTML(html);
    this.setEvents();
  }
  getHTML(element) {
    return `
      <div class="card p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
              <img src="./img/post.png" height="100" width="100" style="border-radius: 50%"/>
          </button>
          <span class="name mt-3" data-user=${element.userId}>${this.usersIds[element.userId].name}</span>
          <div class=" d-flex mt-2">
            <button class="btn1 btn-dark click__name" data-user=${element.userId}>View Profile</button>
            <button class="btn1 btn-dark click__name" data-post=${element.id}>View Post</button>
          </div>
          <div class="text mt-3 ">
            <h3 style="text-align: center;">POSTS</h3>
            <p>${element.title}</p>
            <p>${element.body}</p>
          </div>
        </div>
      </div>
    `;
  }
}
