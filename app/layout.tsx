import '@/app/dashboard/global.css';

import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: [
    {
      path: './fonts/AllRoundGothic/Book.otf',
      weight: '300',
    },
    {
      path: './fonts/AllRoundGothic/Medium.otf',
      weight: '400',
    },
    {
      path: './fonts/AllRoundGothic/Bold.otf',
      weight: '700',
    },
  ],
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body className={`${myFont.className}`}>{children}</body>
    </html>
  );
}
