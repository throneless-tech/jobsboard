import lunr from 'lunr';

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

let idx = lunr(function () {
  this.ref('id');
  this.field('content', {boost: 10});
  this.field('feedback', {boost: 5});
  this.field('type', {boost: 10});

  // similarity tuning
  this.k1(0.5);
  this.b(0);

  // remove buzz words that are causing random word eliminiation
  this.pipeline.reset();
  this.searchPipeline.reset();

  posts.forEach(function (doc) {
    this.add(doc);
  }, this);
})

const checkEnter = (e) => {
 e = e || event;
 var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
 return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

searchbar.onkeypress = checkEnter;

searchbar.addEventListener('input', event => {
  event.preventDefault();

  idx.query(function (q) {
    // look for an exact match and apply a large positive boost
    q.term(event.target.value, { usePipeline: true, boost: 100 })

    // look for terms that match the beginning of this query term and apply a medium boost
    q.term(event.target.value + "*", { usePipeline: false, boost: 10 })

    // look for terms that match with an edit distance of 2 and apply a small boost
    q.term(event.target.value, { usePipeline: false, editDistance: 2, boost: 1 })
  })

  let results = idx.search(`${event.target.value}^100 ${event.target.value}*^10 ${event.target.value}~2`);

  if (event.target.value && results.length) {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.filter(post => {
      post.classList.add('hidden');
      results.some(result => {
        if (result.ref === post.id) {
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
    .filter(option => (option !== "on" && option != "location" && option.length))
    .map(option => option.replace(/\-/g, ' +'))
    .join(" +");

  idx.query(function (q) {
    // look for an exact match and apply a large positive boost
    q.term(options, { usePipeline: true, boost: 100 })
  })

  let results = idx.search(`+${options}`);
  
  if (options.length && results.length) {
    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');
    htmlPosts.filter(post => {
      post.classList.add('hidden');
      results.some(result => {
        if (result.ref === post.id) {
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

const clearButton = document.getElementById('clear-filters');

clearButton.addEventListener('click', event => {
  filter.reset();
  htmlPosts.map(post => {
    post.classList.remove('hidden');
  })
});
