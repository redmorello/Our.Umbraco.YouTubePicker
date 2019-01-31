// adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('videoResource', 
    function($q, $http, umbRequestHelper) {
        // the factory object returned
        return {
            search: function (apiKey, channelId, type, perPage, pageToken, q) {
                var key = "&key=" + apiKey;
                var channel = channelId !== null && channelId !== "" ? "&channelId=" + channelId : "";
                var searchType = "&type=" + type;
                var results = "&maxResults=" + perPage;
                var nextPage = pageToken !== null ? "&pageToken=" + pageToken : "";
                var query = q !== null && q !== "" ? "&q=" + encodeURI(q) : "";
                
                return umbRequestHelper.resourcePromise(
                    $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet" + key + channel + searchType + results + nextPage + query),
                    "Failed to retrieve the list of Videos");
            }
        };
    }
); 