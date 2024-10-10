import Panel from "../components/panels/Panel";

const Dashboard = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-4/5 opacity-60 -z-10"
        style={{
          backgroundImage:
            "url(https://hospitalcruzrojacordoba.es/wp-content/uploads/2019/05/Alimentacion-saludable-contra-la-obesidad.jpg.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
        {/* Content Container */}
        <div className="w-full max-w-4xl mt-40">
          {/* Titles */}
          <h1
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase", // Ensure the text is all caps
            }}
            className="text-6xl font-semibold text-gray-800 mb-6 text-left"
          >
            Welcome to the Admin Panel
          </h1>
          <p
            style={{ fontFamily: "Comfortaa" }}
            className="text-2xl text-gray-700 mb-10 text-left"
          >
            From here you can manage clients and the company's database.
          </p>

          {/* Responsive Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Panel title="Panel 1" content="Panel 1 information" />
            <Panel title="Panel 2" content="Panel 2 information" />
            <Panel title="Panel 3" content="Panel 3 information" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
