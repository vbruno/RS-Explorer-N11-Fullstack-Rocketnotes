const UserCreateService = require("./UserCreateService");

it("user should be create", () => {
  const user = {
    name: "John Doe",
    email: "user@teste.com.",
    password: '123456'
  }

  

  const userCreateService = new UserCreateService();

  const userCreated = userCreateService.execute(user);

  expect(userCreated).toHaveProperty("id");
});
