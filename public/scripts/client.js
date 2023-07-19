/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
const createTweetButBetter = function(tweet) {
  const { avatar, name, handle } = tweet.user;
  const { text } = tweet.content;
  const date = tweet.created_at;
  const $article = $('<article>');
  const $header = $('<header>');
  const $avatarAndUser = $('<p>');
  const $avatar = $('<img>')
  const $handle = $('<p>');
  const $tweet = $('<p>');
  const $date = $('<p>');
  const $footer = $('<footer>');
  const $buttons = $('p');
  const $flag = $('<i>');
  const $retweet = $('<i>');
  const $heart = $('<i>');

  $article.addClass('tweet');
  $avatarAndUser.attr('id', 'tweet-header-p1');
  $avatar.attr('src', `${avatar}`);
  $handle.attr('id', 'tweet-header-p2');
  $buttons.attr('id', 'like-flag-report');
  $flag.addClass('fa-solid fa-flag');
  $retweet.addClass('fa-solid fa-retweet');
  $heart.addClass('fa-solid fa-heart');

  $avatarAndUser.append($avatar, name);
  $handle.text(`handle`);
  $header.append($avatarAndUser, handle);

  $tweet.text(`${text}`);

  $date.text(`${Date(date)}`);
  $buttons.append($flag, $retweet, $heart);
  $footer.append($date, $buttons);

  $article.append($header, $tweet, $footer);
  console.log($article)
  return $article
}

const renderTweets = function(tweets) {
  const tweetContainer = $('.tweet-container').html('')
  let tweetArray = tweets.map((tweet) => {
    const tweetElement = createTweetButBetter(tweet);
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

