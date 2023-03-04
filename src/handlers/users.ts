import { verify, sign } from 'jsonwebtoken';
import { type Request, type Response, type NextFunction, type RequestHandler, Router } from 'express';
import { type User, UserStore } from './../models/user';
import { type JwtPayload } from './../services/index';

const userRouter = Router();
const userStore = new UserStore();
const secretToken = process.env.TOKEN_SECRET_KEY ?? 'yndw787hNSHS8wsn.shgs!jdks';

export const verifyAuthToken = ((req: Request, res: Response, next: NextFunction): any => {
    try {
        const authorizationHeader = req.headers.authorization ?? '';
        const token = authorizationHeader.split(' ')[1];
        const decodedToken = verify(token, secretToken) as JwtPayload;
        res.locals.user = {
            email: decodedToken.email,
            userId: decodedToken.id,
        };
        next();
    } catch (error) {
        res.status(401);
        res.json('Access denied: ' + String(error));
        return res;
    }
}) as RequestHandler;

userRouter.get('/users/', verifyAuthToken, (async (req: Request, res: Response): Promise<any> => {
    const persons = await userStore.index();
    res.status(200);
    res.json({ data: persons });
}) as RequestHandler);

userRouter.get('/users/:id/', verifyAuthToken, (async (req: Request, res: Response): Promise<any> => {
    const person = await userStore.show(req.params.id);
    if (person !== undefined) {
        res.status(200);
        res.json({ data: person });
    } else {
        res.status(404);
        res.json({ message: 'user not found!' });
    }
}) as RequestHandler);

userRouter.post('/register/', (async (req: Request, res: Response): Promise<any> => {
    try {
        const person: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        };
        const newUser = await userStore.create(person);
        const token = sign(newUser, secretToken);
        res.json({ user: newUser, access_token: token });
        return res;
    } catch (err) {
        res.status(400);
        res.json(err);
        return res;
    }
}) as RequestHandler);

userRouter.post('/login/', (async (req: Request, res: Response): Promise<any> => {
    try {
        const person = {
            email: req.body.email,
            password: req.body.password,
        };
        const userDetails = await userStore.authenticate(person.email, person.password);
        const token = sign(String(userDetails != null || '{}'), secretToken);
        res.json({ user: userDetails, access_token: token });
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

userRouter.patch('/users/:id/', verifyAuthToken, (async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const { userId } = res.locals.user;
        let message: object, statusCode: number;
        const person = await userStore.show(req.params.id);
        if (person !== undefined) {
            if (String(userId) === id) {
                const newUser = await userStore.edit(id, firstname, lastname, password);
                statusCode = 200;
                message = { message: 'user data successfuly updated!', data: newUser };
            } else {
                statusCode = 400;
                message = { message: 'Can only update personal results!' };
            }
            res.status(statusCode);
            res.json(message);
        } else {
            res.status(404);
            res.json({ message: 'user not found!' });
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}) as RequestHandler);

userRouter.delete('/users/:id/', verifyAuthToken, (async (req: Request, res: Response): Promise<any> => {
    const deleted = await userStore.delete(req.params.id);
    const person = await userStore.show(req.params.id);
    if (person !== undefined) {
        res.status(200);
        res.json({ message: deleted });
    } else {
        res.status(404);
        res.json({ message: 'user not found!' });
    }
}) as RequestHandler);

export default userRouter;
