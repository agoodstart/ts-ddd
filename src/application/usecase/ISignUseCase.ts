import IUserDto from './IUserDto';

export default interface ISignInUseCase {
    signin(userDto: IUserDto): Promise<IUserDto>;
}