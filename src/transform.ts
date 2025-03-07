import { TransformedData, User } from './types'

export function transformData(users: User[]): TransformedData {
    const departmentMap = new Map<
        string,
        TransformedData[keyof TransformedData]
    >()

    let minAge = Infinity,
        maxAge = -Infinity

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

        const deptData = departmentMap.get(department)!
        deptData[gender]++ // นับจำนวนชาย/หญิง
        deptData.hair[hair.color] = (deptData.hair[hair.color] || 0) + 1
        deptData.addressUser[fullName] = address.postalCode

        minAge = Math.min(minAge, age)
        maxAge = Math.max(maxAge, age)
    }

    for (const deptData of departmentMap.values()) {
        deptData.ageRange = `${minAge}-${maxAge}`
    }

    return Object.fromEntries(departmentMap)
}
