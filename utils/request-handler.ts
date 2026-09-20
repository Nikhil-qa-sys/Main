import { APIRequestContext } from "@playwright/test"
import {test} from '@playwright/test'
import { APILogger } from "./logger"

export class RequestHandler {

    private request: APIRequestContext
    private logger: APILogger
    private baseUrl: string | undefined
    private defaultBaseUrl: string
    private apiPath: string = ''
    private quesryParams: object = {}
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}
    private defaultAuthToken: string 
    private clearAuthFlag: boolean = false

    constructor(request : APIRequestContext, apiBaseUrl: string, logger: APILogger, authToken: string = ''){

        this.request = request
        this.defaultBaseUrl = apiBaseUrl
        this.logger = logger
        this.defaultAuthToken = authToken
    }

    url(url: string){
        this.baseUrl = url
        return this
    }

    path(path: string){
        this.apiPath = path
        return this
    }

    params(params : object){
        this.quesryParams = params
        return this
    }

    headers(headers: Record<string, string>){
        this.apiHeaders = headers
        return this
    }

    body(body: object){
        this.apiBody = body
        return this
    }

    clearAuth(){
        this.clearAuthFlag = true
        return this
    }

    async getRequest(statusCode: number){
        let respnseJSON: any;
        const url = this.getUrl()
        await test.step(`GET Request to ${url}`, async ()=> {
            this.logger.logRequest('GET', url, this.getHeaders())
        const response = await this.request.get(url, {
            headers: this.getHeaders()
        })
        this.cleanUpFields()
        const actualStatus = response.status()
        respnseJSON = await response.json()

        this.logger.LogResponse(actualStatus, respnseJSON)
        this.statusCodeValidator(actualStatus, statusCode, this.getRequest)
        })
        
        
        return respnseJSON
    }

    async postRequest(statusCode: number){
        let respnseJSON: any;

        const url = this.getUrl()
        await test.step(`POST Request to ${url}`, async ()=> {
        this.logger.logRequest('POST', url, this.getHeaders(), this.apiBody)
        const response = await this.request.post(url, {
            headers: this.getHeaders(),
            data: this.apiBody
        })
        this.cleanUpFields()

        const actualStatus = response.status()
        respnseJSON = await response.json()
        this.logger.LogResponse(actualStatus, respnseJSON)
        this.statusCodeValidator(actualStatus, statusCode, this.postRequest)
    })
        return respnseJSON
    }

    async putRequest(statusCode: number){
        let respnseJSON: any;

        const url = this.getUrl()
        await test.step(`POST Request to ${url}`, async ()=> {
        this.logger.logRequest('PUT', url, this.getHeaders(), this.apiBody)
        const response = await this.request.put(url, {
            headers: this.getHeaders(),
            data: this.apiBody
        })
        this.cleanUpFields()

        const actualStatus = response.status()
        respnseJSON = await response.json()
        this.logger.LogResponse(actualStatus, respnseJSON)
        this.statusCodeValidator(actualStatus, statusCode, this.putRequest)
    })
        return respnseJSON
    }

    async deleteRequest(statusCode: number){
        const url = this.getUrl()
        await test.step(`DELETE Request to ${url}`, async ()=> {
        this.logger.logRequest('DELETE', url, this.getHeaders())
        const response = await this.request.delete(url, {
            headers: this.getHeaders(),
        })
        this.cleanUpFields()

        const actualStatus = response.status()
        this.logger.LogResponse(actualStatus)
        this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest)
    })
    }

    private getUrl(){
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`)
        for(const [key, value] of Object.entries(this.quesryParams)){
            url.searchParams.append(key, value)
        }
        return url.toString()
    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number, callingFunction: Function){
        if(actualStatus !== expectedStatus){
            const logs = this.logger.getRecentLogs()
            const error = new Error(`Expected status ${expectedStatus} but got ${actualStatus}.\n\nRecent API Activity:\n${logs}`)
            Error.captureStackTrace(error, callingFunction)
            throw error
        }
    }

    private getHeaders(){
        if(!this.clearAuthFlag){
             this.apiHeaders['Authorization'] = this.apiHeaders['Authorization'] || this.defaultAuthToken
        }
        return this.apiHeaders
    }

    private cleanUpFields(){
        this.apiBody = {}
        this.apiHeaders = {}
        this.quesryParams = {}
        this.apiPath = ''
        this.baseUrl = undefined
    }
}