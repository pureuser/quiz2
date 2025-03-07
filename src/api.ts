import axios from 'axios'
import { User } from './types'

const API_URL = 'https://dummyjson.com/users'

export async function fetchUsers(): Promise<User[]> {
    // ดึงข้อมูลผู้ใช้
    const response = await axios.get(API_URL) // ส่งคำขอ GET ไปยัง API_URL
    return response.data.users // คืนค่าข้อมูลผู้ใช้
}
