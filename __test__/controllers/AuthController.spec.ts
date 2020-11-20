import "mocha";
import {it} from "mocha";
import sinon, {SinonSandbox} from 'sinon';
import sinonChai from 'sinon-chai';
import AuthController from '../../src/entrypoint/controllers/AuthController';
import AuthServiceLocator from '../../src/configuration/usecases/AuthServiceLocator';

const {expect} = chai;

chai.use(sinonChai);

describe("Auth Controller", () => {
    let sut: AuthController;
    let sandbox: SinonSandbox = null;
    let serviceLocator: AuthServiceLocator;
    let fakeRespository: FakeUserRepository;

    const user = {
        email: "jvalkenhoff@outlook.com",
        id: "123456",
        name: "Joris",
        password: "password123",
        type: "email"
    }
});