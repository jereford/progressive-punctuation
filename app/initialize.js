var app;

app = require('application');

$(function() {
  app.initialize();

  var source = $("#marks").html();
  var template = Handlebars.compile(source);

  var data = {
    marks: [ {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    } ]
  };

  $('body').append(template(data));

  var source   = $("#some-template").html();
  var template = Handlebars.compile(source);
  var data = { users: [
      {username: "alan", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
      {username: "allison", firstName: "Allison", lastName: "House", email: "allison@test.com" },
      {username: "ryan", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
    ]};
    console.log('run');
  $("#content-placeholder").html(template(data));

  return
});
