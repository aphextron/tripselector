/// <reference path="../../scripts/libs/jquery-1.7.1.js" />
/// <reference path="../../scripts/libs/underscore.js" />
/// <reference path="../../scripts/libs/backbone.js" />
jQuery(function(){ 
    
var Theater = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

Theater.Models.Movie = Backbone.Model.extend({});
Theater.Models.tourPackage = Backbone.Model.extend({

          defaults: {
            "id": "",
            "name": "",
            "greeting": "false",
            "canoeRide": "false",
            "behindScenes": "false",
            "dvd": "false",
            "desert": "false",
            "tourGuide": "false",
            "dinner": "0",
            "seatingLevel": "0",
            "combo": "false"
  }

});
Theater.Collections.Movies = Backbone.Collection.extend({
    model: Theater.Models.Movie,
    url: "./data/tours.json",
    initialize: function(){
        console.log("Movies initialize")
    }
});

Theater.Templates.movies = _.template($("#tmplt-Movies").html())

Theater.Views.Movies = Backbone.View.extend({
    el: $("#mainContainer"),
    template: Theater.Templates.movies,

    events: {
        "change .optionChange": "changeOptionVal",

    },

    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },

    render: function () {
        $(this.el).html(this.template());
        this.addAll();
        $('#mainContainer ul li:eq(0)').hide()
        $('#mainContainer ul li:eq(1)').hide()
    },

    changeOptionVal: function(){
        var optionArray = {}
        for (var i = 0; i < this.collection.models.length; i++) {

                        
                        var f = $('.optionChange:eq('+i+')')[0].value;
                        if (f === "yes") { 
                                this.collection.models[i].set({"optionValue":"yes"});
                        }
                        if (f === "no"){
                            this.collection.models[i].set({"optionValue":"no"});
                        }
                       
                        var option1 = this.collection.models[i].get("optionName");                  
                        var option2 = this.collection.models[i].get("optionValue");
                        
                        optionArray[option1] = option2;
                              
                        
                        
                 };
                 console.log(optionArray);
      $.ajax({
        type: "GET",
        url: "test.php",
        data: optionArray
        }).done(function(msg) {
       $('#ajaxReturn').html(msg);
        });                         
    
    },

    addAll: function () {
        console.log("addAll")
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne")
        view = new Theater.Views.Movie({ model: model });
        $("ul", this.el).append(view.render());
    }

})


Theater.Templates.movie = _.template($("#tmplt-Movie").html())
Theater.Views.Movie = Backbone.View.extend({
    tagName: "li",
    template: Theater.Templates.movie,
    //events: { "click .delete": "test" },

    initialize: function () {
        //_.bindAll(this, 'render', 'test');
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return $(this.el).append(this.template(this.model.toJSON())) ;
    },

    removeItem: function (model) {
        console.log("Remove - " + model.get("Name"))
        this.remove();
    }
})


Theater.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"  //http://localhost:22257/Theater/theater.htm
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        Theater.movies = new Theater.Collections.Movies()
        new Theater.Views.Movies({ collection: Theater.movies }); //Add this line
        Theater.movies.fetch();
        console.log(Theater.movies.length)
    }
})

var appRouter = new Theater.Router();
Backbone.history.start();
});

