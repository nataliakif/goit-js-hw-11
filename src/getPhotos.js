import axios from 'axios';
export default class ImagesApiService{
  constructor(){
    this.options ={
      params: {
        key: '26861393-22f68a93d11eca8c337dbb001',
        q: '',
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
        page: 1,
        per_page: 40,
      }
  }}
  get query(){
    return this.options.params.q;
  }
  set query(newQuery){
    return this.options.params.q = newQuery;
  }
  resetPage(){
    this.options.params.page = 1;
  }
  getPage(){
    return this.options.params.page;
  }

  async getImages() {
  const response = await axios.get('https://pixabay.com/api/', this.options);
  this.options.params.page += 1;
  return response;
} 
}
   
