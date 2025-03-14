const request = require('supertest');
const app = require('../server');

let server; // To store the running server instance

beforeAll(() => {
    server = app.listen(4000); // Start test server
});

afterAll((done) => {
    server.close(done); // Stop the server after tests
});

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should not allow duplicate user registration', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'password' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should log in a registered user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not log in with incorrect credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
});
