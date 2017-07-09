$(function () {
    chrome.tabs.query({
        active: true
        , currentWindow: true
    }, function (arrayOfTabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = arrayOfTabs[0];
        var activeTabId = activeTab.id; // or do whatever you need
        $.getJSON("https://trello.com/b/" + getSegment(activeTab.url, 2) + ".json", function (data) {
            $("<h1/>", {
                html: data.name+" -  "+getToday()
            }).appendTo("body");
            $.each(data.lists, function (key, listObj) {
                $("<hr/>",{
                    style:"height:1px;border:none;color:#333;background-color:#333;"
                }).appendTo("body");
                $("<h2/>", {
                    html: listObj.name+":"
                }).appendTo("body");
                $("<ul/>", {
                    id: listObj.id
                }).appendTo("body");
                //Non-efficient dirty looped code
                $.each(data.cards, function (key2, cardObj) {
                    if (!cardObj.closed && listObj.id === cardObj.idList) {
                        $("<li/>", {
                            html: cardObj.name
                        }).appendTo("#" + listObj.id);
                    }
                });
            });
        });
    });
    var getSegment = function (url, index) {
        return url.replace(/^https?:\/\//, '').split('/')[index];
    }
    var getToday = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
});