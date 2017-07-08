"use strict";

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
            console.log(list);
        })
        .catch((err) => {
            alert(err);
        });
};

/**
 * Init all the things...
 */
jk(() => {
    // Load the runs.json file from server.
    loadRuns();
});