import Link from 'next/link';

import { getMenu } from 'lib/shopify';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu'); // Trocar
  const copyrightName = COMPANY_NAME || SITE_NAME || 'Aboio';
  
    return (
      <footer className="border-t pt-8 pb-6 text-sm text-neutral-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center gap-2 text-black dark:text-white mb-4">
                <span className="text-2xl font-bold">{SITE_NAME || 'ABOIO'}</span>
              </Link>
              <div className="flex justify-center md:justify-start space-x-4 mb-6">
                <a href="#" aria-label="Instagram" className="text-neutral-500 hover:text-black dark:hover:text-white">
                  <Instagram size={24} />
                </a>
                <a href="#" aria-label="Facebook" className="text-neutral-500 hover:text-black dark:hover:text-white">
                  <Facebook size={24} />
                </a>
                <a href="#" aria-label="Twitter" className="text-neutral-500 hover:text-black dark:hover:text-white">
                  <Twitter size={24} />
                </a>
              </div>
              <p className="text-sm text-center md:text-left">
                A Aboio é um grupo editorial multimídia nascido em 2020. Nosso foco é a publicação de literatura inovadora em língua portuguesa. A direção da casa é de Leopoldo Cavalcante.
              </p>
            </div>
            <div className="text-center md:text-left">
              <ul className="space-y-2">
                <li><Link href="/livros" className="hover:underline">livros</Link></li>
                <li><Link href="/onde-achar" className="hover:underline">onde achar</Link></li>
                <li><Link href="/quem-apoia" className="hover:underline">quem apoia</Link></li>
                <li><Link href="/como-publicar" className="hover:underline">como publicar</Link></li>
                <li><Link href="/clube-aboio" className="hover:underline">clube aboio</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <ul className="space-y-2">
                <li><Link href="/revista" className="hover:underline">revista</Link></li>
                <li><Link href="/aboio-acessivel" className="hover:underline">aboio acessível</Link></li>
                <li><Link href="/contato" className="hover:underline">contato</Link></li>
                <li><Link href="/quem-faz" className="hover:underline">quem faz?</Link></li>
              </ul>
            </div>
          </div>
  
          <div className="border-t pt-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center md:text-left order-2 md:order-1">
                &copy; {copyrightDate} {copyrightName}
                {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} Todos os direitos reservados.
              </div>
              <div className="text-center order-1 md:order-2 mb-4 md:mb-0">
                quem fez esse site foi a Aboio.<br />
                não é perfeito, mas é o que a gente conseguiu fazer.<br />
                qualquer erro muito feio, manda pra gente!
              </div>
              <div className="text-center md:text-right order-3">
                Todos os produtos editoriais produzidos sob a marca Aboio® são publicados pela
                empresa Aboio Editora LTDA. CNPJ: 41.629.306/0001-99.
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }