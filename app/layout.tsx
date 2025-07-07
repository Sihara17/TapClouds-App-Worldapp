// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import { MiniKitProvider } from "@worldcoin/minikit-react" // ✅ yang benar

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TapClouds - App",
  description: "Tap to earn points in this engaging clicker game",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider
          app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!}
          action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME!}
          signal=""
        >
          {children}
        </MiniKitProvider>
      </body>
    </html>
  )
}
