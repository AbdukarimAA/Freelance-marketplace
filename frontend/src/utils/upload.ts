import axios from "axios";

const upload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Job_Market');

    try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dedeobaxo/image/upload', data);
        const {url} = res.data;
        return url;
    } catch (e: any) {
        console.log(e);
    }
};

export default upload;