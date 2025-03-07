import axios from 'axios'
import { User } from './types'

const API_URL = 'https://dummyjson.com/users'

export async function fetchUsers(): Promise<User[]> {
    const response = await axios.get(API_URL)
    return response.data.users // คืนค่าข้อมูลผู้ใช้
}
