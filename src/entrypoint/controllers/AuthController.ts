import ISignInUseCase from '@pbb/application/usecase/ISignUseCase';
import AuthServiceLocator from '@pbb/configuration/usecases/AuthServiceLocator';
import { inject } from 'inversify';
import * as express from 'express';
import {controller, httpPost, interfaces, request, response} from 'inversify-express-utils';
import {TYPES} from '@pbb/constants/types';
import IUserDto from '@pbb/application/usecase/IUserDto';

// dependency injection
// Inject services in this controller
// IoC container
// ISignInUseCase to execute a signin function whenever somebody visits the signin route/
@controller("/auth")
export default class AuthController implements interfaces.Controller {
    private readonly signInUseCase: ISignInUseCase;

    // inject ISigninusecase
    constructor(@inject(TYPES.AuthServiceLocator) serviceLocator: AuthServiceLocator) {
        this.signInUseCase = serviceLocator.GetSignInUseCase();
    }

    //signin route
    @httpPost("/signin")
    public async signIn(@request() req: express.Request, @response() res: express.Response) {
        const userDto: IUserDto = req.body;
        return this.signInUseCase.signin(userDto)
                        .then((foundUserDto: IUserDto) => res.status(200).json(foundUserDto))
                        .catch((err: Error) => res.status(400).json({error: err.message}));
    }
}