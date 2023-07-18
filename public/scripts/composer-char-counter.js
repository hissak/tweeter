
let charCount = 0

$(document).ready(function() {
  let charLimit = 10;
  let availableChars = 0;

  $('#tweet-text').on('input', function(event) {
    availableChars = charLimit - $(this).val().length;
    console.log(availableChars);
    const counter = $(this).parent().parent().find(".counter");

    if(availableChars < 0) {
      counter.text(availableChars + ' characters left').css('color', 'red')
  } else {
    counter.text(availableChars + ' characters left').css('color', 'black')
  }
  })
}
);
