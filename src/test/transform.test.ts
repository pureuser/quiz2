import { transformData } from '../transform'
import { User } from '../types'

const mockUsers: User[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        gender: 'male',
        hair: { color: 'Black' },
        address: { postalCode: '12345' },
        company: { department: 'Engineering' },
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        gender: 'female',
        hair: { color: 'Blond' },
        address: { postalCode: '54321' },
        company: { department: 'Engineering' },
    },
]

test('transformData should group users by department', () => {
    const result = transformData(mockUsers)

    expect(result).toHaveProperty('Engineering')
    expect(result.Engineering.male).toBe(1)
    expect(result.Engineering.female).toBe(1)
    expect(result.Engineering.ageRange).toBe('25-30')
    expect(result.Engineering.hair).toEqual({ Black: 1, Blond: 1 })
    expect(result.Engineering.addressUser).toEqual({
        JohnDoe: '12345',
        JaneSmith: '54321',
    })
})
