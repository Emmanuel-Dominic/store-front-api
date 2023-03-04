import { type Request, type Response, type RequestHandler, Router } from 'express';
import { DashboardQueries } from './../services/dashboard';
import { verifyAuthToken } from './../handlers/users';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

dashboardRouter.get('/popular/', (async (req: Request, res: Response) => {
    const popular = await dashboard.fiveMostPopular();
    res.json({ data: popular });
}) as RequestHandler);

dashboardRouter.get('/completed/', verifyAuthToken, (async (req: Request, res: Response) => {
    const completed = await dashboard.completedOrders();
    res.json({ data: completed });
}) as RequestHandler);

dashboardRouter.get('/orders/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const products = await dashboard.allOrdersByUser(userId);
    res.json({ data: products });
}) as RequestHandler);

export default dashboardRouter;
