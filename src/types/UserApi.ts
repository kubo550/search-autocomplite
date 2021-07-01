interface Geo {
    lat: number,
    lng: number
}

interface Adress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Geo
}

interface Company {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface UserApi {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Adress,
    phone: string,
    website: string,
    company: Company
}

export type User = Pick<UserApi, "id" | "name" | "username">