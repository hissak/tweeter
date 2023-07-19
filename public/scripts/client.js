/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $tweet = $(`<article class="tweet">Hello world</article>`);
$(document).ready(function() {

const createTweetElement = function(tweet) {
  const $tweet = `<article class="tweet">
          <header>
            <p id="tweet-header-p1">
              <img src=${tweet.user.avatars}>
              ${tweet.user.name}
            </p>
            <p id="tweet-header-p2">
              ${tweet.user.handle}
            </p>
          </header>
          <p>${tweet.content.text}</p>
          <footer>
            <p>${Date(tweet.created_at)}</p>
            <p id="like-flag-report">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </p>
          </footer>
        </article>`;
        return $tweet;
}

const renderTweets = function(tweets) {
  const tweetContainer = $('.tweet-container').html('')
  let tweetArray = tweets.map((tweet) => {
    const tweetElement = createTweetElement(tweet);
    return tweetContainer.append(tweetElement)
  });
}

// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]
// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// renderTweets(data);

const loadTweets = function(api) {
  $.get(api).then(function(res){
    console.log(res);
    renderTweets(res);
  })
}
// Alternative ajax request below
// const loadTweets = function(api) {
//   $.ajax({type: 'GET',
//   url: api,
//   success: function(res) {
//     console.log(res);
//     renderTweets(res);
//   },
//   error: function(res) {
//     console.log('ERROR!!!!! ===> ', res.status);
//   }
//   })
// }
loadTweets('/tweets');

$('.Submit-tweet').on("submit", function(event){ // must always target the form element and not the button directly
  event.preventDefault();
  console.log('Prevent default behaviour!');
  const url = $(this).attr('action');
  const data = $(this).serialize(); //Instead of this, maybe event.currentTarget?
  const form = $('#tweet-text').val();
  console.log('This! ==> ', form)
  if(!form) {
    alert('Cannot post an empty tweet!')
    return false
  } else if (form.length > 150){
    alert('Character limit exceeded!')
  return false
} else {
  $.post(url, data).then(function(result) {
    console.log('Tweet data below');
    console.log('Result ==> ', result);
  })
}
})
})

