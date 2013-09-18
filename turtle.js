function blockAndDisplay() {
    $('#distracted').remove();
    var feed = $('[id^=topnews_main_stream]');

    if (feed.length > 0) {
        feed.hide();

        var message = $('<h1>');
        message.attr('id', 'distracted');
        message.html("Don't get distracted by FB!");
        message.css('font-size', '36px');
        message.css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif");
        message.css('position', 'relative');
        message.css('top', '100px');
        message.css('float', 'left');
        $('#u_0_i').append(message);
    }
}

if (document.URL.indexOf("facebook.com") !== -1) {
    blockAndDisplay();
    setInterval(blockAndDisplay, 200);
}