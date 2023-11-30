import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const { username, password, firstName, lastName } = req.params;
    console.log("create user");
    console.log(req.params);
    let user = null;
    try {
      user = await dao.createUser({
        username,
        password,
        firstName,
        lastName,
      });
    } catch (e) {
      console.log(e);
    }
    res.send(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await dao.findUserById(id);
    res.send(user);
  };
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const status = await dao.updateUser(id, user);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.send(status);
  };
  const signup = async (req, res) => {
    const { username, password } = req.body;
    const userExists = await dao.findUserByUsername(username);
    if (userExists) {
      res.sendStatus(403);
      return;
    }
    const user = await dao.createUser({ username, password });
    const currentUser = user;
    req.session["currentUser"] = currentUser;
    res.json(user);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
      return;
    } else {
      res.sendStatus(403);
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };
  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.sendStatus(403);
    }
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);

  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", deleteUser);
}
export default UserRoutes;
