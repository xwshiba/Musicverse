import type { Metadata } from "next";

export const metadata : Metadata = {
    title: 'Musicverse',
    description: `Musicverse is a social platform that allows users 
    to keep track of all the music users would like to save and 
    grow their passion for music with other users. `,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
};
