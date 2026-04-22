import Link from 'next/link';
import { Github, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/10 mt-16">
      <div className="container-page py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-sm">
            © {new Date().getFullYear()} Quantix Protocol
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://qpqb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/quantix-org/quantix-org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
