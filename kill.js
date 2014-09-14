function blockAndDisplay() {
  var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]');
  var message = $('#distracted');

  chrome.storage.sync.get({
    displayText: "Don't get distracted by Facebook"
  }, function(items) {
    var messageText = items.displayText;

    if (feed.length == 0) {
      message.remove();
    } else if (message.length == 0) {
      var newMessage = $('<h1>')
        .attr('id', 'distracted')
        .text(messageText)
        .css('font-size', '30px')
        .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
        .css('position', 'relative')
        .css('top', '75px');
      $('[data-location=maincolumn]').append(newMessage);
    }

    feed.children().remove();
    $('.ticker_stream').remove();
    $('.ego_column').remove();
    $('#pagelet_games_rhc').remove();
    $('#pagelet_trending_tags_and_topics').remove();
    $('#pagelet_canvas_nav_content').remove();
  });
}

window.setInterval(blockAndDisplay, 100);
