class Albums extends Page {
  constructor(albumId) {
    super()

    this.albumId = albumId || '';
  }

  async getData() {
    const responseAlbums = await fetch(`https://jsonplaceholder.typicode.com/users/${this.albumId}/albums`);
    this.albums = await responseAlbums.json();
    const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users/${this.albumId}`);
    this.albumsUserName = await responseUsers.json();
  }

  async render() {
    await this.getData();
    let html = '';

    if (Array.isArray(this.albums)) {
      this.albums.forEach(item => {
        html += this.getHTML(item);
      })
    } else {
      html += this.getHTML(this.albums);
    }

    this.renderHTML(html);
    this.setEvents();
  }

  getHTML(item) {
    return `
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card-user p-3" style="background: #e3c456">
        <div class="d-flex align-items-center">
          <div class="image">
            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155">
          </div>
          <div class="ml-3 w-100">
            <h4 class="mb-0 mb-1">Albums ${this.albumsUserName.name}</h4>
            <span style="font-weight: bold; text-align: center;">Album title: ${item.title.toUpperCase()}</span></br>
            <button class="btn btn-user btn-sm btn-primary mt-3 w-50 ml-2" data-photos=${item.userId}>Photos</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

