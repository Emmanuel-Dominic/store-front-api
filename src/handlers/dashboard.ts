import { type Request, type Response, type RequestHandler, Router } from 'express';
import { DashboardQueries } from './../services/dashboard';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

dashboardRouter.get('/popular', (async (req: Request, res: Response) => {
    const popular = await dashboard.fiveMostPopular();
    res.json({"data": popular});
}) as RequestHandler);

dashboardRouter.get('/completed', (async (req: Request, res: Response) => {
    const completed = await dashboard.completedOrders();
    res.json({"data": completed});
}) as RequestHandler);

dashboardRouter.get('/orders', (async (req: Request, res: Response) => {
    const products = await dashboard.allOrders();
    res.json({"data": products});
}) as RequestHandler);

export default dashboardRouter;
