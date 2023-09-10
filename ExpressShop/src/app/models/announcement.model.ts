export interface Announcement {
    id?: number,
    price:number,
    title: string,
    description: string,
    date?: Date,
    category:string,
    transaction: string,
    number: string,
    email: string,
    adress: string,
    city: string,
    condition: string,
    image?:any
}