


export type TVariants = {
    type:string,
    value:string
}
export type TInventory = {
    quantity:number,
    inStock:boolean
}


export type TProducts ={
    searchTerm?:string,
    name:string,
    description:string,
    price:number,
    tags:string[],
    variants:TVariants[],
    inventory:TInventory,
    isDeleted:boolean,

}