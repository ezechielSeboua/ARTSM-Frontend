'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { simulatePayment } from '@/lib/payment';
import { Payment } from '@/types/payment';

interface CinetPayButtonProps {
  amount: number;
  currency: string;
  purpose: string;
  onSuccess?: (payment: Payment) => void;
}

export function CinetPayButton({ amount, currency, purpose, onSuccess }: CinetPayButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'operator' | 'otp' | 'success' | 'failed'>('operator');
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  const handleOperatorSelect = (operator: string) => {
    setSelectedOperator(operator);
  };

  const handleSendRequest = () => {
    if (!phone || !selectedOperator) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleConfirmPay = async () => {
    if (!otp) return;
    setLoading(true);
    try {
      const payment = await simulatePayment(amount, currency, 'CinetPay', purpose);
      setPaymentData(payment);
      if (payment.status === 'success') {
        setStep('success');
        if (onSuccess) onSuccess(payment);
      } else {
        setStep('failed');
      }
    } catch (err) {
      setStep('failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('operator');
    setSelectedOperator('');
    setPhone('');
    setOtp('');
    setPaymentData(null);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white border-none shadow-lg shadow-amber-900/20">
        <span>📱</span> Payer avec Mobile Money (CinetPay)
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Paiement Mobile Money via CinetPay">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-slate-400">Traitement de l\'opération en cours...</p>
          </div>
        ) : step === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <span className="text-5xl text-emerald-500">✓</span>
            <h4 className="text-lg font-bold text-white">Transaction Validée !</h4>
            <p className="text-sm text-slate-400">
              Votre paiement mobile money a bien été effectué et validé.
            </p>
            <div className="w-full bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-left text-slate-400 flex flex-col gap-1.5 mt-2">
              <div><span className="font-semibold text-slate-350">Transaction ID:</span> {paymentData?.transactionId}</div>
              <div><span className="font-semibold text-slate-355">Montant:</span> {paymentData?.amount} {paymentData?.currency}</div>
              <div><span className="font-semibold text-slate-350">Méthode:</span> CinetPay ({selectedOperator})</div>
              <div><span className="font-semibold text-slate-355">Téléphone:</span> +225 {phone}</div>
              <div><span className="font-semibold text-slate-350">Date:</span> {paymentData?.date}</div>
            </div>
            <Button variant="secondary" onClick={handleClose} className="mt-4 w-full">
              Terminer
            </Button>
          </div>
        ) : step === 'failed' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <span className="text-5xl text-rose-500">✕</span>
            <h4 className="text-lg font-bold text-white">La transaction a échoué</h4>
            <p className="text-sm text-slate-400">
              Le paiement mobile a été refusé ou a expiré. Veuillez réessayer.
            </p>
            <div className="flex gap-4 w-full mt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Annuler
              </Button>
              <Button variant="primary" onClick={() => setStep('operator')} className="flex-1">
                Réessayer
              </Button>
            </div>
          </div>
        ) : step === 'otp' ? (
          <div className="flex flex-col gap-6 py-4 text-left">
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-xs text-amber-400">
              ℹ️ Un SMS contenant un code de confirmation a été envoyé sur votre téléphone. Veuillez le saisir ci-dessous.
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Code secret / OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Ex: 882910"
                className="w-full px-4 py-2.5 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white text-center tracking-widest placeholder-slate-600 focus:outline-none focus:border-teal-500 font-bold"
              />
            </div>
            <Button variant="primary" onClick={handleConfirmPay} className="py-3 w-full mt-2 bg-teal-600 hover:bg-teal-500 border-none">
              Confirmer le paiement ({amount} {currency})
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 py-4 text-left">
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-850">
              <div>
                <div className="text-[10px] text-slate-550 uppercase tracking-wider">Objet du paiement</div>
                <div className="text-sm font-semibold text-white">{purpose}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-550 uppercase tracking-wider">Montant</div>
                <div className="text-base font-extrabold text-amber-400">{amount} {currency}</div>
              </div>
            </div>

            {/* Operator selector */}
            <div>
              <span className="text-xs font-semibold text-slate-400">Opérateur Mobile</span>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { id: 'orange', name: 'Orange', icon: '🍊' },
                  { id: 'mtn', name: 'MTN', icon: '🟡' },
                  { id: 'wave', name: 'Wave', icon: '🌊' },
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => handleOperatorSelect(op.name)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedOperator === op.name
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/45 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{op.icon}</span>
                    <span className="text-[10px] font-bold">{op.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone input */}
            <div>
              <label className="text-xs font-semibold text-slate-400">Numéro de téléphone mobile</label>
              <div className="flex gap-2 mt-1">
                <span className="px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-sm flex items-center justify-center">+225</span>
                <input
                  type="tel"
                  placeholder="07 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-650 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleSendRequest}
              disabled={!phone || !selectedOperator}
              className="py-3 w-full mt-2 bg-amber-600 hover:bg-amber-500 border-none"
            >
              Envoyer la demande de paiement
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CinetPayButton;
