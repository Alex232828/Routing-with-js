class Post extends Page {
  constructor(postId) {
    super()

    this.postId = postId || '';
    this.userIdName = {};
  }

  async getData() {
    const responsePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`);
    this.post = await responsePost.json();
    const responseUserName = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    this.postUserName = await responseUserName.json();
    const responseComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`);
    this.comments = await responseComments.json();
    this.getSorted(this.postUserName, this.userIdName);
  }

  async render() {
    await this.getData();
    let html = '';

    if (Array.isArray(this.post)) {
      this.post.forEach(item => {
        html += this.getHTML(item);
      })
    } else {
      html += this.getHTML(this.post);
    }

    this.comments.forEach(item => {
      html += this.getCommentsHTML(item);
    })

    this.renderHTML(html);
  }

  getHTML(item) {
    return `
      <div class="card card-post p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            <img src="/img/user-img.png" height="100" width="100" style="border-radius: 50%"/>
          </button>
          <span class="name mt-3">${this.userIdName[item.userId].name}</span>
          <div class=" d-flex mt-2">
            <button class="btn1 btn-dark click__name" data-user=${item.userId}>View Profile</button>
          </div>
        </div>
        <div class="text mt-3 ml-3 ">
          <h3>POSTS</h3>
          <p>${item.title}</p>
          <p data-comments ="${item.userId}">${item.body}</p>
        </div>
      </div>
    `
  }

  getCommentsHTML(item) {
    return `
        <div class="container mt-3 d-flex justify-content-center">
          <div class="card-user card-comments p-3">
            <div class="d-flex align-items-center">
              <div class="image">
                <img src="/img/double-quotes.png" width="25px">
              </div>
              <div class="ml-3 w-100">
                <p class="mb-0 mt-0" style="font-weight: bold"></p>
                <p style="font-weight: bold">${item.email}</p>
                <p style="font-weight: bold">${item.name}</p>
                <p>${item.body}</p>
              </div>
            </div>
          </div>
      </div>
    `
  }
}


