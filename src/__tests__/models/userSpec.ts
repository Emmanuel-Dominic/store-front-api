import { UserStore, User } from "./../../models/user";


const store = new UserStore()

describe("User Model", () => {
  beforeAll(() => {
    const newUser: User = {
      firstname: 'Mbeiza',
      lastname: 'Delorence',
      email: 'mbeizadolorence81@gmail.com',
      password: 'Password123'
    } 
    store.create(newUser);
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

  it('should have a edit method', () => {
    expect(store.edit).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const newUser: User = {
      firstname: 'Manuel',
      lastname: 'Dominic',
      email: 'ematembu2@gmail.com',
      password: 'Password123'
    }
    const result = await store.create(newUser);
    expect(result.firstname).toEqual("Manuel");
    expect(result.lastname).toEqual("Dominic");
    expect(result.email).toEqual("ematembu2@gmail.com");
  });

  it('index method should return a list of users', async () => {
    const user = {"firstname": "Mbeiza", "lastname": "Delorence", "email": "mbeizadolorence81@gmail.com"}
    const result = await store.index();
    // expect(result).toContain(jasmine.objectContaining(user))
    expect(result).toBeTruthy ()
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(["Dominic", "Mbeiza"]).toContain(result.firstname);
    expect(["Micheal", "Delorence"]).toContain(result.lastname);
    expect(["mbeizadolorence81@gmail.com", "ematembu1@gmail.com", "ematembu@gmail.com", "ematembu2@gmail.com"]).toContain(result.email);
  });

  it('delete method should remove the user', async () => {
    store.create({
      firstname: 'Matembu',
      lastname: 'Emmanuel',
      email: 'ematembu@gmail.com',
      password: 'Password123'
    });
    store.delete("6");
    const user = {"firstname": "Mbeiza", "lastname": "Delorence", "email": "mbeizadolorence81@gmail.com"}
    const result = await store.index();
    expect(result).toContain(jasmine.objectContaining(user));
  });
});
