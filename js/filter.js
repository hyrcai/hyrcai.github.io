$(document).ready(function () {

    //filter & toggles
    $("button").click(function (event) {
        // make clicked tags active
        var clicked = $(event.target);
        if (!clicked.hasClass('text')) {
            clicked.toggleClass('active');
        }
        // handle toggles 
        if (clicked.parent(".toggle") && !clicked.hasClass('active') && clicked.hasClass('text')) {
            clicked.parent().children().toggleClass('active');
        }
        // mark active filter tags:
        // type tags
        if (clicked.attr('type')) {
            //if specific tags active, turn off "all"
            if ($("#filter button.active[type!='all']") && (clicked.attr('type') != 'all') && clicked.attr('type')) {
                $("#filter button[type][type='all']").removeClass('active');
            }
            // if "all" active, turn off other tags
            else if ($("#filter button.active[type='all']")) {
                $("#filter button.active[type][type!='all']").removeClass('active');
            }
            // if none active, turn on "all"
            if ($("#filter button.active[type]").length == 0) {
                ($("#filter button[type][type='all']")).addClass('active');
            }
        }
        // medium tags
        else if (clicked.attr('medium')) {
            // if specific tags active, turn off "all"
            if ($("#filter button.active[medium!='all']") && (clicked.attr('medium') != 'all') && clicked.attr('medium')) {
                $("#filter button[medium][medium='all']").removeClass('active');
            }
            // if "all" active, turn off other tags
            else if ($("#filter button.active[medium='all']")) {
                $("#filter button.active[medium][medium!='all']").removeClass('active');
            }
            // if none active, turn on "all"
            if ($("#filter button.active[medium]").length == 0) {
                ($("#filter button[medium][medium='all']")).addClass('active');
            }
        }

        // hide all stacks initially
        $("div[class='stack']").addClass('hidden');

        // show stacks with active tags: 
        // match any
        if ($("#any.active").length == 1) {
            $("#filter button.active[type]").each(function () {
                $("div[class*='stack'][type*='" + $(this).attr('type') + "']").removeClass('display-none');
                $("div[class*='stack'][type*='" + $(this).attr('type') + "']").removeClass('hidden');
            })
            $("#filter button.active[medium]").each(function () {
                $("div[class*='stack'][medium*='" + $(this).attr('type') + "']").removeClass('display-none');
                $("div[class*='stack'][medium*='" + $(this).attr('medium') + "']").removeClass('hidden');
            })
        }
        // match all
        if ($("#all.active").length == 1) {
            var types = "";
            var mediums = "";
            // get active type tags
            $("#filter button.active[type]").each(function () {
                types += $(this).attr('type') + " ";
            })
            // get active medium tags
            $("#filter button.active[medium]").each(function () {
                mediums += $(this).attr('medium') + " ";
            })
            // gallery view
            $("div[class*='stack']" + chainValues("type", types) + chainValues("medium", mediums)).removeClass('display-none');
            $("div[class*='stack']" + chainValues("type", types) + chainValues("medium", mediums)).removeClass('hidden');
        }

        // show all stacks if reset
        if ($("#filter button.active[type='all']").length == 1 && $("#filter button.active[medium='all']").length == 1 && $("#all.active").length == 0) {
            $("div[class*='stack']").removeClass('display-none');
            $("div[class*='stack']").removeClass('hidden');
        }

        // show message if no stacks found
        if ($("div[class='stack']").length == $("div[class='stack'][class*='hidden']").length) {
            $("#no-matches").removeClass('hidden');
        } else {
            $("#no-matches").addClass('hidden');
        }

        // add display-none to hidden stacks
        setTimeout(function () {
            $("div[class*='stack hidden']").addClass('display-none');
        }, 750);
    })

    // utility functions
    function chainValues(attribute, values) {
        var chain = "";
        values = values.split(" ");
        for (var v in values) {
            if (values[v] != "") {
                chain += "[" + attribute + "*='" + values[v] + "']"
            }
        }
        return chain;
    }
})