# Wontify



## [Demo💥](https://master--glistening-froyo-372771.netlify.app)

## Preview
<img src="https://user-images.githubusercontent.com/62073233/113490736-18fc6280-949a-11eb-8e08-a2220442dc36.PNG"/>
<img src="https://user-images.githubusercontent.com/62073233/113491063-f3705880-949b-11eb-807c-26beb47e26b5.PNG"/>
<img width="100%" src="https://user-images.githubusercontent.com/62073233/206041426-f917bf64-e126-4173-9c70-bed46ea90dac.gif"/>

## Features

- Listen to the preview track and adjust the volume using the control
- Search for artists or songs using the search bar
- Get song recommendations based on your playlist
- Select tracks to add to your existing Spotify playlist
- Preview songs from recently played albums, new releases, top playlists, workout, mood, and other genres

## Pages

- Login
- Home
- Search
- Search detail
- Playlists


## API Verbs
- getUserPlaylists          -[v] 
- getMyRecentlyPlayedTracks -[v] 
- getNewReleases            -[v]  
- getCategoryPlaylists      -[v] 
- getCategories             -[v] 
- addTracksToPlaylist       -[v]  
- getPlaylist               -[v] 
- getRecommendations        -[v] 
- getAlbumTracks            -[v] 
- getAlbum                  -[v] 
- search                    -[v] 
- getCategoryPlaylists      -[v]




## Installation

```bash
git clone https://github.com/wonho-jung/wontify.git
```

Go to the project directory.

```bash
npm install
# or
yarn install
```


## Getting Started

```bash
npm start 
# or
yarn start
```

## Make a .env file to get your clientId and clientSecret

 ```bash
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET_KEY;
```

## Update / News
You can't let the user sign in/up to get a token to call API anymore in the Development mode.
Spotify Dashboard role is changed. The user needs to be added to the Spotify dashboard user setting to get the right token to call API. Such as getPlaylist(), getMyRecentlyPlayedTracks()..
 

