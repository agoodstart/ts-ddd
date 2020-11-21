import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import "mocha";
import {it} from "mocha";
import sinon, {SinonSandbox} from 'sinon';
import sinonChai from 'sinon-chai';
import AuthController from '../../src/entrypoint/controllers/AuthController';
import AuthServiceLocator from '../../src/configuration/usecases/AuthServiceLocator';
import { mockRequest, mockResponse } from "../helpers/helpers";
import FakeUserRepository from "../helpers/FakeRepository";

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

    const req: any = mockRequest(user);
    const res: any = mockResponse();

    beforeEach(() => {
        fakeRespository = new FakeUserRepository();
        serviceLocator = new AuthServiceLocator(fakeRespository);
        sandbox = sinon.createSandbox();

        sut = new AuthController(serviceLocator);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("signin", () => {
        it("should return 400 on empty request", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            const emptyReq: any = { body: {}};
            await sut.signIn(emptyReq, res);

            expect(res.status).to.have.been.calledWith(400);
        });
    });
});