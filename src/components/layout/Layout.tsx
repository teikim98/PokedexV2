// src/components/layout/Layout.tsx
import { ReactNode } from 'react'
import Header from '../common/Header'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}

export default Layout