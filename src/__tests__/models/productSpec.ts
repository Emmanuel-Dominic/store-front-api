import { ProductStore } from './../../models/product';

describe('Product Model', () => {
    const store = new ProductStore();
    const product = {
        name: 'Tab samsung',
        price: '850',
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

    it('should have a update method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('gets all products endpoint', async () => {
        spyOn(store, 'index').and.resolveTo([product]);
        expect(await store.index()).toEqual([product]);
    });

    it('posts products endpoint', async () => {
        spyOn(store, 'create').and.resolveTo(product);
        expect(await store.create(product)).toEqual(product);
    });

    it('gets a single product endpoint', async () => {
        spyOn(store, 'show').and.resolveTo(product);
        expect(await store.show('1')).toEqual(product);
    });

    it('updates a single product endpoint', async () => {
        spyOn(store, 'edit').and.resolveTo(product);
        expect(await store.edit('1', 'Tablet', '750')).toEqual(product);
    });

    it('deletes a single product endpoint', async () => {
        spyOn(store, 'delete').and.resolveTo('Product 1 succefully deleted!');
        expect(await store.delete('1')).toEqual('Product 1 succefully deleted!');
    });
});
