
export interface Product {
  id: string;
  name: string;
  category: string;
  quantityType: 'pcs' | 'ltr' | 'kg' | 'pkt';
  price: number;
  stock: number;
  available: boolean;
  details?: string;
  size?: string;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  discount: number; // percentage or fixed amount logic handled in component
}

export interface Bill {
  id: string;
  billNumber: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subTotal: number;
  discountAmount: number;
  grandTotal: number;
  paymentMethod: 'Cash' | 'UPI';
  changeDue: number;
  generatedBy: string; // Admin name
  timestamp: number;
  dateStr: string;
}

export interface User {
  email: string;
  uid: string;
  displayName?: string;
}

export type ViewState = 'billing' | 'saved' | 'admin';
export type AdminTab = 'todo' | 'history' | 'added' | 'verify' | 'sales';
