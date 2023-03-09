import { DashboardQueries } from './../../services/dashboard';

describe('Test dashboard api call functions responses', () => {
    const dashboard = new DashboardQueries();

    it('test fiveMostPopular method', async () => {
        spyOn(dashboard, 'fiveMostPopular').and.returnValue(
            Promise.resolve([
                { name: 'Mac Book', price: 1900 },
                { name: 'iPad', price: 700 },
            ])
        );
        expect(await dashboard.fiveMostPopular()).toEqual([
            { name: 'Mac Book', price: 1900 },
            { name: 'iPad', price: 700 },
        ]);
    });

    it('test allOrdersByUser method', async () => {
        const order = [
            {
                order: {
                    id: 1,
                    status: 'open',
                    product: {
                        id: 1,
                        name: 'Mac Book',
                        price: 1900,
                    },
                    user: {
                        id: 1,
                        firstname: 'Emmanuel',
                        lastname: 'Dominic',
                        email: 'ematembu2@gmail.com',
                    },
                },
            },
        ];
        spyOn(dashboard, 'allOrdersByUser').and.returnValue(Promise.resolve(order));
        expect(await dashboard.allOrdersByUser('1')).toEqual(order);
    });

    it('test completedOrders method', async () => {
        const orders = [{ name: 'iPad', price: 700, order_id: '1' }];
        spyOn(dashboard, 'completedOrders').and.returnValue(Promise.resolve(orders));
        expect(await dashboard.completedOrders()).toEqual(orders);
    });
});
