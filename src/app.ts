import { fetchUsers } from './api'
import { transformData } from './transform'

async function main() {
    try {
        const users = await fetchUsers() // ดึงข้อมูล
        const transformed = transformData(users) // แปลงข้อมูล
        console.log(JSON.stringify(transformed, null, 2)) // แสดงผลแบบสวยงาม
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

main()
