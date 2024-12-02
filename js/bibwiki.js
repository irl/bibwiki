
// JavaScript functions for BibTeX generator for Wikipedia
//
// (C) Iain R. Learmonth 2013, 2017.
//
// Made available under the terms of the GNU GPL v2 or any later version at your
// option.
//

function pageNotFound() {
    alert("That page could not be found via the Wikipedia API. Sorry.");
}

function followRedirects(country, title, callback) {
    var url = 'https://' + country + '.wikipedia.org/w/api.php?format=json&callback=?&action=query&redirects&titles=' + title;
    $.getJSON(url, function(apiResult){
        var pages = apiResult.query.pages;
        var page = Object.keys(pages)[0];
        if ( page == "-1" ) {
            pageNotFound(); return;
        } else {
            callback(country, pages[page]['title']);
        }
    });
}

function getPageDetails(country, title, callback) {
    var url = 'https://' + country + '.wikipedia.org/w/api.php?format=json&callback=?&action=query&prop=revisions&titles=' + title;
    $.getJSON(url, function(apiResult){
        var pages = apiResult.query.pages;
        var page = Object.keys(pages)[0];
        if ( page == "-1" ) {
            pageNotFound(); return;
        } else {
            callback({'title': pages[page]['title'], 'country': country, 'oldid': pages[page]['revisions'][0]['revid']})
        }
    });
}

function nameifyTitle(title) {
    return title.split(" ").join("_");
}

function updateBibtex() {
    var country = ($('#input').val()).substring(8,10);
    var input = ($('#input').val()).substring(($('#input').val()).lastIndexOf("/") + 1);

    followRedirects(country, input, function(country, title) {
    getPageDetails(country, title, function(info) {
        $('#output').text('@misc{wiki:' + nameifyTitle(info.title) + ',\n' +
        '   author = "Wikipedia",\n' +
        '   title = "{' + info.title + '} --- {W}ikipedia{,} The Free Encyclopedia",\n' +
        '   year = "' + moment().format('YYYY') + '",\n' +
        '   howpublished = {\\' + $('#urlpackage').val() + '{http://' + info.country + '.wikipedia.org/w/index.php?title=' + encodeURIComponent(info.title).split("%").join("\\%") + '&oldid=' + info.oldid + '}},\n' +
        '   note = "[Online; accessed ' + moment().format('DD-MMMM-YYYY') + ']"\n' +
        ' }');

        $('#sample').html('Wikipedia. <em>' + info.title + '</em>. <tt><a href="http://' + info.country + '.wikipedia.org/w/index.php?title=' + encodeURIComponent(info.title) + '&amp;oldid=' + info.oldid + '">http://' + info.country + '.wikipedia.org/w/index.php?title='+ encodeURIComponent(info.title) +'&amp;oldid='+ info.oldid +'</a></tt>, ' + moment().format('YYYY') + '. [Online; accessed ' + moment().format('DD-MMMM-YYYY') + ']');

        });
    });
}

function copyBibtex() {
    var content = $('#output').val();
    navigator.clipboard.writeText(content);
}

// The following is from http://stackoverflow.com/a/3855394

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

