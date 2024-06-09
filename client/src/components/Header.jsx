// Header.jsx
function Header() {
  return (
    <header className="py-12 bg-black grid justify-center gap-4" role="banner">
      <img
        src="/robot.svg"
        alt="robot-graphic"
        className="w-full max-w-[800px] h-auto"
      />
      <h1
        className="text-4xl font-semibold text-white text-center"
        role="heading"
      >
        OptimOps.ai
      </h1>
    </header>
  );
}

export default Header;
