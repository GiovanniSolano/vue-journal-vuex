import cloudinary from 'cloudinary'

import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from 'axios'

cloudinary.config({
    cloud_name: 'dpg6wpd2r',
    api_key: '236433162332533',
    api_secret: 'kk_dwWGGQJUocQ_vBM34wYyaK3U'
})

describe('Pruebas en el uploadImage', () => {
    
    test('debe de cargar un archivo y retornar el url', async(done) => {

        const {data} = await axios.get('https://res.cloudinary.com/dpg6wpd2r/image/upload/v1617566121/productos.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)
        
        expect(typeof url).toBe('string')

        //Id cloudinary
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
        
    })
    

})
