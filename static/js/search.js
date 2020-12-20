import * as matter from 'gray-matter';
import MiniSearch from 'minisearch';

const htmlPosts = document.getElementsByClassName('excerpt');
const posts = [...htmlPosts];
const searchbar = document.getElementById('search');

let miniSearch = new MiniSearch({
  fields: ['textContent'],
  searchOptions: {
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

  posts.filter(post => results.some(result => {
    if (result.id !== post.id) {
      post.classList.add('vh');
    } else {
      posts.map(post => {
        post.classList.remove('vh');
      })
    }
  }))

})
