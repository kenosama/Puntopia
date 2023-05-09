import "@styles/global.css";
import Nav from "@components/Nav.jsx";
import Provider from "@components/Provider.jsx";
export const metadata = {
  title: "Puntopia",
  description: "Discover and Share Puns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
