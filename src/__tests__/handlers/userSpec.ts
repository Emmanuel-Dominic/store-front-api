import request from 'supertest';
import server from './../../server';

describe('Test user api call functions responses', () => {
    const app = request(server);
    let token: string, userResp: any;
    beforeAll(async () => {
        userResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu@gmail.com',
            password: 'Password123',
        });
        token = userResp.body.access_token;
    });

    it('gets all users endpoint', async () => {
        const userRes = await app
            .get('/api/users/')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(userRes.body.data).toContain(
            jasmine.objectContaining({
                id: userResp.body.user.id,
                firstname: 'Emmanuel',
                lastname: 'Dominic',
                email: 'ematembu@gmail.com',
            })
        );
    });

    it('register users endpoint', async () => {
        const userRes = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu6@gmail.com',
            password: 'Password123',
        });
        expect(userRes.body.user).toEqual({
            id: userRes.body.user.id,
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu6@gmail.com',
        });
    });

    it('gets a single user endpoint', async () => {
        const userRes = await app
            .get(`/api/users/${String(userResp.body.user.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(userRes.body.data).toEqual({
            id: userResp.body.user.id,
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu@gmail.com',
        });
    });

    it('login user endpoint', async () => {
        const userRes = await app.post('/api/login/').set('Content-Type', 'application/json').send({
            email: 'ematembu@gmail.com',
            password: 'Password123',
        });
        expect(userRes.body.user.email).toEqual('ematembu@gmail.com');
        expect(userRes.body.user.lastname).toEqual('Dominic');
        expect(userRes.body.user.firstname).toEqual('Emmanuel');
    });

    it('delets user endpoint', async () => {
        const newUserResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu5@gmail.com',
            password: 'Password123',
        });
        const userRes = await app
            .delete(`/api/users/${String(newUserResp.body.user.id)}/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(userRes.body.message).toEqual(`User ${String(newUserResp.body.user.id)} is successfully deleted!`);
    });

    it('updates users endpoint', async () => {
        const newUserResp = await app.post('/api/register/').set('Content-Type', 'application/json').send({
            firstname: 'Emmanuel',
            lastname: 'Dominic',
            email: 'ematembu7@gmail.com',
            password: 'Password123',
        });
        const userRes = await app
            .patch(`/api/users/${String(newUserResp.body.user.id)}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${String(newUserResp.body.access_token)}`)
            .send({
                firstname: 'Matembu',
                lastname: 'Micheal',
                password: 'Password123',
            });
        expect(userRes.body.message).toEqual('user data successfuly updated!');
        expect(userRes.body.data.firstname).toEqual('Matembu');
        expect(userRes.body.data.lastname).toEqual('Micheal');
    });
});
