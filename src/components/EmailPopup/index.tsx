import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import { Form } from './Form';

type EmailPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  return (
    <Dialog open={isOpen} as='div' className='relative z-50 focus:outline-none' onClose={onClose}>
      <DialogBackdrop onClick={onClose} className='fixed inset-0 bg-black/30' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-6'>
          <DialogPanel
            transition
            className='w-full max-w-md rounded-xl bg-slate-100 px-6 py-4 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <DialogTitle as='h3' className='mb-1 text-base/7 font-semibold text-slate-900'>
              Request access to contact information
            </DialogTitle>

            <Form isOpen={isOpen} onClose={onClose} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
