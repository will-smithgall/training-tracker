export default function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}
