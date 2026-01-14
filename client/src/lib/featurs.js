import moment from "moment";


const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop()
    if (fileExt === 'mp4' || fileExt === 'mov' || fileExt === 'avi' || fileExt === 'mkv' || fileExt === 'ogg' || fileExt === 'webm')
        return 'video';

    if (fileExt === 'mp3' || fileExt === 'wav' || fileExt === 'aac' || fileExt === 'flac' || fileExt === 'ogg')
        return 'audio';

    if (fileExt === 'pdf')
        return 'pdf';

    if (fileExt === 'doc' || fileExt === 'docx' || fileExt === 'txt' || fileExt === 'rtf')
        return 'document';

    if (fileExt === 'xls' || fileExt === 'xlsx' || fileExt === 'csv')
        return 'spreadsheet';

    if (fileExt === 'ppt' || fileExt === 'pptx')
        return 'presentation';

    if (fileExt === 'zip' || fileExt === 'rar' || fileExt === '7z' || fileExt === 'tar' || fileExt === 'gz')
        return 'archive';

    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif' || fileExt === 'bmp' || fileExt === 'svg' || fileExt === 'webp' || fileExt === 'avif')
        return 'image';
    


    return 'file';
}

const transformImage = (url = "") => url


const getLast7Days = () => {
    const currentDate = moment();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        last7Days.unshift(currentDate.clone().subtract(i, 'days').
        format('dddd'));   
    }
    console.log("last7Days:", last7Days);
    return last7Days;
}

export {fileFormat , transformImage, getLast7Days};