const port = 3000;

const express = require('express');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
app.use(cors());

// Initializing Database
let db;

(async () => {
  try {
    db = await open({
      filename: './BD_4/Gaming_Community/database.sqlite',
      driver: sqlite3.Database,
    });
    console.log('Database Connected Successfully!');
  } catch (error) {
    console.log('Failed to Connect Database: ' + error);
  }
})();

// ---------------------------------------------------------- //
//       Project on BD 4: Gaming Community Platform           //
// ---------------------------------------------------------- //

// --------------- Welcome Page --------------- //

app.get('/', (req, res) => {
  res.send('Welcome to Gaming Community Platform!');
});

// Endpoint - 1 (Get All Games)

async function fetchAllGames() {
  let query = 'SELECT * FROM games;';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let result = await fetchAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'No Games Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /games

// Endpoint - 2 (Get Game by ID)

async function fetchGameByID(gameId) {
  let query = 'SELECT * FROM games WHERE id = ?;';
  let response = await db.get(query, [gameId]); // db.get // When you have to request a Single Row
  return { game: response };
}

app.get('/games/details/:id', async (req, res) => {
  let gameId = parseInt(req.params.id);
  try {
    if (isNaN(gameId)) {
      return res.status(400).json({ message: 'Invalid Game ID' });
    }

    let result = await fetchGameByID(gameId);
    if (!result.game) {
      return res.status(404).json({ message: 'No Game Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /games/details/1

// Endpoint - 3 (Get Games by Genre)

async function fetchGameByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?;';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let result = await fetchGameByGenre(genre);
    if (result.games.length === 0) {
      // Here we can't use (!result.games)   // db.all return an
      return res.status(404).json({ message: 'No Game Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /games/genre/FPS

// Endpoint - 4 (Get Games by Platform)

async function fetchGameByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?;';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await fetchGameByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'No Game Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /games/platform/PC

// Endpoint - 5 (Get Games Sorted by Rating)

async function fetchSortedGameByRating() {
  let query = 'SELECT * FROM games ORDER BY rating ASC;';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchSortedGameByRating();
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'No Game Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /games/sort-by-rating

// Endpoint - 6 (Get All Players)

async function fetchAllPlayers() {
  let query = 'SELECT * FROM players;';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let result = await fetchAllPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'No Players Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /players

// Endpoint - 7 (Get Player by ID)

async function fetchPlayerByID(playerId) {
  let query = 'SELECT * FROM players WHERE id = ?;';
  let response = await db.get(query, [playerId]);
  return { player: response };
}

app.get('/players/details/:playerId', async (req, res) => {
  let playerId = parseInt(req.params.playerId);
  if (isNaN(playerId)) {
    return res.status(400).json({ message: 'Invalid Player ID' });
  }
  try {
    let result = await fetchPlayerByID(playerId);
    if (!result.player) {
      return res.status(404).json({ message: 'No Player Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /players/details/1

// Endpoint - 8 (Get Players by Platform)

async function fetchPlayerByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?;';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await fetchPlayerByPlatform(platform);
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'No Player Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Path = /players/platform/PC

// Endpoint - 9 (Get Players Sorted by Rating)

async function fetchSortedPlayerByRating() {
  let query = 'SELECT * FROM players ORDER BY rating ASC;';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchSortedPlayerByRating();
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'No Player Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /players/sort-by-rating

// Endpoint - 10 (Get All Tournaments)

async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments;';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let result = await fetchAllTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournament Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /tournaments

// Endpoint - 11 (Get Tournament by ID)

async function fetchTournamentByID(tournamentId) {
  let query = 'SELECT * FROM tournaments WHERE id = ?;';
  let response = await db.get(query, [tournamentId]);
  return { tournament: response };
}

app.get('/tournaments/details/:tournamentId', async (req, res) => {
  let tournamentId = parseInt(req.params.tournamentId);
  if (isNaN(tournamentId)) {
    return res.status(400).json({ message: 'Invalid Tournament ID' });
  }
  try {
    let result = await fetchTournamentByID(tournamentId);
    if (!result.tournament) {
      return res.status(404).json({ message: 'No Tournament Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /tournaments/details/1

// Endpoint - 12 (Get Tournaments by Game ID)

async function fetchTournamentByGameID(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?;';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = parseInt(req.params.gameId);
  if (isNaN(gameId)) {
    return res.status(400).json({ message: 'Invalid Game ID' });
  }
  try {
    let result = await fetchTournamentByGameID(gameId);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournament Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /tournaments/game/1

// Endpoint - 13 (Get Tournaments Sorted by Prize Pool)

async function fetchTournamentSortedByPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool ASC;';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await fetchTournamentSortedByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournament Found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Path = /tournaments/sort-by-prize-pool

// ----------------- LISTENING ----------------- //
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
