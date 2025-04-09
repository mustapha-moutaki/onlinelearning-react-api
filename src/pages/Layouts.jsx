import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
            <li><Link to="/courses" className="hover:text-blue-600">Courses</Link></li>
            <li><Link to="/tags" className="hover:text-blue-600">Tags</Link></li> 
          </ul>
        </nav>
      </header>


      <main className="min-h-[80vh]">
        <Outlet />
      </main>


      <footer className="bg-gray-100 text-center py-6 mt-10 border-t">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </>
  );
}