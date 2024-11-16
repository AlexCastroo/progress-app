export default function AppLayout({ children }) {
    return (
        // estrcutura de una pagina web con menu y contenedor principal tanilwindcss
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white">
                <div className="container inline-blocks align-middle mx-auto p-4">
                    <h1 className="text-2xl font-boldalign-middle">My Total App</h1>
                    <h5 className="text-xs font-light">Created by Alex Castro</h5>
                </div>
            </header>
            <main className="container mx-auto p-4 flex-1">
                {children}
            </main>
            <footer className="bg-gray-800 text-white text-xs font-extralight">
                <div className="container mx-auto p-4">
                    <p>My App &copy; 2024</p>
                </div>
            </footer>
        </div>
    )
}