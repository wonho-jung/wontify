// filter the data from the all the playlist api and return the data that we need
export interface IState {
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  name: string | null;
  description: string | null;

  [key: string]: string | object | boolean | null;
}

export const filteredPlaylists = (data: IState[]) => {
  const filteredNullValue = data.filter((item) => {
    return item !== null;
  });
  const filteredPlaylist = filteredNullValue.map((item) => {
    return {
      playlistId: item.id,
      image: item.images[0].url,
      artistsName: item.name,
      description: item.description,
    };
  });

  return filteredPlaylist;
};
//TODO: add the type of the data that we need to return
