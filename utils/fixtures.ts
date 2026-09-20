import {test as base} from '@playwright/test';
import { RequestHandler } from '../utils/request-handler';
import { APILogger } from './logger';
import { setCustomExpectLogger } from './custom-expect';
import { config } from '../api-test.config';
import { createToken } from '../helpers/createToken';

export type TestOptions = {
  api: RequestHandler;
  config: typeof config;
};

export type WorkerFixture = {
    authToken: string;
}

export const test=base.extend<TestOptions, WorkerFixture>({
    authToken : [async({}, use)=> {
        const authToken = await createToken(config.email, config.password)
        await use(authToken)
    }, {scope:'worker'}],


    api: async({request, authToken}, use) => {
        // const baseUrl = 'https://conduit-api.bondaracademy.com/api';
        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHandler = new RequestHandler(request, config.apiUrl, logger, authToken);
        await use(requestHandler);
    },
        
    //everything that is befor the iuse function will act as before hook and everything after the use function will act as after hook
    
    config : async({}, use) => {
        await use(config)
    }
})