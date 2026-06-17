export interface Payment {
  id: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: string;
  transactionId: string;
  method: 'Stripe' | 'CinetPay';
  date: string;
  purpose: string;
}
