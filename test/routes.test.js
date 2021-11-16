const request = require('supertest')
let server
const mongoose = require('mongoose')
const { User } = require('../moduls/user')

describe('/api/test', () => {
    beforeEach(() => server = require('../index'))
    afterEach(() => server.close())
 
    describe('get', () => {
        it('shold be return all users', async () => {
            const res = await request(server).get('/api/test/')
            expect(res.status).toBe(200)
            expect(res.body).not.toBeNull()
        })
    })

    describe('get/:id', () => {
        it('should be return user if input params id', async() => {
            const user = await new User({name: 'diyor'}).save();
            const res = await request(server).get('/api/test/' + user._id)
            expect(res.body).toMatchObject({name: 'diyor'})
            expect(res.status).toBe(200)
        })

        it('should be return 404 status and error object', async() => {
            const res = await request(server).get('/api/test/' + mongoose.Types.ObjectId())
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error')
        })
        
        it('should be return 400 status error object', async() => {
            const res = await request(server).get('/api/test/123')
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error')
        })
    })

    describe('post', () => {
        it('should be return new created user object', async() => {
            const res = await request(server).post('/api/test/').send({name: 'irina'})
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('name')
        })

        it('should be return erro object status 400', async() => {
            const res = await request(server).post('/api/test/')
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error')
        })
    })

    describe('put /:id', () => {
        let user;

        it('should be return updated object user', async () => {
            user = await new User({name: 'umida'}).save()
            const newUser = {name: 'jasmina'}
            const res = await request(server).put('/api/test/'+ user._id).send(newUser)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({_id: user._id, name: newUser.name})
        })

        it('should be return 400 id wrong ', async() => {
            const res = await request(server).put('/api/test/123').send({name: 'samar'})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error')
        })

        it('should be return 404 status error obb', async() => {
            const res = await request(server).put('/api/test/' + mongoose.Types.ObjectId()).send({name: "namdmmadm"})
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error')
        })
        it('should be return 400 bad request ', async () => {
            const res = await request(server).put('/api/test/' + user._id).send({name: ""})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error')
        })
    })

    describe('delete', () => {
        
        it('sholud be return 400 id wrong', async() => {
            const res = await request(server).delete('/api/test/123')
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error')
        })
        it('should be return 404 status id not found', async() => {
            const res = await request(server).delete('/api/test/' + mongoose.Types.ObjectId())
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error')
        })
        it('should be return deleted obb 200 status', async() => {
            const user = await new User({name: 'fucking girl'}).save();
            const res = await request(server).delete('/api/test/' + user._id)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({_id: user._id, name: user.name})
        })
    })
})