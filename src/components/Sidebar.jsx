function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-8">Greeshmanth</h2>

      <nav className="space-y-4 text-gray-600">
        <p className="hover:text-black cursor-pointer">Welcome</p>
        <p className="hover:text-black cursor-pointer">Projects</p>
        <p className="hover:text-black cursor-pointer">Skills</p>
        <p className="hover:text-black cursor-pointer">How I Think</p>
        <p className="hover:text-black cursor-pointer">Contact</p>
      </nav>
    </aside>
  );
}

export default Sidebar;
