/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const createTweetElement = function(tweet) {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const $tweet = `<article class="tweet">
          <header>
            <p id="tweet-header-p1">
              <img src=${escape(tweet.user.avatars)}>
              ${escape(tweet.user.name)}
            </p>
            <p id="tweet-header-p2">
              ${escape(tweet.user.handle)}
            </p>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <p>${escape(timeago.format(tweet.created_at))}</p>
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



const loadTweets = function(api) {
  $.get(api).then(function(res){
    const reversedRes = res.reverse();
    console.log(reversedRes);
    renderTweets(reversedRes);
  })
}

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
  } else if (form.length > 140){
    alert('Character limit exceeded!')
  return false
} else {
  $.post(url, data).then(function(result) {
    console.log('Tweet data below');
    console.log('Result ==> ', result);
    loadTweets('/tweets');
    $('.Submit-tweet')[0].reset();
  })
}
})
})

