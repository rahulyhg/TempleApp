angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainCtrl', function($scope,$ionicLoading,$state,Flickr){
	$ionicLoading.show();

	// Getting Photosets Detail from Flickr Service
	Flickr.getPhotoSets().then(function(result){
		$scope.photoList = result.data.photosets.photoset;
		$ionicLoading.hide();
	});

	// Opening Album
	$scope.openAlbum = function(photoset_id) {
    	$state.go('album',{id: photoset_id });
    };

})
.controller('AlbumCtrl', function($scope,$ionicLoading,$stateParams,Flickr) {
	$ionicLoading.show();
		$scope.id = $stateParams.id;
		$scope.photoList = [];

		// Getting List of Photos from a Photoset
		Flickr.getPhotos($scope.id).then(function(result){
			$ionicLoading.hide();
			console.log(result);
			$scope.photos = result.data.photoset.photo;
			$scope.title = result.data.photoset.title;

			angular.forEach($scope.photos, function(photo,key) {
				var id = photo.id;
				var secret = photo.secret;
				Flickr.getInfo(id,secret).then(function(result) {
					$scope.photoList.push({sizes: result[0].data, info: result[1].data});
					console.log($scope.photoList);
					console.log("adiy");

				});
			});

		});
})

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://htci.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])

.controller("dbController", function($scope, $cordovaSQLite) {


$scope.insert = function(id, Name, Lang, picurl) {
  console.log("reading current directory in Insert");
   console.log(db);
        var query = "INSERT INTO tblPriests (id, Name, Lang, picurl) VALUES (?,?,?,?)";
        $cordovaSQLite.execute(db, query, [id, Name, Lang, picurl]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err.message);
        });
    }

    $scope.select = function(id) {
    console.log("reading current directory in select");
     console.log(db);
        var query = "SELECT id, Name FROM tblPriests WHERE id = ?";
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).Name);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err.message);
        });
    }
            $scope.events = [];
      $scope.selectAll = function() {
              console.log("reading current directory in selectAll");
             // db = $cordovaSQLite.openDB("htci.db",2);
             // console.log(db);

              var query = "SELECT id, Name, Lang, picurl FROM tblPriests";
            console.log(query);
              $cordovaSQLite.execute(db, query, []).then(function(res) {
                  if(res.rows.length > 0) {
                                                         console.log(res.rows);
                      console.log("data found");
                      for(var i = 0; i < res.rows.length; i++) {
                          console.log("SELECTED -> " + res.rows.item(i).id + " " + res.rows.item(i).Name);
                                                         $scope.events.push(res.rows.item(i).Name);
                      }
                  } else {
                      console.log("No results found");
                  }
              }, function (err) {
                  console.error("Error: " + err.message);
              });

          }


})
.controller('contactCtrl',function($scope,memService){
        $scope.members = memService.all();
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('ListCtrl', function($scope, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({
        'name': name,
        'lang': 'English & Hindi'
        });
    }
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://htci.firebaseio.com/items/' + item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };
});
