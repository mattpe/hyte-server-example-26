/**
 * Mock data and endpoints for users resource
 */

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

//TODO: add users endpoints

const getUsers = (req, response) => {
  // ÄLÄ IKINÄ lähetä salasanoja HTTP-vastauksessa
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
    // kaikki emailit sensuroitu esimerkki
    // users[i].email = 'sensored';
  }
  response.json(users);
};

// TODO: getUserById
// TODO: putUserById
// TODO: deleteUserById

// Käyttäjän lisäys (rekisteröityminen)
const postUser = (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
  users.push({id: newId, ...newUser});
  delete newUser.password;
  console.log('users', users);
  vastaus.status(201).json({message: 'new user added', user_id: newId});
};

const postLogin = (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const userFound = users.find(user => username === user.username);
  if (userFound) {
    if (userFound.password === password) {
      delete userFound.password;
      return res.json({message: 'login ok', user: userFound});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {getUsers, postUser, postLogin};
