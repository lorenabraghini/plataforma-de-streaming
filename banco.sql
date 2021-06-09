USE streaming;

CREATE TABLE Usuario
(
    id integer PRIMARY KEY,
    login varchar(200),
    nome varchar(100),
    imagem varchar(200),
    qtdSeguidores integer,
    qtdSeguindo integer
);

CREATE TABLE Playlist
(
    nome varchar(100) PRIMARY KEY,
    descricao varchar(200),
    autor integer REFERENCES Usuario (id),
);

CREATE TABLE Artista
(
    id integer PRIMARY KEY,
    nome varchar(100),
    qtd_seguidores integer,
    ouvintesMensais integer,
    imagem varchar(200),
    genero varchar(20)
);

CREATE TABLE Musica
(
    idMusica integer PRIMARY KEY,
    nome varchar(100),
    url varchar(200),
    duracao integer,
    popularidade integer,
    genero varchar(20)
);

CREATE TABLE Album
(
    nome varchar(100) PRIMARY KEY,
    dataPublicacao date,
    qtdMusicas integer,
    genero varchar(20),
    imagem varchar(200)
);


CREATE TABLE Podcast
(
    nome varchar(100) PRIMARY KEY,
    descricao varchar(200),
    genero varchar(20),
    imagem varchar(200),
    idioma varchar(50),
    qtdEpisodios integer
);

CREATE TABLE EpisodioPodcast
(
    idEpPodcast integer PRIMARY KEY,
    nome varchar(100),
    dataPublicacao date,
    descricao varchar(200),
    url varchar(200),
    duracao integer,
);

CREATE TABLE PodcastPossui
(
    nomePodcast varchar(100) PRIMARY KEY REFERENCES Podcast (nome),
    idEpPodcast integer REFERENCES EpisodioPodcast (idEpPodcast)
);

CREATE TABLE PossuiPlaylist
(
    nomePlaylist varchar(100) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica integer REFERENCES Musica (idMusica),
    idArtista integer REFERENCES Artista (id)
);

CREATE TABLE ArtistaCompoe
(
    idArtista integer PRIMARY KEY REFERENCES Artista (id),
    nomeAlbum varchar(100) REFERENCES Album (nome)
);

CREATE TABLE PertenceAlbum
(
    nomeAlbum varchar(100) PRIMARY KEY REFERENCES Album (nome),
    idMusica integer REFERENCES Musica (idMusica)
);

CREATE TABLE UsuarioSegue
(
    idUsuarioSeguidor integer PRIMARY KEY REFERENCES Usuario (id),
    idUsuarioSeguindo integer REFERENCES Usuario (id),
    idArtista integer REFERENCES Artista (id)
);

CREATE TABLE ArtistaPerforma
(
    idArtista integer PRIMARY KEY REFERENCES Artista (id),
    idMusica integer REFERENCES Musica (idMusica)
);

CREATE TABLE PlaylistContem
(
    nomePlaylist varchar(100) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica integer REFERENCES Musica (idMusica)
);