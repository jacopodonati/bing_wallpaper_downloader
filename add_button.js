$(document).ready(function () {

    function update_url() {
        // Get the background-image URL
        var bg = $('#bgDiv').css('background-image');
        // As of September 2019, the URL Bing provides is rubbish. From something like:
        //   url(/th?id=OHR.Wachsenburg_ROW0528535015_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp)
        // We need to get something like:
        //   /th?id=OHR.Wachsenburg_ROW0528535015_1920x1080.jpg
        // `bg_url` will be used for href attribute. `bg_file` will be the filename once it's saved.
        bg_url = bg.substring('url("'.length, bg.indexOf('jpg') + 3);
        bg_file = bg.substring(bg.indexOf('id=OHR.')+"id=OHR.".length, bg.indexOf('jpg') + 3);

        // Remove any prior download button. Useful when you change Bing's background by clicking on
        $('#sh_dw').remove();

        // Create the button and append it.
        var button = $('<a>').attr({
            id: 'sh_dw',
            role: 'button',
            class: 'sc_light',
            title: 'Download wallpaper',
            href: bg_url,
            download: bg_file
        }).append($('<div>')
            .append($('<div>').attr('id', 'sh_dw_in')));
        $('#sh_rdiv').append(button);
    }

    update_url();

    var targetNode = document.getElementById('bgDiv');
    var config = {
        attributes: true
    };

    var callback = function (mutationsList) {
        for (var mutation of mutationsList) {
            update_url();
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});