import IUserReadOnlyRepository from '../../src/application/repositories/IUserReadOnlyRepository';
import User from "../../src/domain/User";

export default class FakeUserRepository implements IUserReadOnlyRepository {

    public users = [
        {
            email: "jvalkenhoff@outlook.com",
            id: "123456",
            name: "Joris",
            password: "password123",
            type: "email"
        },
        {
            email: "tester@gmail.com",
            id: "5678",
            name: "Tester",
            password: "123password",
            type: "email"
        }
    ]

    public async fetch(user: User): Promise<User> {
        const res = await this.users.find((x) => x.email === user.email);
        if(!res) {
            return null;
        }

        if(res.password !== user.password) {
            throw Error("Invalid email or password")
        }

        user.id = res.id;
        user.name = res.name;
        return user;
    }

    public async add(user: User): Promise<User> {
        const max = 9999;
        const min = 1000;
        user.id = (Math.floor(Math.random() * (+max - +min)) + +min).toString();

        this.users.push({
            email: user.email,
            id: user.id,
            name: user.name,
            password: user.password,
            type: user.type
        });
        return user;
    }
}