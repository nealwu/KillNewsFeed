function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream]');
    var message = $('#distracted');

    if (feed.length == 0) {
        message.remove();
    } else if (message.length == 0) {
        feed.hide();
        message = $('<h1>');
        message.attr('id', 'distracted');
        message.html("Don't get distracted by FB!");
        message.css('font-size', '36px');
        message.css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif");
        message.css('position', 'relative');
        message.css('top', '100px');
        message.css('float', 'left');
        $('[data-location=maincolumn]').append(message);
    }
}

if (document.URL.indexOf("facebook.com") !== -1) {
    blockAndDisplay();
    setInterval(blockAndDisplay, 200);
}