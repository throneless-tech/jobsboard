import lunr from 'lunr';

// set variables
const htmlCollection = document.getElementsByClassName('excerpt');
const htmlPosts = [...htmlCollection];
const searchbar = document.getElementById('search');
const filter = document.getElementById('filter');
const postsContainer = document.getElementById('posts');
const noResults = document.getElementById('no-results');
const clearButton = document.getElementById('clear-filters');
const loadButton = document.getElementById('load-more');
let counter = 10;


// create array of objects containing posts texts
const posts = htmlPosts.map(post => (
  {
    id: post.id,
    content: post.innerText.replace(/\n/g, ' '),
    feedback: post.dataset.feedback,
    type: post.dataset.type.slice(1,-1),
    degrees: post.dataset.degrees,
    benefits: post.dataset.benefits,
  }
));

var bigram = function (builder) {
  // Define a pipeline function that stores two adjacent tokens together
  var pipelineFunction = function (token, index, tokens) {
    token.update(function(str, metadata) {
      return str + " " + metadata.nextTokenStr;
    })
  }

  // Register the pipeline function so the index can be serialised
  lunr.Pipeline.registerFunction(pipelineFunction, 'bigram')

  // Add the pipeline function to both the indexing pipeline and the
  // searching pipeline
  builder.pipeline.before(lunr.stemmer, pipelineFunction)
  builder.searchPipeline.before(lunr.stemmer, pipelineFunction)
}


var metadataUpdate = function (builder) {
  // Define a pipeline function that stores two adjacent tokens together
  var pipelineFunction = function (token, index, tokens) {
    if (tokens[index + 1]) {
      token.metadata['nextTokenStr'] = tokens[index + 1].str
    } else {
      token.metadata['nextTokenStr'] = ""
    }
    return token.update(function(str, metadata) {
      return str + " " + metadata.nextTokenStr;
    })
  }

  // Register the pipeline function so the index can be serialised
  lunr.Pipeline.registerFunction(pipelineFunction, 'metadataUpdate')

  // Add the pipeline function to the indexing pipeline
  builder.pipeline.before(lunr.stemmer, pipelineFunction)

  // Whitelist the tokenLength metadata key
  builder.metadataWhitelist.push('nextTokenStr')
}

// initiate lunr
let idx = lunr(function () {
  this.ref('id');
  this.field('content', {boost: 10});
  this.field('feedback', {boost: 5});
  this.field('type', {boost: 5});
  this.field('degrees', {boost: 5})
  this.field('benefits', {boost: 5})

  // remove buzz words that are causing random word eliminiation
  this.pipeline.reset();
  this.searchPipeline.reset();

  // similarity tuning
  this.k1(0.2);
  this.b(1);

  // this.use(metadataUpdate);
  // this.use(bigram);

  posts.forEach(function (doc) {
    this.add(doc);
  }, this);
})

// automatic text search by typing in text input field
const checkEnter = (e) => {
 e = e || event;
 var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
 return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

searchbar.onkeypress = checkEnter;

searchbar.addEventListener('input', event => {
  event.preventDefault();
  loadButton.classList.add('hidden');

  idx.query(function (q) {
    // look for an exact match and apply a large positive boost
    q.term(`+${event.target.value}`, { usePipeline: true, boost: 100 })

    // look for terms that match the beginning of this query term and apply a medium boost
    q.term(`${event.target.value}*`, { usePipeline: false, boost: 1 })

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

// search by submitting form of dropdown/checkboxes
filter.addEventListener('submit', event => {
  event.preventDefault();
  loadButton.classList.add('hidden');
  let formData = new FormData(filter);
  let options = [];
  for (var pair of formData.entries()) {
    options = [...options, ...pair];
  }

  options = options
    .filter(option => (option !== "on" && option != "location" && option.length))
    .map(option => {
      const thisOption = `${option}`
      return thisOption.replace(/\-/g, ' ').replace("time", '')
    })
    .join(" ");

  idx.query(function (q) {
    // look for an exact match and apply a large positive boost
    q.term(options, { usePipeline: true, boost: 100 })
  })

  let results = idx.search(`feedback:${options} type:${options} degrees:${options} benefits:${options}`);

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

// reset search on clear
clearButton.addEventListener('click', event => {
  filter.reset();
  loadButton.classList.remove('hidden');
  counter = 10;
  htmlPosts.map((post, index) => {
    if (index < counter) {
      post.classList.remove('hidden');
    }
  })
});

// load up to 10 posts on page load
if (htmlPosts.length) {
  htmlPosts.map((post, index) => {
    if (index >= 10) {
      post.classList.add('hidden');
      loadButton.classList.remove('hidden');
    } else {
      post.classList.remove('hidden');
      loadButton.classList.add('hidden');
    }
  })
}

// load up to 10 posts more on load more click
loadButton.addEventListener('click', event => {
  if (counter < htmlPosts.length) {
    counter += 10;
    htmlPosts.map((post, index) => {
      if (counter <= index <= htmlPosts.length) {
        post.classList.remove('hidden');
      } else {
        post.classList.add('hidden');
      }
    })
  } else {
    loadButton.classList.add('hidden');
  }
})
