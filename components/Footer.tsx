import React from 'react';
import { IconGithub, IconLinkedin, IconMail } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex justify-between items-center border-t border-white/10 pt-8">
        <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Akash. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://github.com/akashpn" target="_blank" rel="noopener noreferrer" className="footer-link">
            <IconGithub />
          </a>
          <a href="https://www.linkedin.com/in/akash-pn/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <IconLinkedin />
          </a>
          <a href="mailto:akashpn.work@gmail.com" className="footer-link">
            <IconMail />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;