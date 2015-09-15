$(document).ready(function() {
    if (0 < $("#skip-to-content").length) {
        $("#skip-to-content").remove();
    }
    if (0 < $("[data-collapse-group]").length) {
        var collapsableElements = {};
        $("[data-collapse-group]").each(function() {
            var group = $(this).data("collapse-group");
            var id = $(this).attr("id");
            var element = $("#" + id);
            if (!(collapsableElements[group])) {
                collapsableElements[group] = [];
            }
            collapsableElements[group][collapsableElements[group].length] = element;
            element.hide();
            $("[href='#" + id + "']").click(function() {
                for (i in collapsableElements[group]) {
                    if (collapsableElements[group][i] != element) {
                        collapsableElements[group][i].slideUp(150, function(i, group, element) {
                            return function() {
                                var isLastIteration = (i == collapsableElements[group].length - 1);
                                var elementClickedIsLastElement = (element == collapsableElements[group][collapsableElements[group].length - 1]);
                                var isSecondToLastIteration = (i == collapsableElements[group].length - 2);
                                if ((elementClickedIsLastElement && isSecondToLastIteration) || isLastIteration) {
                                    slideToggleElement(element);
                                }
                            }
                        }(i, group, element));
                    } else if (1 == collapsableElements[group].length) {
                        slideToggleElement(element);
                    }
                }
                return false;
            });
        });
        function slideToggleElement(element) {
            if (window._gaq && !element.is(":visible")) {
                _gaq.push(["_trackEvent", "Collapsible", "Expand", element.attr("id"), undefined, true]);
            }
            element.delay(150).slideToggle(200);
        }
    }
    if ($(".twitter.timeline .tweet").length > 0) {
        $(".twitter.timeline .tweet").each(function() {
            var tweet = $(this);
            var footer = tweet.find("footer");
            footer.hide();
            tweet.mouseenter(function() {
                footer.slideToggle();
            }).mouseleave(function() {
                footer.slideToggle();
            });
        });
        $(".twitter.timeline .tweet footer a").click(function() {
            if (window._gaq) {
                _gaq.push(["_trackEvent", "Twitter", $(this).attr("title"), $(this).attr("href"), undefined, true]);
            }
        });
    }
    if (0 < $("[data-player-type='launch-player']").length) {
        $("[data-player-type='launch-player']").each(function() {
            launchAudioPlayer($(this));
        });
    }
    if (0 < $("[data-logo-path]").length) {
        if (Modernizr.svg && Modernizr.inlinesvg) {
            $("[data-logo-path]").each(function() {
                var element = $(this);
                var title = element.text();
                var path = element.data("logo-path");
                $.get(path, function(element, title) {
                    return function(data) {
                        data = data.replace(/[\t\r\n]+/g, "");
                        element.html(data).attr("title", title);
                    };
                }(element, title), "html");
            });
        }
    }
});
function launchAudioPlayer(element) {
    element.click(function() {
        window.open(element.attr("href"), "audioPlayer", "resizable = 0, status = 0, toolbar = 0, location = 0, menubar = 0, directories = 0, scrollbars = 1, width = 800, height = 600");
        return false;
    });
}
