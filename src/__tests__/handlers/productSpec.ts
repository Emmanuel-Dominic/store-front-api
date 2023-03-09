import request from 'supertest';
import server from './../../server';

describe('Test product api call functions responses', () => {
    const app = request(server);
    let token: string, productId: string, userResp: any, productResp1: any;
    beforeAll(async () => {
        userResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu3@gmail.com',
            password: 'Password123',
        });
        token = userResp.body.access_token;
        productResp1 = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Lenovo Laptop', price: 1200 });
        productId = productResp1.body.data.id;
    });

    // afterAll(async () => {
    //     token = userResp.body.user.access_token;
    //     await app
    //         .delete(`/api/products/${String(productId)}/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${token}`);
    //     await app.delete(`/api/users/${String(userResp.body.user.id)}/`).set('Content-Type', 'application/json');
    // });

    it('gets all products endpoint', async () => {
        const productResp = await app
            .get('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(productResp.body.data).toContain(jasmine.objectContaining({ name: 'Lenovo Laptop', price: 1200 }));
    });

    it('posts products endpoint', async () => {
        const productResp = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Chromebook', price: 1900 });
        expect(productResp.body.data.name).toEqual('Chromebook');
    });

    it('gets a single product endpoint', async () => {
        const newProductResp = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Tab', price: 800 });
        const productResp = await app
            .get(`/api/products/${String(newProductResp.body.data.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(productResp.body.data.name).toEqual('Tab');
    });

    it('updates a single product endpoint', async () => {
        const newProductResp = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Phone', price: 900 });
        const productResp = await app
            .patch(`/api/products/${String(newProductResp.body.data.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Phone', price: 700 });
        expect(productResp.body.data.data.price).toEqual(700);
    });
});
