import { UserStore } from './../../models/user';

describe('User Model', () => {
    const store = new UserStore();
    const person = {
        id: 1,
        firstname: 'Emmanuel',
        lastname: 'Dominic',
        email: 'ematembu3@gmail.com',
    };
    const someOne = {
        firstname: 'Emmanuel',
        lastname: 'Dominic',
        email: 'ematembu3@gmail.com',
        password: 'Password123',
    };

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

    it('gets all users endpoint', async () => {
        spyOn(store, 'index').and.resolveTo([person]);
        expect(await store.index()).toEqual([person]);
    });

    it('register users endpoint', async () => {
        spyOn(store, 'create').and.resolveTo(someOne);
        expect(await store.create(someOne)).toEqual(someOne);
    });

    it('gets a single user endpoint', async () => {
        spyOn(store, 'show').and.resolveTo(someOne);
        expect(await store.show('1')).toEqual(someOne);
    });

    it('login user endpoint', async () => {
        spyOn(store, 'authenticate').and.resolveTo(someOne);
        expect(await store.authenticate('ematembu6@gmail.com', 'Password123')).toEqual(someOne);
    });

    it('delets user endpoint', async () => {
        spyOn(store, 'delete').and.resolveTo('User 1 is succefully deleted!');
        expect(await store.delete('1')).toEqual('User 1 is succefully deleted!');
    });

    it('updates endpoint', async () => {
        const updatedUser = {
            firstname: 'Matembu',
            lastname: 'Micheal',
            email: 'ematembu3@gmail.com',
            password: 'Password123',
        };
        spyOn(store, 'edit').and.resolveTo(updatedUser);
        expect(await store.edit('1', 'Matembu', 'Micheal', 'password123')).toEqual(updatedUser);
    });
});
