type Geo = {
    lat: string
    lng: string
}

type Address = {
   city: string
   geo?: Geo 
   street: string
   suite?: string
   zipcode: string
}

type Company = {
    bs: string
    catchPharse: string
    name: string
}

export interface User {
    address: Address
    company?: Company
    email: string
    id?: number
    name: string
    phone: string
    username: string
    website: string
}