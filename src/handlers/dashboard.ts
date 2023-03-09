import { type Request, type Response, type RequestHandler, Router } from 'express';
import { DashboardQueries } from './../services/dashboard';
import { verifyAuthToken } from './../handlers/users';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

dashboardRouter.get('/popular/', (async (req: Request, res: Response) => {
    try {
        const popular = await dashboard.fiveMostPopular();
        res.status(200);
        res.json({ data: popular });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

dashboardRouter.get('/completed/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const completed = await dashboard.completedOrders();
        res.status(200);
        res.json({ data: completed });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

dashboardRouter.get('/orders/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const products = await dashboard.allOrdersByUser(userId);
        res.status(200);
        res.json({ data: products });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

export default dashboardRouter;
