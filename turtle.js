function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream]');
    var message = $('#distracted');

    if (feed.length == 0) {
        message.remove();
    } else if (message.length == 0) {
        feed.hide();
        message = $('<h1>')
          .attr({ id: 'distracted' })
          .html("Don't get distracted by Facebook!")
          .css({
            'font-size': '32px',
            'font-family': "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif",
            position: 'relative',
            top: '100px'
          });
        $('[data-location=maincolumn]').append(message);
    }
}

if (document.URL.indexOf("facebook.com") !== -1) {
    blockAndDisplay();
    setInterval(blockAndDisplay, 200);
}
