class Photos extends Page {
  constructor(photosId) {
    super();

    this.photosId = photosId || '';
  }

  async getData() {
    const responsePhotos = await fetch(`https://jsonplaceholder.typicode.com/albums/${this.photosId}/photos`);
    this.photos = await responsePhotos.json();
    const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users/${this.photosId}`);
    this.photosUsersName = await responseUsers.json();
  }

  async render() {
    await this.getData();
    let html = ''

    this.photos.forEach(item => {
      html += `
        <div class="card p-4">
          <div class=" image d-flex flex-column justify-content-center align-items-center">
            <button class="btn btn-secondary"><img src="${item.thumbnailUrl}" height="100" width="100" style="border-radius: 50%" /></button>
            <span class="name mt-3" style="text-align: center"> Photo ${this.photosUsersName.name}</span>
            <span class="name mt-1">Photos #${item.id}</span>
            <div class="text mt-3">
              <p class="info__user">Albums title: ${item.title}</p>
            </div>
          </div>
        </div>
       `;
    })
    this.renderHTML(html);
  }
}
