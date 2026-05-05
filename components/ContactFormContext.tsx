"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactFormContextValue = {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openForm, closeForm }),
    [isOpen, openForm, closeForm],
  );

  return <ContactFormContext.Provider value={value}>{children}</ContactFormContext.Provider>;
}

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return ctx;
}
