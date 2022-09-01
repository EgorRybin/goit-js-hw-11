import axios from 'axios';

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

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  const inputText = refs.input.value;

  try {
    const data = await getFoto(inputText);
    const markup = markupGallery(data.hits);
    renderGallery(markup);
  } catch (error) {
    console.log('error', error);
  }
};

async function getFoto(inputText) {
  const { data } = await axios.get(
    `${URL}${API_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return data;
};

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
  console.log(markup);
  return markup;
};

function renderGallery(markup) {
refs.gallery.innerHTML = markup;
}
// function getFoto(inputText) {
//   fetch(
//     `${URL}${API_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true`
//   )
//     .then(res => res.json())
//     .then(data => console.log(data.hits))
//     .catch(err => console.log(err));
// }
