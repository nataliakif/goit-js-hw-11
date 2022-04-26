import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesApiService from './getPhotos'

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const searchBtn = document.querySelector('[type="submit"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn =document.querySelector('.load-more');

  let galleryLightBox = new SimpleLightbox('.gallery a');
  
form.addEventListener('submit', onSearchButton);
loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
loadMoreBtn.disabled =true;
function onSearchButton(event){
    event.preventDefault();
    const query =event.currentTarget.elements.searchQuery.value;
    imagesApiService.query =query;
    imagesApiService.resetPage();
    gallery.innerHTML = '';
    imagesApiService.getImages()
    .then(dataProcessing)
   .catch(error=>{
       console.log(error);
   });
}

function onLoadMore(){
  imagesApiService.getImages()
  .then(dataProcessing)
  .catch(error=>{
      console.log(error);
  });
  
}
function dataProcessing(response){
    if (response.data.totalHits === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (response.data.hits.length < 40) {
      loadMoreBtn.disabled = true;
       return  Notify.warning(`We're sorry, but you've reached the end of search results.`);
    }
      
    console.log(imagesApiService.getPage());
    console.log(response.data.hits.length)
    loadMoreBtn.disabled = false;
    markup(response.data.hits);
    galleryLightBox.refresh();
    return Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    
}
function markup(photoCards) {
    console.log(photoCards)
    const markupInfo = photoCards.map((photoCard) => {
    return `
    <div class="photo-card">
    <a class="gallery__item" href="${photoCard.largeImageURL}">
      <img src="${photoCard.webformatURL}" alt="${photoCard.tags}" class="gallery__photo" loading="lazy" />
    </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${photoCard.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${photoCard.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${photoCard.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${photoCard.downloads}</b>
        </p>
      </div>
    </div>`;
      })
      .join('');
      return gallery.insertAdjacentHTML('beforeend', markupInfo);
  }

  