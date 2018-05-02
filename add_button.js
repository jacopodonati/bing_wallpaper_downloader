$(document).ready(function() {
    //var download_icon = browser.extension.getURL("images/download.png");
    
    function update_url() {
        var bg = $('#bgDiv').css('background-image');
        bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
        bg_file = bg.split('/').pop();
        
        $('#sh_dw').remove();

        var button = $('<a>').attr({
            id: 'sh_dw',
            role: 'button',
            class: 'sc_light',
            title: 'Download wallpaper',
            href: bg,
            download: bg_file
        }).append($('<div>')
        .append($('<div>').attr('id', 'sh_dw_in')));
        //$('#sh_dw_in').css('background-image', 'url(' + download_icon + ')');
        $('#sh_rdiv').append(button);
    }

    update_url();

    var targetNode = document.getElementById('bgDiv');
    var config = { attributes: true };

    var callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            update_url();
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});