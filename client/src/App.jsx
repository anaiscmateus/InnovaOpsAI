import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-12 bg-black grid justify-center gap-4">
        <img
          src="/robot.svg"
          alt="robot-graphic"
          className="w-full max-w-[800px] h-auto"
        />
        <h1 className="text-4xl font-semibold text-white text-center">
          InnovaOpsAI
        </h1>
      </header>
      <main className="flex-grow px-6 pt-8 pb-12">
        <h2 className="text-xl font-semibold mb-4">Introducing InnovaOpsAI</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          quidem, in optio nobis eum consequatur et vero. Excepturi ea qui unde
          impedit animi tempore maxime asperiores ullam, quia minima nihil!
        </p>
        <ul className="space-y-4">
          <li>
            <h3 className="font-semibold">Lorem:</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              facilis fugiat itaque aliquid culpa fugit, repellendus placeat
              iure impedit eligendi! Eligendi nisi beatae modi deleniti
              molestias, dignissimos veritatis cum necessitatibus.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Ipsum:</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
              incidunt dolore eos illum ratione nulla, quam consectetur porro
              doloremque consequatur cum ut natus nihil eveniet minima, adipisci
              asperiores error magni.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Dolor:</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque non
              laboriosam, possimus nobis nesciunt eum quidem excepturi tempore
              quae veniam consectetur odit laudantium harum perferendis tenetur
              alias recusandae maxime distinctio.
            </p>
          </li>
        </ul>
      </main>
      <footer className="bg-black p-4 text-white text-center">
        © 2024 InnovaOpsAI - All rights reserved.
      </footer>
    </div>
  );
}

export default App;
