import './globals.css';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import GlobalDataContext from '@/contexts/global-data';

export const metadata = {
  title: 'Do you wantto burn your rug NFT’s',
  description: 'and get a chance to start again?',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className="mobile-warning">
            <Image src="/logo.svg" width={250} height={19} alt="logo" className="logo" />
            <Image src="/mob-execute.svg" width={205} height={205} alt="mob-xecute" className="mob-xecute" />
            This site is only accessible from a PC
          </div>
          <GlobalDataContext>
            <main>
              <Header />
              {children}
            </main>
            <Footer />
          </GlobalDataContext>
      </body>
    </html>
  )
}
