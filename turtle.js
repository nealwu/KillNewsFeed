// Copyright (c) 2012 Neal Wu. All rights reserved.

var counter = 0;
/*
chrome.browserAction.onClicked.addListener(function(tab) {
    counter = 0;
});
*/
if (document.URL.indexOf("facebook.com") !== -1) {
    function block() {
        $('document').ready(function() {
            var message = $('<h1>');

            $('body').fadeOut(250, function() {
                $('html').append(message);

                message.html("Don't get addicted to Facebook!");
                message.css('font-size', '60px');
                message.css('position', 'absolute');

                var left = window.innerWidth / 2 - message.width() / 2;
                var top = window.innerHeight / 2 - message.height() / 2 - 50;

                message.css('left', left + 'px');
                message.css('top', top + 'px');
            });

            window.setTimeout(function() {
                message.hide();
                $('body').fadeIn(250);
            }, 1250);
        });
    }

    block();
    var classes = $('body').attr('class');

    window.setInterval(function() {
        var newClasses = $('body').attr('class');

        if (classes != newClasses) {
            classes = newClasses;
            counter++;
            chrome.browserAction.setBadgeText({text:String(counter)});
            block();
        }
    }, 250);
}