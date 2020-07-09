# Our.Umbraco.YouTubePicker

*Don't forget to do a NuGet restore.*

You can login to the website and test the YouTube Picker. Here are the login details:

<strong>username:</strong> admin@admin.com<br/>
<strong>password:</strong> 1234567890

Usage:
1) Add the package via nuget: https://www.nuget.org/packages/Our.Umbraco.YouTubePicker/
2) Create a new Datatype in the Developer section of Umbraco
3) Add your:
  * Google API key
  * The ID of the YouTube Channel you want to list the videos & playlists from
  * The number of results per page (YouTube maximum is 50).
4) Add a new field to your page, and use the YouTube Picker datatype.

*When creating the nuget package, use the following command*
nuget pack Our.Umbraco.YouTubePicker.csproj -Exclude bin/**/*.*

Setup:
1) Login to your Google account and go to: https://console.developers.google.com/apis/api/youtube.googleapis.com/overview OR in the "Search for APIs and Services" box, search for 'YouTube Data API v3'
2) Click the button to "Enable" the API.
3) Create a new API Key (https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials). If you restrict it, make sure the YouTube API is allowed.
4) To find your Channel ID, go to https://www.youtube.com/account_advanced, where it is listed. 

## Resources ##

*YouTube API Explorer*

https://developers.google.com/apis-explorer/#p/youtube/v3/
