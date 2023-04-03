import fs from "fs";

export default class UserManager {
  constructor(path) {
    this.path = path;
  }

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        console.log(data);
        const users = JSON.parse(data);
        return users;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addUser = async (user) => {
    try {
      const users = await this.getUsers();

      if (users.length === 0) {
        user.id = 1;
      } else {
        user.id = users[users.length - 1].id + 1;
      }
      users.push(user);

      await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
}
