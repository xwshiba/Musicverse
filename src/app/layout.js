export const metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Musicverse</title>
                <meta name="description" content="Web site created..." />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
}