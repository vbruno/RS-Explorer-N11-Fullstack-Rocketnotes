const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

const AppError = require("../utils/AppError");


describe('UserCreateService', () => {
  it("user should be create", async () => {
    const user = {
      name: "John Doe",
      email: "user@teste.com.",
      password: '123456'
    }

    const userRepositoryInMemory = new UserRepositoryInMemory();

    const userCreateService = new UserCreateService(userRepositoryInMemory);

    const userCreated = await userCreateService.execute(user);

    console.log(userCreated)

    expect(userCreated).toHaveProperty("id");
  });

  it("user not should br create with exists email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@email.com",
      password: '123456'
    }

    const user2 = {
      name: "User Test 2",
      email: "user@email.com",
      password: '123456'
    }

    const userRepositoryInMemory = new UserRepositoryInMemory();

    const userCreateService = new UserCreateService(userRepositoryInMemory);

    await userCreateService.execute(user1);

    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError("Este e-mail já está sendo utilizado."))
  }
  );
})

