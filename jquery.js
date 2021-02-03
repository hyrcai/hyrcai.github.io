$(document).ready(function() {

    //add footer
    //                $("#footer").load("footer.html"); 

    //                $("body").addClass('hidden');

    //hamburger menu
    //                $("#hamburger").click(function(){
    //                    $("nav ul div").toggleClass('visible');
    //                    $("main").toggleClass('blur'); $("#favicon").toggleClass('blur');
    //                    $("footer").toggleClass('blur'); $("#container").toggleClass('visible');
    //                    $("#hamburger").toggleClass('x');
    //                })

    //filter & toggles
    $("button").click(function(event){

        // make clicked tags active
        var clicked = $(event.target);
        if (!clicked.hasClass('text')){
            clicked.toggleClass('active');
        }
        // handle toggles 
        if (clicked.parent(".toggle") && !clicked.hasClass('active') && clicked.hasClass('text')) {
            clicked.parent().children().toggleClass('active');
            //                        
            // toggle list/gallery view 🟩
            if ($("#list.active").length == 1) {
                $(".home").removeClass('gallery').addClass('list');
            } else if ($("#gallery.active").length == 1) {
                $(".home").removeClass('list').addClass('gallery');
            }
        }
        //mark active filter tags
        // type tags
        if (clicked.attr('type')) {
            //if specific tags active
            if ($("#filter button.active[type!='all']")  && (clicked.attr('type')!=='all') && clicked.attr('type')) {
                $("#filter button[type][type='all']").removeClass('active');
            }
            // if "all" active
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
            // if specific tags active
            if ($("#filter button.active[medium!='all']")  && (clicked.attr('medium')!=='all') && clicked.attr('medium')) {
                $("#filter button[medium][medium='all']").removeClass('active');
            }
            // if "all" active
            else if ($("#filter button.active[medium='all']")) {
                $("#filter button.active[medium][medium!='all']").removeClass('active');
            }
            // if none active, turn on "all"
            if ($("#filter button.active[medium]").length == 0) {
                ($("#filter button[medium][medium='all']")).addClass('active');
            }
        }

        // hide all projects
        $("div[class*='project']").addClass('hidden');

        //show projects with active tags 🟩
        //match any
        if ($("#list.active").length == 1 && $("#any.active").length == 1) {
            $("#filter button.active[type]").each(function(){
                $("div[class*='project spotlight'][type*='" + $(this).attr('type') + "']").removeClass('hidden');
            })
            $("#filter button.active[medium]").each(function(){
                $("div[class*='project spotlight'][medium*='" + $(this).attr('medium') + "']").removeClass('hidden');
            })
        } else if ($("#gallery.active").length == 1 && $("#any.active").length == 1) {
            $("#filter button.active[type]").each(function(){
                $("div[class*='project'][type*='" + $(this).attr('type') + "']").removeClass('hidden');
            })
            $("#filter button.active[medium]").each(function(){
                $("div[class*='project'][medium*='" + $(this).attr('medium') + "']").removeClass('hidden');
            })
        }

        //match all 🟨
        if ($("#all.active").length == 1) {
            var types = "";
            var mediums = "";
            // get active type tags
            $("#filter button.active[type]").each(function(){
                types += $(this).attr('type') + " ";
            }) 
            // get active medium tags
            $("#filter button.active[medium]").each(function(){
                mediums += $(this).attr('medium') + " ";
            })
            // list view
            if ($("#list.active").length == 1) {
                $("div[class*='project spotlight']" + chainValues("type", types) + chainValues("medium", mediums)).removeClass('hidden');
            } 
            // gallery view
            else if ($("#gallery.active").length == 1) {
                $("div[class*='project']" + chainValues("type", types) + chainValues("medium", mediums)).removeClass('hidden');
            }
        }

        //show all projects if reset 🟩
        if ($("#filter button.active[type='all']").length == 1 && $("#filter button.active[medium='all']").length == 1 && $("#all.active").length == 0) {
            $("div[class*='project']").removeClass('hidden');
        }

        //show message if no projects found 🟩
        if ($("#list.active")) {
            if ($("div[class*='project spotlight']").length == $("div[class*='project spotlight'][class*='hidden']").length) {
                $("#no-matches").removeClass('hidden');
            } else {
                $("#no-matches").addClass('hidden');
            }
        }
        if ($("#gallery.active")) {
            if ($("div[class*='project']").length == $("div[class*='project'][class*='hidden']").length) {
                $("#no-matches").removeClass('hidden');
            } else {
                $("#no-matches").addClass('hidden');
            }
        }
    })

    //functions
    function chainValues(attribute, values) {
        var chain = "";
        values = values.split(" ");
        console.log(values);
        for (var v in values) {
            if (values[v] !== "") {
                console.log(values[v]);
                chain += "[" + attribute + "*='" + values[v] + "']"
            }
        }
        return chain;
    }
})