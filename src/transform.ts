import { TransformedData, User } from './types'

export function transformData(users: User[]): TransformedData {
    // แปลงข้อมูล
    const departmentMap = new Map<
        string,
        TransformedData[keyof TransformedData]
    >()

    let minAge = Infinity, // Infinity เพื่อให้ค่าเริ่มต้นเป็นค่าที่มากที่สุดถ้าไม่ใช้จะมี bug ในกรณีที่ข้อมูลไม่มี
        maxAge = -Infinity // -Infinity เพื่อให้ค่าเริ่มต้นเป็นค่าที่น้อยที่สุดถ้าไม่ใช้จะมี bug ในกรณีที่ข้อมูลไม่มี
    // const ages = [25, 30, 20];
    // let minAge = 0;
    // for (let age of ages) {
    //     minAge = Math.min(minAge, age); // minAge จะคงที่เป็น 0 เพราะ 0 < ทุกค่า
    // }
    // console.log(minAge); //  ผิด! ควรเป็น 20 แต่ได้ 0
    for (const user of users) {
        const { company, gender, age, hair, address, firstName, lastName } =
            user
        const department = company.department
        const fullName = `${firstName}${lastName}`

        if (!departmentMap.has(department)) {
            departmentMap.set(department, {
                male: 0,
                female: 0,
                ageRange: '',
                hair: {},
                addressUser: {},
            })
        }

        const deptData = departmentMap.get(department)! // ดึงข้อมูลแผนก
        deptData[gender]++ // นับจำนวนชาย/หญิง
        deptData.hair[hair.color] = (deptData.hair[hair.color] || 0) + 1 // นับจำนวนสีผม
        deptData.addressUser[fullName] = address.postalCode

        minAge = Math.min(minAge, age)
        maxAge = Math.max(maxAge, age)
    }

    for (const deptData of departmentMap.values()) {
        deptData.ageRange = `${minAge}-${maxAge}`
    }

    return Object.fromEntries(departmentMap) // แปลง Map เป็น Object
}
