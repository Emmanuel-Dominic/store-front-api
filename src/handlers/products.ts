import { type Request, type Response, type RequestHandler, Router } from 'express';
import { type Product, ProductStore } from './../models/product';
import { verifyAuthToken } from './../handlers/users';

const productRouter = Router();
const productStore = new ProductStore();

productRouter.get('/', (async (req: Request, res: Response) => {
    const products = await productStore.index();
    res.status(200);
    res.json({ data: products });
}) as RequestHandler);

productRouter.post('/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await productStore.create(product);
        res.json({ data: newProduct });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

productRouter.get('/:id/', (async (req: Request, res: Response) => {
    const product = await productStore.show(req.params.id);
    if (product !== undefined) {
        res.status(200);
        res.json({ data: product });
    } else {
        res.status(404);
        res.json({ message: 'product not found!' });
    }
}) as RequestHandler);

productRouter.patch('/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const product = await productStore.show(req.params.id);
        if (product !== undefined) {
            const product = await productStore.edit(id, name, price);
            res.status(200);
            res.json({ data: product });
        } else {
            res.status(404);
            res.json({ message: 'product not found!' });
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

productRouter.delete('/:id/', verifyAuthToken, (async (req: Request, res: Response) => {
    const product = await productStore.show(req.params.id);
    if (product !== undefined) {
        const deleted = await productStore.delete(req.params.id);
        res.status(200);
        res.json({ message: deleted });
    } else {
        res.status(404);
        res.json({ message: 'product not found!' });
    }
}) as RequestHandler);

export default productRouter;
