import request from 'supertest';
import server from './../../server';

describe('Test order api call functions responses', () => {
    const app = request(server);
    let token: string, orderId: string, userResp: any, productResp1: any, orderResp2: any;

    beforeAll(async () => {
        userResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu1@gmail.com',
            password: 'Password123',
        });
        token = userResp.body.access_token;
        productResp1 = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Dell Laptop', price: 1900 });
        orderResp2 = await app
            .post('/api/orders/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: productResp1.body.data.id,
                status: 'open',
                userId: userResp.body.user.id,
            });
        orderId = orderResp2.body.data.id;
    });

    // afterAll(async () => {
    //     token = userResp.body.user.access_token;
    //     await app
    //         .delete(`/api/products/${String(productResp1.body.data.id)}/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${token}`);
    //     await app.delete(`/api/users/${String(userResp.body.user.id)}/`).set('Content-Type', 'application/json');
    // });

    it('gets all orders endpoint', async () => {
        const orderResp = await app
            .get('/api/orders/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(['open', 'closed']).toContain(orderResp.body.data[0].status);
    });

    it('posts orders endpoint', async () => {
        const orderResp = await app
            .post('/api/orders/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: productResp1.body.data.id,
                status: 'open',
                userId: userResp.body.user.id,
            });
        expect(orderResp.body.data.status).toEqual('open');
    });

    it('posts products to an order endpoint', async () => {
        const orderProductResp = await app
            .post(`/api/orders/${orderId}/products/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: productResp1.body.data.id,
                quantity: 2,
            });
        expect(orderProductResp.body.data.quantity).toEqual(2);
    });

    it('gets a single order endpoint', async () => {
        const orderResp = await app
            .get(`/api/orders/${orderId}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(orderResp.body.data.status).toEqual('open');
    });

    it('updates a single order endpoint', async () => {
        const orderResp = await app
            .patch(`/api/orders/${orderId}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'open',
            });
        expect(orderResp.body.data.data.status).toEqual('open');
    });
});
