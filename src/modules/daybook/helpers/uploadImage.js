import axios from "axios";

const uploadImage = async(file) => {


    if(!file) return

    try {

        const formData = new FormData()
        formData.append('upload_preset', 'vue-curso')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/dpg6wpd2r/image/upload'

        const {data} = await axios.post(url, formData)

        console.log(data);

        return data.secure_url
        
    } catch (error) {
        console.log(error, 'Error al cargar la imagen');
        return null
    }


}

export default uploadImage