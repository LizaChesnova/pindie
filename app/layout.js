
import "./globals.css";



export const metadata = {
  title: "Pindie",
  description: "Портал инди-игр от студентов Яндекс Практикума",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header>{/*Содержание шапки*/}</header>
        {children}
        <footer>{/*Содержание подвала */}</footer>
      </body>
    </html>
  );
}
