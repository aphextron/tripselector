
(function(){
jQuery(function(){ 
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

    events: {
        "change .optionChange": "changeOptionVal",
        "click .yes_click": "yesClick",
        "click .no_click" : "noClick"
    },

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
    noClick: function(){
        alert('no')
    },
    yesClick: function(){
        alert('yes!');
    },
    changeOptionVal: function(){
        var optionArray = {}
        for (var i = 0; i < this.collection.models.length; i++) {

                        
                        var f = jQuery('.optionChange:eq('+i+')')[0].value;
                        if (f === "yes") { 
                                this.collection.models[i].set({"optionValue":"yes"});
                        }
                        if (f === "no"){
                            this.collection.models[i].set({"optionValue":"no"});
                        }
                        if(f === "0"){
                            this.collection.models[i].set({"optionValue":"0"});
                        }
                        if(f === "1"){
                            this.collection.models[i].set({"optionValue":"1"});
                        }
                        if(f === "2"){
                            this.collection.models[i].set({"optionValue":"2"});
                        }
                        if(f === "3"){
                            this.collection.models[i].set({"optionValue":"3"});
                        }
                        if(f === "Dole Plantation"){
                            this.collection.models[i].set({"optionValue":"dole"});
                        }
                        if(f === "Pearl Harbor"){
                            this.collection.models[i].set({"optionValue":"pearl"});
                        }
                        if(f === "Pearl Harbor and the Dole Plantation"){
                            this.collection.models[i].set({"optionValue":"pearlDole"});
                        }
                        if(f === "Circle Island"){
                            this.collection.models[i].set({"optionValue":"all"});
                        }
                       if(f === "North Shore"){
                            this.collection.models[i].set({"optionValue":"northShore"});
                        }
                        var option1 = this.collection.models[i].get("optionName");                  
                        var option2 = this.collection.models[i].get("optionValue");
                        
                        optionArray[option1] = option2;
                              
                        
                        
                 };
                 console.log(optionArray);
                  jQuery.ajax({
                    type: "GET",
                    url: "test.php",
                    data: optionArray
                    }).done(function(msg) {
                   jQuery('#ajaxReturn').html(msg);
                  });                         
    
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
    //events: { "click .delete": "test" },

    initialize: function () {
        //_.bindAll(this, 'render', 'test');
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return jQuery(this.el).append(this.template(this.model.toJSON()));
    }

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
});
})();
