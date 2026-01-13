import FooterComponent from './components/footer.jsx';
import Header from './components/header.jsx';
import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#11151c]">
      <Header />
      <main className="flex-grow flex flex-col p-6 text-white">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
}

