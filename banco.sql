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
    -- qtd_musicas INTEGER,
    -- visibilidade VARCHAR(20),
    imagem varchar(200)
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
    genero varchar(20),
    nomeArtista varchar(100),
    nomeAlbum varchar (100)
);

CREATE TABLE Album
(
    nome varchar(100) PRIMARY KEY,
    dataPublicacao date,
    qtdMusicas integer,
    genero varchar(20),
    imagem varchar(200),
    nomeArtista varchar(100),
);


CREATE TABLE Podcast
(
    nome varchar(100) PRIMARY KEY,
    descricao varchar(MAX),
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
    descricao varchar(MAX),
    url varchar(200),
    duracao integer,
    nomePodcast varchar (100)
);

CREATE TABLE Playlist_Musica
  (
	nomePlaylist varchar(100)  References Playlist (nome),
	nomeMusica varchar(200) References [dbo].[Musica] (idMusica),
  );

create table #temp(
autor varchar(100),
nomePlaylist varchar(100),
nomeMusica varchar (100)
)