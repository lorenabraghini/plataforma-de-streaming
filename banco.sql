CREATE DATABASE streaming;
USE streaming;

CREATE TABLE Playlist
(
    nome varchar(200) PRIMARY KEY,
    descricao varchar(200),
    autor integer REFERENCES Usuario (id),
    quantidade_de_seguidores integer,
    data_de_criacao date
);

CREATE TABLE Artista
(
    id integer PRIMARY KEY,
    nome varchar(200),
    descricao varchar(200),
    ouvintesMensais integer,
    imagem varchar(200),
    genero varchar(200)
);

CREATE TABLE Musica
(
    idMusica integer PRIMARY KEY,
    nome varchar(200),
    dataPublicacao date,
    fonte varchar(200),
    duracao integer,
    numReproducoes integer,
    genero varchar(200)
);

CREATE TABLE Album
(
    nome varchar(200) PRIMARY KEY,
    dataPublicacao date,
    qtdMusicas integer,
    genero varchar(200),
    imagem varchar(200)
);

CREATE TABLE Usuario
(
    id integer PRIMARY KEY,
    login varchar(200),
    nome varchar(200),
    imagem varchar(200),
    qtdSeguidores integer,
    qtdSeguindo integer
);

CREATE TABLE Podcast
(
    nome varchar(200) PRIMARY KEY,
    descricao varchar(200),
    genero varchar(200),
    imagem varchar(200),
    qtdSeguidores integer,
    qtdEpisodios integer
);

CREATE TABLE EpisodioPodcast
(
    idEpPodcast integer PRIMARY KEY,
    nome varchar(200),
    descricao varchar(200),
    fonte varchar(200),
    duracao integer,
    numReproducoes integer,
    genero varchar(200),
    imagem varchar(200)
);

CREATE TABLE PodcastPossui
(
    nomePodcast varchar(200) PRIMARY KEY REFERENCES Podcast (nome),
    idEpPodcast integer REFERENCES EpisodioPodcast (idEpPodcast)
);

CREATE TABLE PossuiPlaylist
(
    nomePlaylist varchar(200) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica integer REFERENCES Musica (idMusica),
    idArtista integer REFERENCES Artista (idArtista)
);

CREATE TABLE ArtistaCompoe
(
    idArtista integer PRIMARY KEY REFERENCES Artista (idArtista),
    nomeAlbum varchar(200) REFERENCES Album (nome)
);

CREATE TABLE PertenceAlbum
(
    nomeAlbum varchar(200) PRIMARY KEY REFERENCES Album (nome),
    idMusica integer REFERENCES Musica (idMusica)
);

CREATE TABLE UsuarioSegue
(
    idUsuarioSeguidor integer PRIMARY KEY REFERENCES Usuario (id),
    idUsuarioSeguindo integer REFERENCES Usuario (id),
    idArtista integer REFERENCES Artista (idArtista)
);

CREATE TABLE ArtistaPerforma
(
    idArtista integer PRIMARY KEY REFERENCES Artista (idArtista),
    idMusica integer REFERENCES Musica (idMusica)
);

CREATE TABLE PlaylistContem
(
    nomePlaylist varchar(200) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica integer REFERENCES Musica (idMusica)
);