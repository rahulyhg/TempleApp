angular.module('flickrApp.services', [])
.value('Flickr_data',{
  key: '5354a2ab2c8fc9202dcf5a30276cfbad',
  endpoint: 'https://api.flickr.com/services/rest/',
  user_id : '71032065@N03'
})

.factory('Flickr', function($http,$q,Flickr_data){
	var result = {};

	// Getting List of Photoset in a user account.
	result.getPhotoSets = function() {
		var url = Flickr_data.endpoint + 
				  '?method=flickr.photosets.getList&api_key=' + Flickr_data.key +
				  '&user_id=' + Flickr_data.user_id +
				  '&format=json&nojsoncallback=1';

		console.log(url);
		console.log($http.get(url));
		return $http.get(url);
	};


	// Getting Photos of a photo set
	result.getPhotos = function(photoset_id) {
		var defer = $q.defer();

		var url = Flickr_data.endpoint + 
				  '?method=flickr.photosets.getPhotos&api_key=' + Flickr_data.key +
				  '&user_id=' + Flickr_data.user_id +
				  '&photoset_id=' + photoset_id +
				  '&format=json&nojsoncallback=1';

		
		// Getting the Photos from a photoset
		return $http.get(url)
	};

	result.getInfo = function(id, secret) {
		sizes =  Flickr_data.endpoint +
						   '?method=flickr.photos.getSizes&api_key=' + Flickr_data.key +
						   '&photo_id=' + id + '&format=json&nojsoncallback=1';

		info = Flickr_data.endpoint + 
						   '?method=flickr.photos.getInfo&api_key=' + Flickr_data.key +
						   '&photo_id=' + id + '&secret=' + secret +
						   '&format=json&nojsoncallback=1';
		return $q.all([
			$http.get(sizes),
			$http.get(info)
		]);	
	};

	return result;
})