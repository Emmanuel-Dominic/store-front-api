import { type Request, type Response, type RequestHandler, Router } from 'express';
import { OrderStore } from './../models/order';
import { ProductStore } from './../models/product';
import { verifyAuthToken } from './../handlers/users';

const orderRouter = Router();
const orderStore = new OrderStore();
const productStore = new ProductStore();

orderRouter.get('/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const orders = await orderStore.index(userId);
        res.status(200);
        res.json({ data: orders });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

orderRouter.post('/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const newOrder = await orderStore.create(String(userId));
        res.status(200);
        res.json({ data: newOrder });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

orderRouter.post('/:id/products/', verifyAuthToken, (async (req: Request, res: Response) => {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    const product = await productStore.show(productId);
    if (product !== undefined) {
        const order = await orderStore.show(req.params.id);
        if (order.status === 'open') {
            try {
                const addedProduct = await orderStore.addProduct(quantity, orderId, productId);
                res.json({ data: addedProduct });
            } catch (error) {
                res.status(400);
                res.json(error);
            }
        } else {
            res.status(400);
            res.json({ message: 'order is already closed' });
        }
    } else {
        res.status(404);
        res.json({ message: 'product not found!' });
    }
}) as RequestHandler);

orderRouter.get('/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const order = await orderStore.show(req.params.id);
        if (order !== undefined) {
            res.status(200);
            res.json({ data: order });
        } else {
            res.status(404);
            res.json({ message: 'order not found!' });
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

orderRouter.patch('/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const order = await orderStore.show(req.params.id);
        if (order !== undefined) {
            res.status(200);
            const order = await orderStore.edit(id, status);
            res.json({ data: order });
        } else {
            res.status(404);
            res.json({ message: 'order not found!' });
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

export default orderRouter;
