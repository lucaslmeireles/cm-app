'use client';
import { Button, ButtonProps } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check, LoaderCircle, X } from 'lucide-react';

 interface LoadingButtonProps extends ButtonProps {
  status: string
 } 
//======================================
export function LoadingButton({ status, ...rest }: LoadingButtonProps) {
  return (
    <Button
      disabled={status == 'loading'}
      {...rest}
      variant={status === 'error' ? 'destructive' : rest.variant}
      className={cn('w-36 rounded-lg overflow-hidden', rest.className)}
    >
      <AnimatePresence mode="wait">
        {/* //------------------------------IDLE */}
        {status === 'idle' && (
          <motion.span
            key={status}
            exit={{
              opacity: 0,
              y: -15,
              transition: { duration: 0.3, type: 'spring' },
            }}
          >
            {rest.children}
          </motion.span>
        )}
        {/* //------------------------------LOADING */}
        {status === 'loading' && (
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            <LoaderCircle className="animate-spin" size="19" />
          </motion.span>
        )}
 
        {/* //------------------------------RESOLVED */}
        {['success', 'error'].includes(status) && (
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 15, scale: 0 }}
            animate={{
              opacity: 100,
              y: 0,
              scale: 1,
              transition: { delay: 0.1, duration: 0.4 },
            }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            {status === 'success' && <Check size="20" />}
            {status === 'error' && <X size="20" />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}