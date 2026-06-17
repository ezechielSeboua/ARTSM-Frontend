import { Payment } from '@/types/payment';

export const mockPaymentsList: Payment[] = [
  { id: 'pay-001', status: 'success', amount: 150000, currency: 'FCFA', transactionId: 'TX-STRIPE-882190', method: 'Stripe', date: '2026-01-15', purpose: 'Frais de Scolarité - Semestre 1' },
  { id: 'pay-002', status: 'success', amount: 25000, currency: 'FCFA', transactionId: 'TX-CINET-291811', method: 'CinetPay', date: '2025-09-02', purpose: 'Frais d\'inscription administrative' },
];

export const simulatePayment = async (
  amount: number,
  currency: string,
  method: 'Stripe' | 'CinetPay',
  purpose: string
): Promise<Payment> => {
  // Simulate 1.5 seconds payment network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const success = Math.random() > 0.05; // 95% chance of success
  
  return {
    id: `pay-${Math.floor(100 + Math.random() * 900)}`,
    status: success ? 'success' : 'failed',
    amount,
    currency,
    transactionId: `TX-${method.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
    method,
    date: new Date().toISOString().split('T')[0],
    purpose
  };
};
