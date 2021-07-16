const Model = {
    namespace: 'global',
    state: {
        user: null,
        token: null,
        playlists: null,
        playing: false,
        item: null,
        userplaylist: null,
        recentlyPlayed: null,
        newReleases: null,
        topList: null,
        workout: null,
        mood: null,
        party: null,
        playlistid: null,
        recommended: null,
        detailAlbum: null,
        detailAlbumTracks: null,
        category: null,
        categoryDetail: null,
        searchResult: null,
        artistDetail: null,
        playinglist: null,
        audioStatus: null,
        footeraudioState: {
            name: null,
            image: null,
            url: null,
            artistsName: null,
            albumName: null,
            audiolist: null,
        },
    },
    effects: {
        * ready({type, payload}, {put, call, select}) {
            const limit = 16;
            const {spotify} = payload;
            const user = yield call(spotify.getMe());
            const playlists = yield call(spotify.getUserPlaylists());
            const recentlyPlayed = yield call(spotify.getMyRecentlyPlayedTracks({limit}));
            const newReleases = yield call(spotify.getNewReleases({limit}));
            const topList = yield call(spotify.getCategoryPlaylists("toplists", {limit}));
            const workout = yield call(spotify.getCategoryPlaylists("workout", {limit}));
            const mood = yield call(spotify.getCategoryPlaylists("mood", {limit}));
            const party = yield call(spotify.getCategoryPlaylists("party", {limit}));
            const category = yield call(spotify.getCategories());

            yield put({type: 'save', payload: {user}});
            yield put({type: 'save', payload: {playlists}});
            yield put({type: 'save', payload: {recentlyPlayed: recentlyPlayed.items}});
            yield put({type: 'save', payload: {newReleases: newReleases.albums.items}});
            yield put({type: 'save', payload: {topList: topList.playlists.items}});
            yield put({type: 'save', payload: {workout: workout.playlists.items}});
            yield put({type: 'save', payload: {mood: mood.playlists.items}});
            yield put({type: 'save', payload: {party: party.playlists.items}});
            yield put({type: 'save', payload: {category}});
        }
    },
    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        }
    },
    subscriptions: {},
};

export default Model;
