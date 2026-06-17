'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { simulatePayment } from '@/lib/payment';
import { Payment } from '@/types/payment';

interface StripeButtonProps {
  amount: number;
  currency: string;
  purpose: string;
  onSuccess?: (payment: Payment) => void;
}

export function StripeButton({ amount, currency, purpose, onSuccess }: StripeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  const handlePay = async () => {
    setLoading(true);
    try {
      const payment = await simulatePayment(amount, currency, 'Stripe', purpose);
      setPaymentData(payment);
      if (payment.status === 'success') {
        setStatus('success');
        if (onSuccess) onSuccess(payment);
      } else {
        setStatus('failed');
      }
    } catch (err) {
      setStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
    setPaymentData(null);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <span>💳</span> Payer avec Stripe
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Paiement Sécurisé via Stripe">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-slate-400">Connexion aux serveurs Stripe sécurisés...</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <span className="text-5xl text-emerald-500">✓</span>
            <h4 className="text-lg font-bold text-white">Paiement Réussi !</h4>
            <p className="text-sm text-slate-400">
              Votre transaction a été validée. Un reçu de paiement a été envoyé à votre adresse email.
            </p>
            <div className="w-full bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-left text-slate-400 flex flex-col gap-1.5 mt-2">
              <div><span className="font-semibold text-slate-350">Transaction ID:</span> {paymentData?.transactionId}</div>
              <div><span className="font-semibold text-slate-355">Montant:</span> {paymentData?.amount} {paymentData?.currency}</div>
              <div><span className="font-semibold text-slate-350">Date:</span> {paymentData?.date}</div>
              <div><span className="font-semibold text-slate-355">Objet:</span> {paymentData?.purpose}</div>
            </div>
            <Button variant="secondary" onClick={handleClose} className="mt-4 w-full">
              Fermer
            </Button>
          </div>
        ) : status === 'failed' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <span className="text-5xl text-rose-500">✕</span>
            <h4 className="text-lg font-bold text-white">Échec du Paiement</h4>
            <p className="text-sm text-slate-400">
              La transaction a été rejetée. Veuillez vérifier vos informations ou réessayer.
            </p>
            <div className="flex gap-4 w-full mt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Annuler
              </Button>
              <Button variant="primary" onClick={handlePay} className="flex-1">
                Réessayer
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 py-4">
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-850">
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Objet du paiement</div>
                <div className="text-sm font-semibold text-white">{purpose}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Montant total</div>
                <div className="text-base font-extrabold text-teal-400">{amount} {currency}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-left">
              <div>
                <label className="text-xs font-semibold text-slate-400">Nom sur la carte</label>
                <input
                  type="text"
                  placeholder="Seydou Keïta"
                  className="w-full px-4 py-2.5 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 font-medium">Numéro de carte</label>
                <input
                  type="text"
                  placeholder="4242 •••• •••• 4242"
                  className="w-full px-4 py-2.5 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Date d'expiration</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-4 py-2.5 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 font-medium">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2.5 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <Button variant="primary" onClick={handlePay} className="py-3 w-full mt-2">
              Payer {amount} {currency}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default StripeButton;
