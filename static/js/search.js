import * as matter from 'gray-matter';
import MiniSearch from 'minisearch';

const htmlCollection = document.getElementsByClassName('excerpt');
const htmlPosts = [...htmlCollection];
const searchbar = document.getElementById('search');
const filter = document.getElementById('filter');

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
  searchOptions: {
    // combineWith: "AND",
    fuzzy: 0.2
  }
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
  let results = miniSearch.search(event.target.value);

  htmlPosts.filter(post => results.some(result => {
    if (result.id !== post.id) {
      post.classList.add('vh');
    } else {
      htmlPosts.map(post => {
        post.classList.remove('vh');
      })
    }
  }))
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

  let results = miniSearch.search(options);

  htmlPosts.filter(post => results.some(result => {
    if (result.id !== post.id) {
      console.log('result: ', result.id);
      console.log('post: ', post.id);
      post.classList.add('vh');
    } else {
      htmlPosts.map(post => {
        post.classList.remove('vh');
      })
    }
  }))
})
