import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TERSIS — European Logistics',
      },
      {
        name: 'description',
        content:
          'TERSIS — Asset-based European carrier. 27+ modern Euro-6 vehicles. FTL/LTL transport across Europe and the Baltics since 2011.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Заменяем Google на Bunny Fonts — это решит проблему со скоростью в РФ */}
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
