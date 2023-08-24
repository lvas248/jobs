
export default function formatDate(dateTimeString){

    const dateObj = new Date(dateTimeString)
    const month = dateObj.toLocaleString('default', {month: 'short'})
    const day = dateObj.getDate();
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`

}