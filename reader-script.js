// --- LẤY DỮ LIỆU TỪ URL ---
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('id');
// Chuyển chapterIndex từ string sang number để tính toán
const chapterIndex = parseInt(urlParams.get('chap'), 10);
let pages = [];

// Lấy thông tin từ database
const mangaData = database[mangaId];
let chapterData = null;

if (mangaData && mangaData.chapters[chapterIndex]) {
    chapterData = mangaData.chapters[chapterIndex];
    pages = chapterData.pages;
}

// --- KẾT THÚC LẤY DỮ LIỆU ---
let currentPageIndex = 0;

// Lấy các phần tử HTML
const pageTitle = document.querySelector('title');
const chapterTitle = document.getElementById('chapter-title');
const backToMangaLink = document.getElementById('back-to-manga-link');
const mangaImage = document.getElementById('current-page-image');
const pageCounter = document.getElementById('page-counter');
// *** NÂNG CẤP MỚI: Lấy nút điều hướng chapter ***
const prevChapterLink = document.getElementById('prev-chapter-link');
const nextChapterLink = document.getElementById('next-chapter-link');


// Hàm hiển thị trang truyện
function showPage(pageNumber) {
    if (pages.length > 0) {
        mangaImage.src = pages[pageNumber];
        pageCounter.textContent = `Trang ${pageNumber + 1} / ${pages.length}`;
    }
}

// Kiểm tra xem có dữ liệu không rồi mới thực hiện tiếp
if (mangaData && chapterData) {
    // Cập nhật tiêu đề trang và tiêu đề chapter
    pageTitle.textContent = `${mangaData.title} - ${chapterData.name}`;
    chapterTitle.textContent = chapterData.name;
    backToMangaLink.href = `manga.html?id=${mangaId}`;

    // *** NÂNG CẤP MỚI: Xử lý logic cho nút điều hướng chapter ***
    const totalChapters = mangaData.chapters.length;

    // Xử lý nút "Chapter Trước"
    if (chapterIndex > 0) {
        prevChapterLink.href = `reader.html?id=${mangaId}&chap=${chapterIndex - 1}`;
    } else {
        prevChapterLink.style.display = 'none'; // Ẩn nút nếu là chapter đầu tiên
    }

    // Xử lý nút "Chapter Tiếp"
    if (chapterIndex < totalChapters - 1) {
        nextChapterLink.href = `reader.html?id=${mangaId}&chap=${chapterIndex + 1}`;
    } else {
        nextChapterLink.style.display = 'none'; // Ẩn nút nếu là chapter cuối cùng
    }


    // Lắng nghe sự kiện bàn phím
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                showPage(currentPageIndex);
            }
        } else if (event.key === 'ArrowLeft') {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                showPage(currentPageIndex);
            }
        }
    });

    // Hiển thị trang đầu tiên
    showPage(currentPageIndex);
} else {
    chapterTitle.textContent = "Lỗi: Không tìm thấy chapter!";
}