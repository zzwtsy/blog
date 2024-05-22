import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ISetConfigMessage {
  setConfig: {
    theme?: string | `/${string}` | `https://${string}`;
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
    term?: string;
    description?: string;
    backLink?: string;
    number?: number;
    strict?: boolean;
    reactionsEnabled?: boolean;
    emitMetadata?: boolean;
    inputPosition?: 'top' | 'bottom';
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sendMessage(message: ISetConfigMessage) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    'iframe.giscus-frame'
  );
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}
