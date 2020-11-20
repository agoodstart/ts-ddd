import ISigninUseCase from './ISignUseCase';
import IUserDto from './IUserDto';
import IUserReadOnlyRepository from '../repositories/IUserReadOnlyRepository';
import User from '@pbb/domain/User';

export default class SigninUseCase implements ISigninUseCase {
    
    private userReadOnlyRepository: IUserReadOnlyRepository;

    constructor(userReadOnlyRepository: IUserReadOnlyRepository){
        this.userReadOnlyRepository = userReadOnlyRepository;
    }
    public async signin(userDto: IUserDto): Promise<IUserDto> {
        let user = new User(
            userDto.id, userDto.name, 
            userDto.email, 
            userDto.password, 
            userDto.type);
        
        user = await this.userReadOnlyRepository.fetch(user);

        const foundUserDto = user;

        return foundUserDto;
    }
}