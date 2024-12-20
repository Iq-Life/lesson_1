import { InputUserType } from './../src/types/userType';
import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { blogCollection, loginPassword, postCollection, runDB, usersCollection } from '../src/db/db'
import { createBlogs, createPosts } from './dataset'
import { InputPostType } from '../src/types/postsTypes'
import { converStringIntoBase64 } from '../src/helpers/helpers'
import { postRepository } from '../src/posts/repositories/postRepository'

const invalidUser: any = {
  
}

describe(SETTINGS.PATH.POSTS, () => {
  const blogsDb = createBlogs(1)

  // beforeAll(async () => {
  //   // await req.delete('/testing/all-data')
  //   await runDB()
  //   await blogCollection.drop()
  //   await blogCollection.insertMany(blogsDb)
  // })
  // afterAll(async () => {
  //   await postCollection.drop()
  //   await blogCollection.drop()
  // })

  // --- GET --- //
  // it('get /videos', async () => {
  //   await postCollection.drop()
  //   await postCollection.insertMany(createPosts(2));

  //   const res = await req
  //     .get(SETTINGS.PATH.POSTS)
  //     .expect(200)

  //   expect(res.body.length).toBe(2)
  //   expect(res.body[0].title).toEqual('title1')
  // })
  // //
  // //
  // it('get by id /post/id', async () => {
  //   await postCollection.drop()
  //   const createdPostsDB = createPosts(2)
  //   await postCollection.insertMany(createdPostsDB)
  //   const setId = createdPostsDB[0]?._id.toString()
    
  //   const res = await req
  //   .get(`${SETTINGS.PATH.POSTS}/${setId}`)
  //   .expect(200)
    
  //   expect(res.body.id).toEqual(setId)
  // })
  // //
  // //
  // it('ERROR get by id /post/id because not found', async () => {
  //   await postCollection.drop()
  //   const createdPostsDB = createPosts(2)
  //   await postCollection.insertMany(createdPostsDB)
  //   const setId = 23 // does not exist
    
  //   await req
  //     .get(`${SETTINGS.PATH.POSTS}/${setId}`)
  //     .expect(404)
  // })
  //
  // ---- POST --- //
  it('should create user', async () => {
    await usersCollection.drop()
    const login = 'KLVzjHyCRw'
    const email = 'example@example.com'
    const newUser: InputUserType = {
      login,
      password: "123",
      email
    }
    // const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.USERS)
      .send(newUser)
      .expect(201)
      
    // expect(db.posts.length).toBe(2)
    expect(res.body.login).toEqual(login)
    expect(res.body.email).toEqual(email)
    // expect(res.body.createdAt).toMatch(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
  })
  //
  //
  /*
  it('ERORR invalid post title, shortDescription, content, blogId', async () => {
    await postCollection.drop()
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidPost)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(4)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 30 letters')
    expect(res.body.errorsMessages[0].field).toEqual('title')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 1000 letters')
    expect(res.body.errorsMessages[2].field).toEqual('content')
    expect(res.body.errorsMessages[3].message).toEqual('blogId must be string')
    expect(res.body.errorsMessages[3].field).toEqual('blogId')
  })
*/
  /*
  //
  it('ERORR invalid post because blogId not found', async () => {
    await postCollection.drop()
    const newPost: InputPostType = {
      title: 'new post',
      blogId: '555b3af555a5550c5555e555',
      content: 'bla bla bla bla bla',
      shortDescription: '...short Description...'
    }
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newPost)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('blogId not found')
    expect(res.body.errorsMessages[0].field).toEqual('blogId')
  })


  // --- DELETE --- //
  it('delete post by Id', async () => {
    await postCollection.drop()
    const createdPostsDB = createPosts(2)
    await postCollection.insertMany(createdPostsDB);
    const setId = createdPostsDB[0]?._id.toString()
    const codedAuth = converStringIntoBase64(loginPassword)

    await req
      .delete(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(204)

    const posts = await postRepository.getPosts()

    expect(posts.length).toBe(1)
    expect(posts[0].id).not.toBe(setId)
  })
  //
  //
  it('ERROR not delete by Id', async () => {
    await postCollection.drop()
    const createdPostsDB = createPosts(2)
    await postCollection.insertMany(createdPostsDB);
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .delete(`${SETTINGS.PATH.POSTS}/${'4052'}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(404)

    expect(res.statusCode).toBe(404)
  })

  // --- PUT --- //
  it('update post by Id', async () => {
    await postCollection.drop()
    const createdPostsDB = createPosts(2)
    const firstCreatedDate = createdPostsDB[0].createdAt
    const changedPost = {
      title: 'changed post',
      blogId: blogsDb[0]._id.toString(),
      content: createdPostsDB[0].content,
      shortDescription: '...short Description...'
    }
    await postCollection.insertMany(createdPostsDB);
    const setId = createdPostsDB[0]?._id.toString()

    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .put(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(changedPost)
      .expect(204)

    const posts = await postRepository.getPosts()
    const ourPost = posts.find((post) => post.id === setId)
    expect(posts.length).toBe(2)
    expect(res.statusCode).toEqual(204)
    expect(ourPost?.title).toEqual(changedPost.title)
    expect(ourPost?.content).toEqual(changedPost.content)
    expect(ourPost?.id).toEqual(setId)
  })
  //
  //
  it('Error update post by Id', async () => {
    await postCollection.drop()
    const createdPostsDB = createPosts(2)
    await postCollection.insertMany(createdPostsDB);
    const setId = createdPostsDB[0]?._id.toString()
    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .put(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidPost)
      .expect(400)

    const posts = await postRepository.getPosts()

    expect(posts.length).toBe(2)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorsMessages.length).toBe(4)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 30 letters')
    expect(res.body.errorsMessages[0].field).toEqual('title')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 1000 letters')
    expect(res.body.errorsMessages[2].field).toEqual('content')
    expect(res.body.errorsMessages[3].message).toEqual('blogId must be string')
    expect(res.body.errorsMessages[3].field).toEqual('blogId')
  })
  */
})