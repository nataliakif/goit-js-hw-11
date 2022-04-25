import axios from 'axios';

    async function getPhotos(query) {
        const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '26861393-22f68a93d11eca8c337dbb001',
            q: `${query}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: 1,
            per_page: 40,
          }
        });
        return response;
      }
export default{getPhotos}