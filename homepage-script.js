const mangaListContainer = document.getElementById('manga-list-container');
const searchInput = document.getElementById('search-input');

// Hàm để "vẽ" danh sách truyện ra màn hình
// Nhận vào một tham số là 'filter' để lọc theo tên
function renderMangaList(filter = '') {
    // 1. Xóa hết danh sách truyện hiện tại để vẽ lại
    mangaListContainer.innerHTML = '';

    // 2. Chuyển filter về chữ thường để tìm kiếm không phân biệt hoa/thường
    const lowerCaseFilter = filter.toLowerCase();

    // 3. Lặp qua database và chỉ hiển thị truyện khớp với filter
    for (const mangaId in database) {
        const manga = database[mangaId];

        // Nếu tên truyện (chữ thường) chứa cụm từ tìm kiếm (chữ thường)
        if (manga.title.toLowerCase().includes(lowerCaseFilter)) {
            const mangaLink = document.createElement('a');
            mangaLink.href = `manga.html?id=${mangaId}`;
            mangaLink.className = 'manga-card';

            const coverImage = document.createElement('img');
            coverImage.src = manga.cover;
            coverImage.alt = manga.title;

            const mangaTitle = document.createElement('h3');
            mangaTitle.textContent = manga.title;

            mangaLink.appendChild(coverImage);
            mangaLink.appendChild(mangaTitle);

            mangaListContainer.appendChild(mangaLink);
        }
    }
}


// Thêm sự kiện 'input' cho ô tìm kiếm
// Mỗi khi người dùng gõ một chữ, hàm này sẽ được gọi
searchInput.addEventListener('input', () => {
    // Gọi hàm vẽ lại danh sách với giá trị từ ô tìm kiếm
    renderMangaList(searchInput.value);
});


// --- KHỞI ĐỘNG ---
// Khi trang vừa tải xong, gọi hàm vẽ để hiển thị tất cả truyện
renderMangaList();