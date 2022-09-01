import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '29634841-061e0c7ab4009b86045ba35d0';
const URL = 'https://pixabay.com/api/?key=';
axios.defaults.baseURL = 'https://pixabay.com/api/?key=';

refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let pageNumber = 1;
let totalPages = 0;


refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(evt) {
  evt.preventDefault();
  refs.loadMoreBtn.classList.remove('is-hidden');
  const inputText = refs.input.value;

  try {
    const data = await getFoto(inputText);
    const markup = markupGallery(data.hits);
      if (markup.length <= 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    renderGallery(markup);
  } catch (error) {
    console.log('error', error);
  }
}
 
 async function onLoadMore() {
   pageNumber += 1;  
   const { data } = await axios.get(
     `${URL}${API_KEY}&q=${refs.input.value}&page=${pageNumber}&image_type=photo&per_page=40&orientation=horizontal&safesearch=true`
   );
 let totalPages = data.totalHits;
   if (totalPages < (pageNumber + 1) * 100) {
     refs.loadMoreBtn.classList.add('is-hidden');
     Notiflix.Notify.failure(
       "We're sorry, but you've reached the end of search results."
     );
   }
   const markup = markupGallery(data.hits);
   refs.gallery.insertAdjacentHTML('beforeend', markup);
 }
async function getFoto(inputText) {
  const { data } = await axios.get(
    `${URL}${API_KEY}&q=${inputText}&image_type=photo&per_page=40&orientation=horizontal&safesearch=true`
  );
  return data;
}

function markupGallery(array) {
  const markup = array
    .map(
      arr => `<div class="photo-card">
    <img src="${arr.webformatURL}" alt="${arr.tags}" width="200"loading="lazy" />
    <div class="info">
      <p class="info-item">
         <b>Likes: ${arr.likes}</b>
       </p>
       <p class="info-item">
         <b>Views: ${arr.views}</b>
       </p>
       <p class="info-item">
         <b>Comments: ${arr.comments}</b>
       </p>
       <p class="info-item">
         <b>Downloads: ${arr.downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
  return markup;
}

function renderGallery(markup) {
  refs.gallery.innerHTML = markup;
}
