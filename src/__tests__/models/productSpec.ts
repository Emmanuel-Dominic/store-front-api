import { ProductStore, Product } from "./../../models/product";


const store = new ProductStore()

describe("Product Model", () => {
  beforeAll(() => {
    const newProduct: Product = {
      name: 'Macbook',
      price: '2000'
    } 
    store.create(newProduct);
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

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const newProduct: Product = {
      name: 'iPad',
      price: '700'
    }
    const result = await store.create(newProduct);
    expect(result.name).toEqual("iPad")
    expect(String(result.price)).toEqual("700")
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    const product = {"name": "Macbook", "price": 2000}
    expect(result).toContain(jasmine.objectContaining(product));
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    // expect(typeof result.name).toBe("string");
    expect(result).toBeTruthy();
  });

  it('delete method should remove the product', async () => {
    store.create({
      name: 'iPhone',
      price: '400'
    });
    store.delete("3");
    const result = await store.index()
    const product = {"name": "Macbook", "price": 2000}
    expect(result).toContain(jasmine.objectContaining(product));
  });
});
