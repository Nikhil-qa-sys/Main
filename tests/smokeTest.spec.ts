import {test} from '../utils/fixtures';
import {expect} from '../utils/custom-expect';
import articleRequestPayload from '../request-objects/POST-article.json'
import { faker } from '@faker-js/faker';
import {getNewRandomArticle} from '../utils/data-generator'

let authToken: string

// test.beforeAll('Get token', async({api, config })=>{

//     // const tokenResponse = await api
//     //     .path('/users/login')
//     //     .body({"user": {"email": config.email, "password": config.password}})
//     //     .postRequest(200)
//     // authToken = 'Token ' + tokenResponse.user.token
//     authToken = await createToken(config.email, config.password)
// })

test('Get Articles', async ({api})=>{

    const response = await api
        .path('/articles')
        .params({limit: 10, offset: 0})
        .getRequest(200)

    expect(response.articlesCount).shouldEqual(10)
    expect(response.articles.length).shouldBeLessThanOrEqual(10)

})

test.only('get tags', async ({api})=>{

    const response = await api
        .path('/tags')
        .getRequest(200)
        expect(response).shouldMatchSchema('tags', 'GET_tags')
        // await validateSchema('tags', 'GET_tags', response)
    expect(response.tags.length).toBeGreaterThan(0)
    expect(response.tags[0]).shouldEqual('Test12')

})

// test('Logger', async ()=>{
    
//     const logger = new APILogger()
//     logger.logRequest('POST', '/articles', {'Authorization': authToken},{foo:'bar'})
//     logger.LogResponse(200, {articlesCount: 10, articles: []})
//     const logs = logger.getRecentLogs()
//     console.log(logs)
// })

test('Create and Delete article', async ({api})=>{
//if we need to run the tests in parallel to avoid dependency on roiginal object
const articleRequest = JSON.parse(JSON.stringify(articleRequestPayload))
articleRequest.article.title = 'This is an object!'
    const createArticleResponse  = await api
        .path('/articles')
        .body(articleRequest)
        .postRequest(201)
    expect(createArticleResponse.article.title).toBe('This is an object!')
    const articleSlug = createArticleResponse.article.slug

    const articleResponse = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponse.articles[0].title).toBe('This is an object!')

    await api
        .path(`/articles/${articleSlug}`)
        .deleteRequest(204)

    const articleResponseTwo = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponseTwo.articles[0].title).not.shouldEqual('This is an object!')

})


test('Create, Update and Delete article', async ({api})=>{
    const articleTitle = faker.lorem.sentence(5)
    const articleRequest = JSON.parse(JSON.stringify(articleRequestPayload))
    articleRequest.article.title = articleTitle

    const createArticleResponse  = await api
        .path('/articles')
        .body(articleRequest)
        .postRequest(201)
    expect(createArticleResponse.article.title).toBe(articleTitle)
    const articleSlug = createArticleResponse.article.slug

    //for updated title we ll again use faler to create a unique random title
    const articleTitleTwo = faker.lorem.sentence(5)
    articleRequest.article.title = articleTitleTwo
    const updateArticleResponse  = await api
        .path(`/articles/${articleSlug}`)
        .body(articleRequest)
        .putRequest(200)
    expect(updateArticleResponse.article.title).toBe(articleTitleTwo)
    const newSlugId = updateArticleResponse.article.slug

    const articleResponse = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponse.articles[0].title).toBe(articleTitleTwo)

    await api
        .path(`/articles/${newSlugId}`)
        .deleteRequest(204)

    const articleResponseTwo = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponseTwo.articles[0].title).not.shouldEqual(articleTitleTwo)

})


//incase we have a bigger object in rel time and we need unique set for creation each and every time
// we can use a helper function which will create unique value for each parameter evry time
//for example we have a user login case and need unique first-name, last-name and phone numbers
test('Create and Delete article with helper function for boject creation', async ({api})=>{

    const articleRequest = getNewRandomArticle()
    const createArticleResponse  = await api
        .path('/articles')
        .body(articleRequest)
        .postRequest(201)
    expect(createArticleResponse.article.title).toBe(articleRequest.article.title)
    const articleSlug = createArticleResponse.article.slug

    const articleResponse = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponse.articles[0].title).toBe(articleRequest.article.title)

    await api
        .path(`/articles/${articleSlug}`)
        .deleteRequest(204)

    const articleResponseTwo = await api
        .path(`/articles`)
        .params({limit: 10, offset: 0})
        .getRequest(200)
    expect(articleResponseTwo.articles[0].title).not.shouldEqual(articleRequest.article.title)

})