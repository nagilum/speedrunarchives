"use strict";

// A loaded list of all runs.
var runs = [];

/**
 * Filter the output list.
 */
var filterRuns = () => {
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

    runs.forEach((item) => {
        console.log(item);

        var li = jk('<li>'),
            a = jk('<a>');

        a
            .css({
                'background-image': 'url("' + item.thumbnail + '")'
            });
        
        li.appendChild(a);
        ul.appendChild(li);
    });
};

/**
 * Init all the things...
 */
jk(() => {
    // Bind element events.
    jk('input#tbFilter').on('change', filterRuns);

    // Load the runs.json file from server.
    loadRuns();
});