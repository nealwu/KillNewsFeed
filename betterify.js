var intervalId
var quotesUrl = chrome.extension.getURL('quotes.json')
var picturesUrl = chrome.extension.getURL('pictures.json')
var quote = ""
$.getJSON(quotesUrl, function(json) {
  $.getJSON(picturesUrl, function(pictures) {
    var quotes = json.quotes
    // quote = quotes[Math.floor(Math.random()*quotes.length)]
    date = new Date().getDate()
    picture = pictures[date]
    quote = quotes[date]
  })
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
        .css('border-top', 'solid rgb(231, 232, 235) 20px')
        .css('background', 'white')
      if ($('#timeline-replacement-container').length == 0) $('#pagelet_composer').after(timelineReplacementContainer)

      var image = $('<img>')
        .attr('id', 'better-image')
        .attr('src', picture)
        .attr('alt', 'A really nice picture!')
        .css('padding-top', '20px')
        .css('width', '90%')
      if ($('#better-image').length == 0) $('#timeline-replacement-container').append(image)

      var newMessage = $('<h1>')
        .attr('id', 'distracted')
        .text(messageText)
        .css('font-size', '25px')
        .css('padding', '20px')
        .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
        .css('text-align', 'left')
      if ($('#distracted').length == 0) $('#timeline-replacement-container').append('<br>').append(newMessage)

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

    feed.children().css('opacity', 0)
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
  intervalId = window.setInterval(hideTimelineAndDisplayQuote, 100);
}

hideTimeline()
