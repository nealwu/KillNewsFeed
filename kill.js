var intervalId
var quotesUrl = chrome.extension.getURL('quotes.json')
var imageUrl = chrome.extension.getURL('images/vw-bus.jpeg')
var quote = ""
$.getJSON(quotesUrl, function(json) {
  var quotes = json.quotes
  quote = quotes[Math.floor(Math.random()*quotes.length)]
})

var feedString = '[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]'
var elementsToRemove = [
  '.ticker_stream',
  '.ego_column',
  '#pagelet_games_rhc',
  '#pagelet_trending_tags_and_topics',
  '#pagelet_canvas_nav_content'
]

function hideTimelineAndDisplayQuote() {
  var optionsUrl = chrome.extension.getURL('options.html')
  var feed = $(feedString)

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
      var timelineReplacementContainer = $('<div>')
        .attr('id', 'timeline-replacement-container')
        .css('text-align', 'center')
      if ($('#timeline-replacement-container').length == 0) $('[data-location=maincolumn]').append(timelineReplacementContainer)

      var newMessage = $('<h1>')
        .attr('id', 'distracted')
        .text(messageText)
        .css('font-size', '25px')
        .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
        .css('padding', '20px')
        .css('text-align', 'left')
        .css('border-top', 'solid rgb(231, 232, 235) 20px')
      if ($('#distracted').length == 0) $('#timeline-replacement-container').append(newMessage)

      var image = $('<img>')
        .attr('id', 'better-image')
        .attr('src', imageUrl)
        .attr('alt', 'A really nice picture!')
        .css('width', '90%')
      if ($('#better-image').length == 0) $('#timeline-replacement-container').append('<br>').append(image)

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

      // var unhideTimeline = $('<a>')
      //   .attr('id', 'unhide-timeline')
      //   .attr('onclick', 'displayTimeline();')
      //   .text('Unhide timeline')
      // if ($('#unhide-timeline').length == 0) {
      //   $('#distracted').append('<br>').append(unhideTimeline)
      // }
    }

    feed.children().hide()
    for (var i in elementsToRemove) {
      $(elementsToRemove[i]).hide()
    }
  });
}

function displayTimeline() {
  window.clearInterval(intervalId)
  $('#distracted').hide()

  $(feedString).children().show()
  for (var i in elementsToRemove) {
    $(elementsToRemove[i]).show()
  }
}

function hideTimeline() {
  intervalId = window.setInterval(hideTimelineAndDisplayQuote, 100)
}

hideTimeline()
