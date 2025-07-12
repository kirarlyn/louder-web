const mangaListContainer = document.getElementById('manga-list-container');
const searchInput = document.getElementById('search-input');

// Hàm để "vẽ" danh sách truyện ra màn hình
// Nhận vào một tham số là 'filter' để lọc theo tên
    function renderMangaList(filter = '') {
        mangaListContainer.innerHTML = '';
        const lowerCaseFilter = filter.toLowerCase();

        for (const mangaId in database) {
            const manga = database[mangaId];

            if (manga.title.toLowerCase().includes(lowerCaseFilter)) {
                const mangaLink = document.createElement('a');
                mangaLink.href = `manga.html?id=${mangaId}`;
                mangaLink.className = 'manga-card';

                const coverImage = document.createElement('img');
                coverImage.src = manga.cover;
                coverImage.alt = manga.title;

                const mangaTitle = document.createElement('h3');
                mangaTitle.textContent = manga.title;

            // ****** NÂNG CẤP MỚI: Hiển thị chapter mới nhất ******
                const latestUpdateContainer = document.createElement('div');
                latestUpdateContainer.className = 'latest-update';

            // Lấy chapter cuối cùng trong danh sách (coi là mới nhất)
            if (manga.chapters.length > 0) {
                const latestChapter = manga.chapters[manga.chapters.length - 1];

                const chapterName = document.createElement('span');
                chapterName.className = 'latest-chapter-name';
                chapterName.textContent = latestChapter.name;

                const chapterTime = document.createElement('span');
                chapterTime.className = 'latest-chapter-time';
                // Gọi hàm từ file utils.js để định dạng thời gian
                chapterTime.textContent = formatTimeAgo(latestChapter.publishDate);

                latestUpdateContainer.appendChild(chapterName);
                latestUpdateContainer.appendChild(chapterTime);
            }
            // ****************************************************

            mangaLink.appendChild(coverImage);
            mangaLink.appendChild(mangaTitle);
            mangaLink.appendChild(latestUpdateContainer); // Gắn thông tin mới vào card

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