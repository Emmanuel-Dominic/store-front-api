import { OrderStore } from './../../models/order';

describe('Order Model', () => {
    const store = new OrderStore();
    const order = { id: '1', status: 'open', userId: '1' };

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

    it('gets all orders endpoint', async () => {
        spyOn(store, 'index').and.resolveTo([order]);
        expect(await store.index('1')).toEqual([order]);
    });

    it('posts orders endpoint', async () => {
        spyOn(store, 'create').and.resolveTo(order);
        expect(await store.create('1')).toEqual(order);
    });

    it('posts products to an order endpoint', async () => {
        spyOn(store, 'addProduct').and.resolveTo(order);
        expect(await store.addProduct(3, '1', '1')).toEqual(order);
    });

    it('gets a single order endpoint', async () => {
        spyOn(store, 'show').and.resolveTo(order);
        expect(await store.show('1')).toEqual(order);
    });

    it('updates a single order endpoint', async () => {
        spyOn(store, 'edit').and.resolveTo(order);
        expect(await store.edit('1', 'open')).toEqual(order);
    });
});
