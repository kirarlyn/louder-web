function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);

    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30.44); // Trung bình số ngày trong tháng
    const years = Math.round(days / 365.25); // Trung bình số ngày trong năm

    if (seconds < 60) return `${seconds} giây trước`;
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    if (weeks < 5) return `${weeks} tuần trước`;
    if (months < 12) return `${months} tháng trước`;
    return `${years} năm trước`;
}