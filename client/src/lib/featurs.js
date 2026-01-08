

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


export {fileFormat , transformImage};