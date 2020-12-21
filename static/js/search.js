import * as matter from 'gray-matter';
import MiniSearch from 'minisearch';

const htmlCollection = document.getElementsByClassName('excerpt');
const htmlPosts = [...htmlCollection];
const searchbar = document.getElementById('search');
const filter = document.getElementById('filter');
const postsContainer = document.getElementById('posts');
const noResults = document.getElementById('no-results');

const posts = htmlPosts.map(post => (
  {
    id: post.id,
    content: post.textContent,
    feedback: post.dataset.feedback,
    type: post.dataset.type,
  }
));

let miniSearch = new MiniSearch({
  fields: ['content', 'feedback', 'type'],
})

miniSearch.addAll(posts);

const checkEnter = (e) => {
 e = e || event;
 var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
 return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

searchbar.onkeypress = checkEnter;

searchbar.addEventListener('input', event => {
  event.preventDefault();
  let results = miniSearch.search(event.target.value, {
    fuzzy: 0.2,
    prefix: true
  });

  if (event.target.value && results.length) {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.filter(post => {
      post.classList.add('hidden');
      results.some(result => {
        if (result.id === post.id) {
          post.classList.remove('hidden');
        }
      })
    })
  } else if (event.target.value) {
    noResults.classList.remove('hidden');
    postsContainer.classList.add('hidden');
  } else {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.map(post => {
      post.classList.remove('hidden');
    })
  }
})

filter.addEventListener('submit', event => {
  event.preventDefault();
  let formData = new FormData(filter);
  let options = [];
  for (var pair of formData.entries()) {
    options = [...options, ...pair];
  }

  options = options
    .filter(option => {
      if (option !== "on" && option != "location" && option.length) {
        return option.replace(/-/g, ' ');
      }
    })
    .join(" ");

  let results = miniSearch.search(options, { combineWith: "AND" });

  console.log('options: ', options);
  console.log('results: ', results);

  if (options.length && results.length) {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.filter(post => {
      post.classList.add('hidden');
      results.some(result => {
        if (result.id === post.id) {
          post.classList.remove('hidden');
        }
      })
    })
  } else if (options.length) {
    noResults.classList.remove('hidden');
    postsContainer.classList.add('hidden');
  } else {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.map(post => {
      post.classList.remove('hidden');
    })
  }
})
