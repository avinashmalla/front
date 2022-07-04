import { fetchAllUsers, loginAsync, loginByToken, fetchSingleUser } from "../../redux/reducers/userReducer"
import createTestStore from "../utils/testStore"
import { testUser, adminLogin, adminUser } from "../utils/user-utils"
let store = createTestStore()

const testToken = JSON.stringify(localStorage.getItem(`john@mail.com`))

//cleanup before each test
beforeEach(() => {
    store = createTestStore()
})

describe('test user reducer', () => {
    test('user should login successfully', async () => {
        await store.dispatch(loginAsync(adminLogin))
        expect(store.getState().userReducer.currentUser).toBeDefined()
    })
    test('user should not login with wrong credentials', async () => {
        await store.dispatch(loginAsync({
            email: 'john@mail.com',
            password: 'changemed'
        }))
        expect(store.getState().userReducer.currentUser).toBeUndefined()
    })
    // test('user should login with token', async () => {
    //     await store.dispatch(loginByToken(testToken))
    //     expect(store.getState().userReducer.currentUser).toBeDefined()
    // })
    test('should get all users', async () => {
        await store.dispatch(fetchAllUsers(adminUser))
        expect(store.getState().userReducer.userList.length).toBeGreaterThan(0)
    })
    test('should NOT fetch: non-admin login', async () => {
        await store.dispatch(fetchAllUsers(testUser))
        expect(store.getState().userReducer.userList.length).toBe(0)
    })
    test('should extract one user', async () => {
        // await store.dispatch(fetchAllUsers(testUser))
        await store.dispatch(fetchSingleUser('Jhon'))
        expect(store.getState().userReducer.userList.length).toBe(1)
    })
})
