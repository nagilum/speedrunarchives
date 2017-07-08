"use strict";

// A loaded list of all runs.
var runs = [],
    filter,
    filterWrapper;

/**
 * Filter the output list.
 */
var filterRuns = () => {
    if (filter.value === '' && filterWrapper.hasClass('filled')) {
        filterWrapper.removeClass('filled');
    }
    else if (filter.value !== '' && !filterWrapper.hasClass('filled')) {
        filterWrapper.addClass('filled');
    }

    runs.forEach((run) => {
        var show = true;

        // Check filter.
        if (filter.value !== '') {
            show = false;

            filter.value.split(' ').forEach((keyword) => {
                // Games
                run.games.forEach((game) => {
                    // Name
                    if (game.title.toLowerCase().indexOf(keyword) > -1) {
                        show = true;
                    }

                    // Platforms
                    game.platforms.forEach((platform) => {
                        // Name
                        if (platform.name.toLowerCase().indexOf(keyword) > -1) {
                            show = true;
                        }

                        // Year
                        if (platform.year.toString().toLowerCase().indexOf(keyword) > -1) {
                            show = true;
                        }
                    });
                });

                // Category
                if (run.category.toLowerCase().indexOf(keyword) > -1) {
                    show = true;
                }

                // Runners
                run.runners.forEach((runner) => {
                    // Name
                    if (runner.name.toLowerCase().indexOf(keyword) > -1) {
                        show = true;
                    }
                });

                // Event
                if (run.event.toLowerCase().indexOf(keyword) > -1) {
                    show = true;
                }
            });
        }

        // Show/hide..
        if (show) {
            jk('li.run-' + run.index).show();
        }
        else {
            jk('li.run-' + run.index).hide();
        }
    });
};

/**
 * Load the runs.json file from server.
 */
var loadRuns = () => {
    fetch('/runs.json',
        {
            method: 'GET'
        })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }

            return res.json();
        })
        .then((list) => {
            if (!list) {
                throw new Error('List of runs is empty');
            }

            // Save the list to global var.
            for (var i = 0; i < list.length; i++) {
                list[i].index = i;
            }

            runs = list;

            // Populate the HTML with the loaded list.
            popuplateRuns();
        })
        .catch((err) => {
            alert(err);
        });
};

/**
 * Populate the HTML with the loaded list.
 */
var popuplateRuns = () => {
    var ul = jk('ul#runs');

    runs.forEach((run) => {
        var li = jk('<li>'),
            a = jk('<a>'),
            span = jk('<span>'),
            games = [],
            runners = [];
        
        run.games.forEach((game) => {
            if (!games.contains(game.title)) {
                games.push(game.title);
            }
        });

        run.runners.forEach((runner) => {
            if (!runners.contains(runner.name)) {
                runners.push(runner.name);
            }
        });
        
        span.html('<strong>' + games.join(', ') + ' ' + run.category + '</strong> by ' + runners.join(', ') + ' at ' + run.event);

        a
            .css({
                'background-image': 'url("' + run.thumbnail + '")'
            })
            .attr('href', run.video)
            .append(span);

        li
            .addClass('run-' + run.index)
            .append(a);
        
        ul.append(li);
    });
};

/**
 * Init all the things...
 */
jk(() => {
    // Bind elements.
    filter = jk('input#filter');
    filterWrapper = filter.parent();

    // Bind events.
    filter.on('keyup', filterRuns);

    // Load the runs.json file from server.
    loadRuns();
});