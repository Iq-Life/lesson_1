import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { blogCollection, loginPassword, runDB } from '../src/db/db'
import { InputBlogType } from '../src/types/blogsType'
import { converStringIntoBase64 } from '../src/helpers/helpers'
import { createBlogs } from './dataset'

const invalidBlog: InputBlogType = {
  name: 'length 16 symbols sssssssssssss',
  description: 'length 51 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
  websiteUrl: 'length 101 symbols  ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
}

describe(SETTINGS.PATH.BLOGS, () => {
  beforeAll(async () => {
    await runDB()
  })
  afterAll(async () => {
    await runDB()
  })
  

  // --- GET --- //
  it('get /blogs', async () => {
    await blogCollection.drop()
    await blogCollection.insertMany(createBlogs(2))

    const res = await req
      .get(SETTINGS.PATH.BLOGS)
      .expect(200)

    expect(res.body.length).toBe(2)
  })
  //  
  //
  it('get by id /blogs/id', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    const setId = blogsDb[0]._id.toString()
    await blogCollection.insertMany(blogsDb)

    const res = await req
      .get(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .expect(200)

    expect(res.body.id).toBe(setId)
  })

  // ---- POST --- //
  it('should create blog', async () => {
    await blogCollection.drop()
    
    const newBlog: InputBlogType = {
      name: 'new blog',
      description: '...Description...',
      websiteUrl: 'https://www.leningrad.com'
    }

    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newBlog)
      .expect(201)

    // expect(db.blogs.length).toBe(1)
    expect(res.body.name).toEqual('new blog')
    expect(res.body.createdAt).toMatch(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    expect(res.body.description).toEqual(newBlog.description)
  })
//
//
  it('ERORR invalid length blog: name, description, websiteUrl', async () => {
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 15 letters')
    expect(res.body.errorsMessages[0].field).toEqual('name')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 500 letters')
    expect(res.body.errorsMessages[1].field).toEqual('description')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
  })

  //
  //
  it('ERORR invalid URL blog: websiteUrl', async () => {
    const newBlog = {
      name: 'name',
      description: '...description',
      websiteUrl: 'www.leningrad.www.ru'
    }
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('Invalid url')
    expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')
  })

//   // --- DELETE --- //
  it('delete blog by Id', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    const setId = blogsDb[0]._id.toString()
    await blogCollection.insertMany(blogsDb)
    const codedAuth = converStringIntoBase64(loginPassword)

    await req
      .delete(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(204)

    const blogs = await blogCollection.find({}).toArray()
    expect(blogs.length).toBe(1)
    expect(blogs[0]._id.toString()).not.toBe(setId)
  })
//
//
  it('ERROR not delete by Id', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    await blogCollection.insertMany(blogsDb)
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .delete(`${SETTINGS.PATH.BLOGS}/111a01f1cfa1108111d01a0a`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(404)

    expect(res.statusCode).toBe(404)
  })

  // --- PUT --- //
  it('update blog by Id', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    const changedPost: InputBlogType = {
      name: 'changed name',
      description: blogsDb[0].description,
      websiteUrl: 'https://www.leningrad.com'
    }
    const setId = blogsDb[0]._id.toString()
    await blogCollection.insertMany(blogsDb)
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(changedPost)
      .expect(204)

    const blogs = await blogCollection.find({}).toArray()
    const findedPost = blogs.find((post) => post._id.toString() === setId)

    expect(blogsDb.length).toBe(2)
    expect(res.statusCode).toEqual(204)
    expect(findedPost?.name).toEqual('changed name')
    expect(findedPost?.description).toEqual(blogsDb[0].description)

  })


  it('Error invalid length update blog: name, description, websiteUrl', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    const setId = blogsDb[0]._id.toString()
    await blogCollection.insertMany(blogsDb)
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 15 letters')
    expect(res.body.errorsMessages[0].field).toEqual('name')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 500 letters')
    expect(res.body.errorsMessages[1].field).toEqual('description')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
  })

  //
  it('Error invalid update blog: websiteUrl', async () => {
    await blogCollection.drop()
    const blogsDb = createBlogs(2)
    const chengedBlog = {
      name: 'changed name',
      description: blogsDb[0].description,
      websiteUrl: 'www.leningrad.www.ru'
    }
    const setId = blogsDb[0]._id.toString()
    await blogCollection.insertMany(blogsDb)
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(chengedBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('Invalid url')
    expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')
  })
})