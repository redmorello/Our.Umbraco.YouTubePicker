// adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('videoResource', 
    function($q, $http, umbRequestHelper) {
        // the factory object returned
        return {
            getAll: function (apikey, channelId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=" + apikey + "&channelId=" + channelId),
                    "Failed to retrieve the list of Videos");
            },
            getAllPlaylists: function (apikey, channelId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&key=" + apikey + "&channelId=" + channelId),
                    "Failed to retrieve the list of Playlists");
            }
        };
    }
); 