import request from 'supertest';
import server from './../../server';

describe('Test dashboard api call functions responses', () => {
    const app = request(server);
    let token: string,
        orderId: string,
        userResp: any,
        productResp1: any,
        productResp2: any,
        orderResp1: any,
        orderResp2: any,
        orderProductResp1: any;

    beforeAll(async () => {
        userResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu2@gmail.com',
            password: 'Password123',
        });
        token = userResp.body.access_token;
        productResp1 = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Mac Book', price: 1900 });
        productResp2 = await app
            .post('/api/products/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iPad', price: 700 });
        orderResp1 = await app
            .post('/api/orders/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: productResp1.body.data.id,
                status: 'open',
                userId: userResp.body.user.id,
            });
        orderId = orderResp1.body.data.id;
        orderProductResp1 = await app
            .post(`/api/orders/${orderId}/products/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: productResp2.body.data.id,
                quantity: 2,
            });
        orderResp2 = await app
            .post('/api/orders/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: productResp2.body.data.id,
                status: 'closed',
                userId: userResp.body.user.id,
            });
    });

    // afterAll(async () => {
    //     await app
    //         .delete(`/api/products/${String(productResp1.body.data.id)}/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${token}`);
    //     await app
    //         .delete(`/api/orders/${String(orderResp1.body.data.id)}/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${token}`);
    //     await app
    //         .delete(`/api/orders/${String(orderResp2.body.data.id)}/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${token}`);
    //     await app.delete(`/api/users/${String(userResp.body.user.id)}/`).set('Content-Type', 'application/json');
    // });

    it('gets the top 5 most popular products', async () => {
        const resp = await app.get('/api/dashboard/popular/').set('Content-Type', 'application/json');
        expect(resp.status).toBe(200);
        expect(['Dell Laptop', 'iPad']).toContain(resp.body.data[0].name);
        expect([1900, 700]).toContain(resp.body.data[0].price);
        expect(resp.body.data[0].quantity).toEqual(2);
    });

    it('gets the current orders by user', async () => {
        const resp = await app
            .get(`/api/dashboard/orders/${String(userResp.body.user.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(resp.status).toBe(200);
        expect(['Dell Laptop', 'iPad']).toContain(resp.body.data[0].order.product.name);
        expect(resp.body.data[0].order.user.firstname).toEqual('Emmanuel');
        expect(resp.body.data[0].order.status).toEqual('open');
    });

    it('gets the completed orders by user', async () => {
        await app
            .patch(`/api/orders/${String(orderResp2.body.data.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'closed',
            });
        const resp = await app
            .get('/api/dashboard/completed/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(resp.status).toBe(200);
    });
});
