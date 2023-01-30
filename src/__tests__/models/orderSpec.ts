import { OrderStore } from "./../../models/order";
import { UserStore, User } from "./../../models/user";

const store = new OrderStore();
const user_store = new UserStore();

describe("Order Model", () => {
  beforeAll(async () => {
    const newUser: User = {
        firstname: 'Dominic',
        lastname: 'Micheal',
        email: 'ematembu1@gmail.com',
        password: 'Password123'
    }
    const new_user = await user_store.create(newUser);
    store.create(String(new_user.id));
  })

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.edit).toBeDefined();
  });

  it('should have a addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('create method should add a order', async () => {
    const newUser: User = {
        firstname: 'Don',
        lastname: 'Matembu',
        email: 'ematembu5@gmail.com',
        password: 'Password123'
    }
    const new_user = await user_store.create(newUser);
    const result = await store.create(String(new_user.id));
    // expect(result.status).toEqual("open");
    expect(result).toBeTruthy();
  });

  it('index method should return a list of orders', async () => {
    const newUser: User = {
      firstname: 'Don',
      lastname: 'Matembu',
      email: 'ematembu7@gmail.com',
      password: 'Password123'
    }
    const new_user = await user_store.create(newUser);
    const result = await store.index(String(new_user.id));
    // expect(typeof result[0]).toBe("object")
    expect(result).toBeTruthy();
  });

  it('show method should return the correct order', async () => {
    const result = await store.show("1");
    expect(result.status).toEqual("open")
  });
});
