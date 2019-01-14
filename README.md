# Our.Umbraco.YoutubePicker

*Don't forget to do a NuGet restore.*

You can login to the website and test the Youtube Picker. Here are the login details:

<strong>username:</strong> admin@admin.com<br/>
<strong>password:</strong> 1234567890

Usage:
1) Add the package via nuget: https://www.nuget.org/packages/Our.Umbraco.YoutubePicker/
2) Create a new Datatype in the Developer section of Umbraco
3) Add your Google API key, and the ID of the Youtube Channel you want to list the videos & playlists from.
4) Add a new field to your page, and use the Youtube Picker datatype.

*When creating the nuget package, use the following command*
nuget pack Our.Umbraco.YoutubePicker.csproj -Exclude bin/**/*.*
