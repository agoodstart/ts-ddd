import SignInUseCase from '@pbb/application/usecase/SignInUseCase';
import { injectable, inject } from 'inversify';
import IUserReadOnlyRepository from '@pbb/application/repositories/IUserReadOnlyRepository';
import {TYPES} from '@pbb/constants/types';

@injectable()
export default class AuthServiceLocator {

    constructor(@inject(TYPES.IUserReadOnlyRepository) 
                private readRepository: IUserReadOnlyRepository) {
        
    }

    public GetSignInUseCase() {
        return new SignInUseCase(this.readRepository);
    }
}