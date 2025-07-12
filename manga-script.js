// Lấy các thông số trên URL (ví dụ: ?id=one-piece)
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('id'); // Lấy ra giá trị của 'id'

// Tìm bộ truyện tương ứng trong database
const mangaData = database[mangaId];

// Lấy các phần tử HTML để điền thông tin
const pageTitle = document.querySelector('title');
const mangaCover = document.getElementById('manga-cover');
const mangaTitle = document.getElementById('manga-title');
const mangaAuthor = document.getElementById('manga-author');
const mangaDescription = document.getElementById('manga-description');
const chapterListDiv = document.getElementById('chapter-list');

// Kiểm tra xem có tìm thấy truyện không
if (mangaData) {
    // Cập nhật thông tin chung của trang
    pageTitle.textContent = `Louder - ${mangaData.title}`;
    mangaCover.src = mangaData.cover;
    mangaTitle.textContent = mangaData.title;
    mangaAuthor.innerHTML = `
        <p><strong>Tác giả:</strong> ${mangaData.author}</p>
        <p><strong>Tình trạng:</strong> ${mangaData.status}</p>
    `;
    mangaDescription.textContent = mangaData.description;

    // ****** NÂNG CẤP MỚI: Thêm các tag vào trang chi tiết ******
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'manga-details-tags';
    mangaData.tags.forEach(tagText => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tagText;
        tagsContainer.appendChild(tagElement);
    });
    // Chèn container tag vào sau phần mô tả
    mangaDescription.after(tagsContainer);
    // ********************************************************

    // Tạo danh sách chapter
    mangaData.chapters.forEach((chapter, index) => {
        // Tạo một thẻ link <a> cho mỗi chapter
        const chapterLink = document.createElement('a');
        
        // Link sẽ dẫn đến trang reader.html và mang theo 2 thông tin:
        // 1. id của truyện
        // 2. chỉ số (index) của chapter
        chapterLink.href = `reader.html?id=${mangaId}&chap=${index}`;
        chapterLink.className = 'chapter-link';
        chapterLink.textContent = chapter.name;

        // Gắn link của chapter vào danh sách
        chapterListDiv.appendChild(chapterLink);
    });

} else {
    // Nếu không tìm thấy truyện, báo lỗi
    mangaTitle.textContent = 'Không tìm thấy truyện!';
}