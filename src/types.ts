export interface User {
    firstName: string
    lastName: string
    age: number
    gender: 'male' | 'female'
    hair: { color: string }
    address: { postalCode: string }
    company: { department: string }
}

export interface TransformedData {
    [department: string]: {
        male: number
        female: number
        ageRange: string
        hair: Record<string, number>
        addressUser: Record<string, string>
    }
}
