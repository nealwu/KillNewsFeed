// Copyright (c) 2012 Neal Wu. All rights reserved.

function getFeed() {
    return $('[id^=topnews_main_stream]');
}

function blockAndDisplay() {
    $('#distraction_message').remove();
    var feed = getFeed();

    if (feed.length > 0) {
        feed.hide();

        var container = $('#globalContainer');
        var message = $('<h1>');
        message.attr('id', 'distraction_message');
        message.html("Don't get distracted by Facebook!");
        message.css('font-size', '36px');
        message.css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif");
        message.css('position', 'absolute');
        message.css('left', '20px');
        message.css('top', '250px');
        container.append(message);
   }
}

if (document.URL.indexOf("facebook.com") !== -1) {
    setInterval(blockAndDisplay, 250);
}