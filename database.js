// Đây là "cơ sở dữ liệu" mini của chúng ta.
// Toàn bộ thông tin về các bộ truyện sẽ được lưu ở đây.

const database = {
    // Mỗi key là một ID duy nhất cho bộ truyện, viết liền không dấu.
    'one-piece': {
        title: 'One Piece',
        author: 'Eiichiro Oda',
        description: 'Vua Hải Tặc (ワンピース Wan Pīsu?), một bộ manga của tác giả Oda Eiichiro dành cho lứa tuổi thiếu niên. Câu chuyện về một cậu bé tên Monkey D. Luffy, được khuyến khích bởi thần tượng thời thơ ấu và hải tặc hùng mạnh "Tóc đỏ" Shanks, bắt đầu một cuộc hành trình từ Biển Đông để tìm kho báu huyền thoại, One Piece, và tự xưng là Vua Hải Tặc.',
        cover: 'data/one-piece/cover.jpg', // Đường dẫn tới ảnh bìa
        status: 'Đang tiến hành',
        tags: ['Hành động', 'Phiêu lưu', 'Hài hước'],
        chapters: [
            {
                name: 'Chapter 1: Romance Dawn',
                pages: [
                    'data/one-piece/chapter-1/01.jpg',
                    'data/one-piece/chapter-1/02.jpg',
                    'data/one-piece/chapter-1/03.jpg'
                ],
                publishDate: '2025-07-01T12:00:00Z' // ~1 tuần trước
            },
            {
                name: 'Chapter 2: Romance Dawn',
                pages: [
                    'data/one-piece/chapter-1/01.jpg',
                    'data/one-piece/chapter-1/02.jpg',
                    'data/one-piece/chapter-1/03.jpg'
                ],
                publishDate: '2025-07-10T20:00:00Z' // ~2 ngày trước
            }
            // thêm các chapter khác
        ]
    },

    'doraemon': {
        title: 'Doraemon',
        author: 'Fujiko F. Fujio',
        description: 'Doraemon là một bộ manga Nhật Bản được sáng tác bởi Fujiko F. Fujio. Bộ manga kể về một chú mèo máy tên là Doraemon, người du hành ngược thời gian từ thế kỷ 22 để giúp đỡ một cậu bé lớp bốn hậu đậu tên là Nobi Nobita.',
        cover: 'data/one-piece/cover.jpg',
        status: 'Đã hoàn thành',
        tags: ['Hành động', 'Phiêu lưu', 'Hài hước'],
        chapters: [
            {
                name: 'Chapter 1: Vị khách đến từ tương lai',
                pages: [
                    'data/doraemon/chapter-1/01.jpg',
                    'data/doraemon/chapter-1/02.jpg',
                    'data/doraemon/chapter-1/03.jpg'
                ],
                publishDate: '2025-07-05T12:00:00Z' // ~1 tuần trước
            },
            {
                name: 'Chapter 2: Vị khách đến từ tương lai',
                pages: [
                    'data/doraemon/chapter-1/01.jpg',
                    'data/doraemon/chapter-1/02.jpg',
                    'data/doraemon/chapter-1/03.jpg'
                ],
                publishDate: '2025-07-12T01:30:00Z' // Vài giờ trước (8:30 sáng)
            },
        ]
    }
};
