var quotesUrl = chrome.extension.getURL('quotes.json')
var quote = ""
$.getJSON(quotesUrl, function(json) {
  var quotes = json.quotes
  quote = quotes[Math.floor(Math.random()*quotes.length)]
})

function blockAndDisplay() {
  var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]')
  var optionsUrl = chrome.extension.getURL('options.html')

  var elementsToRemove = [
    '.ticker_stream',
    '.ego_column',
    '#pagelet_games_rhc',
    '#pagelet_trending_tags_and_topics',
    '#pagelet_canvas_nav_content'
  ]
  var message = $('#distracted')

  chrome.storage.sync.get({
    displayText: "Don't get distracted by Facebook"
  }, function(items) {
    var messageText
    if (quote.length) {
      messageText = quote
    } else {
      messageText = items.displayText
    }

    if (feed.length == 0) {
      message.remove()
    } else if (message.length == 0) {
      var newMessage = $('<h1>')
        .attr('id', 'distracted')
        .text(messageText)
        .css('font-size', '25px')
        .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
        .css('padding', '20px')
        .css('border-top', 'solid rgb(231, 232, 235) 20px')
      if ($('#distracted').length == 0) $('[data-location=maincolumn]').append(newMessage)

      // var optionsLink = $('<a>')
      //   .attr('id', 'options-link')
      //   .attr('href', optionsUrl)
      //   .attr('target', '_blank')
      //   .text('Click here to change options for this extension')
      //   .css('font-size', '15px')
      //   .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
      // if ($('#options-link').length == 0) {
      //   $('#distracted').append('<br>').append(optionsLink)
      // }
    }

    feed.children().hide()
    for (var i in elementsToRemove) {
      $(elementsToRemove[i]).hide()
    }
  });
}

window.setInterval(blockAndDisplay, 100)
