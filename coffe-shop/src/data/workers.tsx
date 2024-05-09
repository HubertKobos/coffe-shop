import { Worker } from "../types";

export const workers: Worker[] = [
    {
        id: 1,
        first_name: 'Michael',
        surname: 'Jones',
        insurance: {
            id: 123,
            expiration: new Date('2023-07-15')
        },
        work_contract: {
            id: 456,
            expiration: new Date('2024-12-31')
        }
    },
    {
        id: 2,
        first_name: 'Emily',
        surname: 'Williams',
        insurance: {
            id: 234,
            expiration: new Date('2024-03-20')
        },
        work_contract: {
            id: 567,
            expiration: new Date('2023-09-30')
        }
    },
    {
        id: 3,
        first_name: 'John',
        surname: 'Smith',
        insurance: {
            id: 345,
            expiration: new Date('2023-11-10')
        },
        work_contract: {
            id: 678,
            expiration: new Date('2023-08-15')
        }
    },
    {
        id: 4,
        first_name: 'Alice',
        surname: 'Johnson',
        insurance: {
            id: 456,
            expiration: new Date('2024-05-25')
        },
        work_contract: {
            id: 789,
            expiration: new Date('2024-04-01')
        }
    },
    {
        id: 5,
        first_name: 'David',
        surname: 'Brown',
        insurance: {
            id: 567,
            expiration: new Date('2023-10-05')
        },
        work_contract: {
            id: 890,
            expiration: new Date('2024-01-20')
        }
    }
];