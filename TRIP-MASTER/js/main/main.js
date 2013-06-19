
var tourApp = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

tourApp.Models.Tour = Backbone.Model.extend({});
tourApp.Models.tourPackage = Backbone.Model.extend({

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

tourApp.Collections.Tours = Backbone.Collection.extend({
    model: tourApp.Models.Tour,
    url: "./data/tours.json",
    
    initialize: function(){
        console.log("Tours initialize")
    }
});

tourApp.Templates.tours = _.template(jQuery("#tmplt-Tours").html())

tourApp.Views.Tours = Backbone.View.extend({
    el: jQuery("#mainContainer"),
    template: tourApp.Templates.tours,

    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },

    render: function () {
        jQuery(this.el).html(this.template());
        this.addAll();
        jQuery('#mainContainer ul li:eq(0)').hide()
        jQuery('#mainContainer ul li:eq(1)').hide()
    },

    addAll: function () {
        console.log("addAll")
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne")
        view = new tourApp.Views.Tour({ model: model });
        jQuery("ul", this.el).append(view.render());
    }

});


tourApp.Templates.tour = _.template(jQuery("#tmplt-Tour").html())
tourApp.Views.Tour = Backbone.View.extend({
    tagName: "li",
    template: tourApp.Templates.tour,
    events: { 
        "click .no_click" : "noClick",
        "click .yes_click": "yesClick",
        "change .optionChange": "changeOptionVal"
    },

    initialize: function () {
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return jQuery(this.el).append(this.template(this.model.toJSON()));
    },
    
    changeOptionVal: function() {
    var q = this.model.get("title");
    var r = jQuery('.optionChange').eq(0).val();
    var s = jQuery('.optionChange').eq(1).val();
    var t = jQuery('.optionChange').eq(2).val();

        if (q == "Dinner") { 
            this.model.set({
                "optionValue": r
            })
            console.log(this.model.get("optionValue"));   

         };
        if (q == "Seating"){
          this.model.set({
                "optionValue": s
            })
            console.log(this.model.get("optionValue"));   
            
            
        }
        if(q == "Tour combination"){
          this.model.set({
                "optionValue": t
            })
            console.log(this.model.get("optionValue"));   
            
        }
    },


    noClick: function(){
        var model = this;
        model.model.set({"optionValue":"no"});
        console.log(model.model.attributes);
    },

    yesClick: function(){
        var model = this;
        model.model.set({"optionValue":"yes"});
        console.log(model.model.attributes);
    },

});


tourApp.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute" 
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        tourApp.tours = new tourApp.Collections.Tours()
        new tourApp.Views.Tours({ collection: tourApp.tours }); //Add this line
        tourApp.tours.fetch();
        console.log(tourApp.tours.length)
    }
});

var appRouter = new tourApp.Router();
Backbone.history.start();

jQuery("#findTour").click(function(){    
    var c = {};
    for (var i = 0; i < tourApp.tours.length; i++){
      var a = tourApp.tours.models[i].get("optionName");
      var b = tourApp.tours.models[i].get("optionValue");
      c[a] = b;
    }

    console.log(c);

jQuery.ajax({
    type: "GET",
    url: "test.php",
    data: c
    }).done(function(msg) {
    jQuery('#ajaxReturn').html("<h2>" + msg + "<h2>");
    });                         
});
