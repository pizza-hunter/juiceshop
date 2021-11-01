"use strict";

const frisby = require("frisby");
const REST_URL = 'http://localhost:3000/rest'

const jsonHeader = { 'content-type': 'application/json' }

describe('/rest/user/login', () => {
    it('POST typical SQL Injection attack string email: "admin@guardian.com‘ OR 1=1;--" password: "password" to login as admin', () =>{
        return frisby.post(REST_URL + '/user/login', {
            headers: jsonHeader,
            body: {
                email: 'admin@guardian.com‘ OR 1=1;--',
                password: 'password'
            }
        })
        .expect('status', 401)
    })

    it('POST correct login information email: "admin@guardian.com" password: "admin123" to login as admin', () => {
        return frisby.post(REST_URL + '/user/login', {
            headers: jsonHeader,
            body: {
                email: 'admin@guardian.com',
                password: 'admin123'
            }
        })
    .expect('status', 200)
    })
})