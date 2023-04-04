export type CurrencyType = 'USD' | 'EUR'

export interface AnalitycsEvent {
    [key: string]: any
}

export interface AnalitycsPurchase extends AnalitycsEvent {
    transaction_id: string
    currency: CurrencyType
    value: number
    coupon?: string
    tax?: number
    items: AnalitycsPurchaseItem[]
}

export interface AnalitycsPurchaseItem {
    item_id: string
    item_name: string
    affiliation?: string
    coupon?: string
    discount?: number
    index?: number
    item_brand?: string
    item_category?: string
    item_list_id?: string
    item_list_name?: string
    item_variant?: string
    price?: number
    quantity?: number
}