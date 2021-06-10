USE streaming;

CREATE TABLE Usuario
(
    id varchar(200) PRIMARY KEY,
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
    autor varchar(200) REFERENCES Usuario (id),
);

CREATE TABLE Artista
(
    id varchar(200) PRIMARY KEY,
    nome varchar(100),
    qtd_seguidores integer,
    ouvintesMensais integer,
    imagem varchar(200),
    genero varchar(20)
);

CREATE TABLE Musica
(
    idMusica varchar(200) PRIMARY KEY,
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
    idEpPodcast varchar(200) PRIMARY KEY,
    nome varchar(100),
    dataPublicacao date,
    descricao varchar(200),
    url varchar(200),
    duracao integer,
);

CREATE TABLE PodcastPossui
(
    nomePodcast varchar(100) PRIMARY KEY REFERENCES Podcast (nome),
    idEpPodcast varchar(200) REFERENCES EpisodioPodcast (idEpPodcast)
);

CREATE TABLE PossuiPlaylist
(
    nomePlaylist varchar(100) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica varchar(200) REFERENCES Musica (idMusica),
    idArtista varchar(200) REFERENCES Artista (id)
);

CREATE TABLE ArtistaCompoe
(
    idArtista varchar(200) PRIMARY KEY REFERENCES Artista (id),
    nomeAlbum varchar(100) REFERENCES Album (nome)
);

CREATE TABLE PertenceAlbum
(
    nomeAlbum varchar(100) PRIMARY KEY REFERENCES Album (nome),
    idMusica varchar(200) REFERENCES Musica (idMusica)
);

CREATE TABLE UsuarioSegue
(
    idUsuarioSeguidor varchar(200) PRIMARY KEY REFERENCES Usuario (id),
    idUsuarioSeguindo varchar(200) REFERENCES Usuario (id),
    idArtista varchar(200) REFERENCES Artista (id)
);

CREATE TABLE ArtistaPerforma
(
    idArtista varchar(200) PRIMARY KEY REFERENCES Artista (id),
    idMusica varchar(200) REFERENCES Musica (idMusica)
);

CREATE TABLE PlaylistContem
(
    nomePlaylist varchar(100) PRIMARY KEY REFERENCES Playlist (nome),
    idMusica varchar(200) REFERENCES Musica (idMusica)
);