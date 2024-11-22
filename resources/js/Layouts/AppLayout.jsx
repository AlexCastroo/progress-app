export default function AppLayout({ children }) {
    return (
        <html lang="en" className="h-full">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
                <title>Document</title>
            </head>
            <body className="h-full flex flex-col">
                <header className="bg-slate-800 text-white">
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold">My Total App</h1>
                        <h5 className="text-xs font-light">Created by Alex Castro</h5>
                    </div>
                </header>
                <main className="container h-auto mx-auto p-4 flex-1">
                    {children}
                </main>
            </body>
            <footer className="absolute bottom-0 w-full bg-slate-800 text-white text-xs font-extralight">
                <div className="container mx-auto p-4">
                    <p>My App &copy; 2024</p>
                </div>
            </footer>
        </html>
    )
}