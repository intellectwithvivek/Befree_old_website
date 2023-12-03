export interface Offer {
    active: boolean;
    complimentaryItem: string;
    id: string;
    limit: 'No Limit'|number;
    minOrderType: 'value'|'quantity';
    offer_type: string;
    quantity: number;
    startDate: string;
    timing: string;
    title: string;
    discount:number;
    minOrder:number;
  }