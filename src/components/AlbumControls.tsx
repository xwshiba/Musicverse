import { ServerAlbumInfo } from '@/types';


interface AlbumControlsProps {
    albumId: string;
    onDeleteAlbum: (albumId: string) => void;
    onSaveAlbum: (albumInfo: ServerAlbumInfo) => void;
    albumInfo: ServerAlbumInfo;
};

function AlbumControls({
    albumId,
    onDeleteAlbum,
    onSaveAlbum,
    albumInfo,
} : AlbumControlsProps) {

    return (
        <div className="album__control">
            {albumId ? (
                <button
                    className="album__control-btn btn"
                    onClick={() => onDeleteAlbum(albumId)}>
                    Unsave The Album
                </button>) :
                (<button
                    className="album__control-btn btn"
                    onClick={() => onSaveAlbum(albumInfo)}>
                    Save The Album
                </button>)}
        </div>
    )
};

export default AlbumControls;
