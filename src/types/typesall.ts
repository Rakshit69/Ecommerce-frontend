export type User ={
    name: string;
    _id: string;
    gender: string;
    photo: string;
    email: string;
    dob: string;
    role: string;
};

export type Product ={
    name: string;
    _id: string;
    price: number;
    category: string;
    stock: number;
    photo: string;
};

export type ShippingInfo = {
    city: string,
    address: string,
    country: string,
    state: string,
    pincode: string,
    
};


export type cartItem = {
    productId: string,
    name: string,
    photo: string,
    quantity: number,
    stock: number,
    price: number,
};
export type OrderItem = Omit<cartItem,"stock"> & {
    
    _id: string,
    
};


export type Order = {
    
    _id: string;
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    subtotal: number;
    tax:number;
    discount:number;
    total:number;
    shippingCharges:number;
    status: string;
    user: {
        _id: string;
        name: string;
    }

};
type LatestCount = {
    _id: string
    discount: number,
    amount: number,
    quantity: number,
    status: string,
};

type ChangeandCountType = {
    revenue: number;
    product: number;
    user: number;
    order: number;
};
export type Stats = {
    categoryCount: Record<string, number>[],
    changePercentage: ChangeandCountType,
    count: ChangeandCountType,
    chart: {
        order: number[],
        revenue: number[]
    },
    Usersratio: {
        male: number;
        female: number;
    },
    latestTransaction: LatestCount[],

};

type OrderFullFillment = {
    proccessing: number;
    shipped: number;
    delivered: number;
};
type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
};
type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
};
export type Pie = {

    orderFullfillment: OrderFullFillment,

    productCategories: Record<string, number>[],
    
    stocksAvalibility: {
        inStock: number;
        outOfStock: number;
    },
    
    revenueDistribution: RevenueDistribution,

    usersAgeGroup: UsersAgeGroup,

    adminCustomer: {
        admin: number;
        customer: number;
    },

};
export type Bar = {

    products: number[],
    users: number[],
    orders: number[]

};

export type Line = {

    products: number[],
    users: number[],
    discount : number[],
    revenue  : number[] 
}
