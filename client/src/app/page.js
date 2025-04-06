export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Bienvenido a Post Manager
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Gestiona y publica tus notas de manera eficiente con nuestra
          plataforma.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 text-white bg-indigo-600 rounded-lg text-lg hover:bg-indigo-700 transition duration-300"
        >
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}
