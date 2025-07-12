// --- LẤY DỮ LIỆU TỪ URL ---
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('id');
const chapterIndex = parseInt(urlParams.get('chap'), 10);
let pages = [];

const mangaData = database[mangaId];
let chapterData = null;

if (mangaData && mangaData.chapters[chapterIndex]) {
    chapterData = mangaData.chapters[chapterIndex];
    pages = chapterData.pages;
}

// --- KẾT THÚC LẤY DỮ LIỆU ---

let currentPageIndex = 0;

// ****** NÂNG CẤP MỚI: Biến trạng thái ******
let isWebtoonRendered = false; // Biến để kiểm tra xem đã tạo danh sách ảnh cuộn dọc chưa
// *****************************************

// Lấy các phần tử HTML
const readerContainer = document.querySelector('.reader-container');
const pageTitle = document.querySelector('title');
const chapterTitle = document.getElementById('chapter-title');
const backToMangaLink = document.getElementById('back-to-manga-link');
const mangaImage = document.getElementById('current-page-image');
const pageCounter = document.getElementById('page-counter');
const prevChapterLink = document.getElementById('prev-chapter-link');
const nextChapterLink = document.getElementById('next-chapter-link');

// ****** NÂNG CẤP MỚI: Lấy các phần tử của chế độ mới ******
const pageFlipViewer = document.getElementById('page-flip-viewer');
const webtoonViewer = document.getElementById('webtoon-viewer');
const modePageFlipBtn = document.getElementById('mode-page-flip');
const modeWebtoonBtn = document.getElementById('mode-webtoon');
// *******************************************************


// Hàm hiển thị trang truyện (chế độ lật trang)
function showPage(pageNumber) {
    if (pages.length > 0) {
        mangaImage.src = pages[pageNumber];
        pageCounter.textContent = `Trang ${pageNumber + 1} / ${pages.length}`;
    }
}

// ****** NÂNG CẤP MỚI: Hàm tạo danh sách ảnh cho chế độ cuộn dọc ******
function renderWebtoonPages() {
    // Chỉ tạo danh sách ảnh 1 lần duy nhất
    if (!isWebtoonRendered && pages.length > 0) {
        pages.forEach(pageSrc => {
            const img = document.createElement('img');
            img.src = pageSrc;
            img.className = 'webtoon-image';
            webtoonViewer.appendChild(img);
        });
        isWebtoonRendered = true;
    }
}

// Hàm chuyển đổi chế độ xem
function setViewMode(mode) {
    if (mode === 'webtoon') {
        readerContainer.classList.add('webtoon-mode');
        modeWebtoonBtn.classList.add('active');
        modePageFlipBtn.classList.remove('active');
        renderWebtoonPages(); // Gọi hàm để tạo ảnh nếu cần
    } else { // 'page-flip'
        readerContainer.classList.remove('webtoon-mode');
        modePageFlipBtn.classList.add('active');
        modeWebtoonBtn.classList.remove('active');
    }
}
// *******************************************************************


// Kiểm tra xem có dữ liệu không rồi mới thực hiện tiếp
if (mangaData && chapterData) {
    // Cập nhật thông tin chung
    pageTitle.textContent = `${mangaData.title} - ${chapterData.name}`;
    chapterTitle.textContent = chapterData.name;
    backToMangaLink.href = `manga.html?id=${mangaId}`;

    // Xử lý nút điều hướng chapter (giữ nguyên)
    const totalChapters = mangaData.chapters.length;
    if (chapterIndex > 0) {
        prevChapterLink.href = `reader.html?id=${mangaId}&chap=${chapterIndex - 1}`;
    } else {
        prevChapterLink.style.display = 'none';
    }
    if (chapterIndex < totalChapters - 1) {
        nextChapterLink.href = `reader.html?id=${mangaId}&chap=${chapterIndex + 1}`;
    } else {
        nextChapterLink.style.display = 'none';
    }

    // Lắng nghe sự kiện bàn phím (chế độ lật trang)
    document.addEventListener('keydown', (event) => {
        // Chỉ hoạt động khi không ở chế độ webtoon
        if (!readerContainer.classList.contains('webtoon-mode')) {
            if (event.key === 'ArrowRight' && currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                showPage(currentPageIndex);
            } else if (event.key === 'ArrowLeft' && currentPageIndex > 0) {
                currentPageIndex--;
                showPage(currentPageIndex);
            }
        }
    });
    
    // ****** NÂNG CẤP MỚI: Gán sự kiện cho nút chuyển chế độ ******
    modePageFlipBtn.addEventListener('click', () => setViewMode('page-flip'));
    modeWebtoonBtn.addEventListener('click', () => setViewMode('webtoon'));
    // **********************************************************

    // --- KHỞI ĐỘNG ---
    showPage(currentPageIndex); // Hiển thị trang đầu tiên ở chế độ lật trang
    setViewMode('page-flip'); // Đặt chế độ mặc định

} else {
    chapterTitle.textContent = "Lỗi: Không tìm thấy chapter!";
}