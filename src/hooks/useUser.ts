import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { User } from '../types/user'

// const useUser = (userId: number|undefined) => {
//     const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
    
//     useEffect(() => {
//         const response = axios.get<User []>(`https://api.escuelajs.co/api/v1/users/${userId}`)
//         setCurrentUser(response)
//         // fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
//         // .then(data => data.json())
//         // .then(data => setProduct(data))
//     }, [userId])
//     return currentUser
// }

// export default useUser