

var db = null;

angular.module('starter', ['ionic', 'starter.controllers','flickrApp.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    console.log("Aditya: reading current directory");
     window.plugins.sqlDB.copy("htci.db", 1, copysuccess,copyerror);

    db = $cordovaSQLite.openDB("htci.db");
     
    // $cordovaSQLite.execute(db, "INSERT INTO tblPriests (id, Name, Lang, picurl) VALUES (1,'Sri BadriNath', 'Hindi, Nepali & English', 'img/1.jpg')");

    console.log(db);
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
      }
    }
  })
  .state('app.facebook', {
    url: "/facebook",
    views: {
      'menuContent': {
        templateUrl: "templates/facebook.html"
      }
    }
  })
 .state('app.events', {
     url: "/events",
     views: {
       'menuContent': {
         templateUrl: "templates/upcomingevents.html"

       }
     }
  })
  .state('app.priests', {
       url: "/priests",
       views: {
         'menuContent': {
           templateUrl: "templates/meetourpriests.html",
           controller: "dbController"
         }
       }
    })
  .state('app.donate', {
     url: "/donate",
     views: {
       'menuContent': {
       templateUrl: "templates/makeadonation.html"
       }
     }
  })
  .state('app.timings', {
       url: "/timings",
       views: {
         'menuContent': {
         templateUrl: "templates/templetimings.html"
         }
       }
    })
   .state('app.booking', {
         url: "/booking",
         views: {
           'menuContent': {
           templateUrl: "templates/bookanevent.html"
           }
         }
   })
   .state('app.photos', {
            url: "/photos",
            views: {
              'menuContent': {
              templateUrl: "templates/photos.html",
              controller: 'MainCtrl'
              }
            }
   })

    .state('app.contact', {
         url: "/contact",
         views: {
           'menuContent': {
           templateUrl: "templates/contactus.html"
           }
         }
   })
    .state('app.location', {
            url: "/location",
            views: {
              'menuContent': {
              templateUrl: "templates/location.html"
              }
            }
      })
      .state('app.moreinfo', {
                  url: "/moreinfo",
                  views: {
                    'menuContent': {
                    templateUrl: "templates/moreinfo.html"
                    }
                  }
            })
  .state('app.credit', {
    url: "/credit",
    views: {
      'menuContent': {
        templateUrl: "templates/credit.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
