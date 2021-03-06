

var db = null;

angular.module('starter', ['ionic', 'starter.controllers','flickrApp.services', 'ngCordova','firebase','starter.directives'])

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

    db = $cordovaSQLite.openDB("htci.db",2);
    //$cordovaSQLite.execute(db, "INSERT INTO tblPriests (id, Name, Lang, picurl) VALUES (1,'Sri BadriNath', 'Hindi, Nepali & English', 'img/1.jpg')");

    //$cordovaSQLite.execute(db, "INSERT INTO tblPriests (id, Name, Lang, picurl) VALUES (1,'Sri BadriNath', 'Hindi, Nepali & English', 'img/1.jpg')",console.log("Ho gaya"),console.log("Nahi Hua"));

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
        templateUrl: "templates/facebook.html",
        controller: "FaceCtrl"
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
           templateUrl: "templates/bookanevent.html",
           controller: "EventBookingCtrl"
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
   .state('app.album', {
               url: "/album/:id",
               views: {
                 'menuContent': {
                 templateUrl: "templates/album.html",
                 controller: 'AlbumCtrl'
                 }
               }
      })


    .state('app.contact', {
         url: "/contact",
         views: {
           'menuContent': {
           templateUrl: "templates/contactus.html",
           controller: "contactCtrl"
           }
         }
   })
    .state('app.location', {
            url: "/location",
            views: {
              'menuContent': {
              templateUrl: "templates/location.html",
              controller: "MapController"
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
     .state('app.mailack', {
          url: "/mailack",
          views: {
            'menuContent': {
              templateUrl: "templates/mailack.html"
            }
          }
        })
  .state('app.panchang', {
           url: "/panchang",
           views: {
             'menuContent': {
               templateUrl: "templates/panchang.html"
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
