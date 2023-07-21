

$(document).ready(function() {
  let charLimit = 140;
  let availableChars = 0;

  $('#counter').text(`${charLimit} characters left`);

  //Updates the number of characters left in real-time. Displays an error message if
  // character cout is exceeded. Updates in real-time if charcater count is less than 140.
  $('#tweet-text').on('input', function(event) {
    availableChars = charLimit - $(this).val().length;
    console.log(availableChars);
    const counter = $('#counter');
    if (availableChars < 0) {
      $(counter).text(availableChars + ' characters left').css('color', 'red');
      $('.error-message').html('<i class="fa-solid fa-circle-exclamation"></i> Character limit exceeded!').fadeIn('slow');
      $('.error-message').css('display', 'block');
    } else {
      $('.error-message').fadeOut('slow');
      $(counter).text(availableChars + ' characters left').css('color', '#545149');
    }
  });
}
);

