export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-600">Klickshare</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          A platform where photographers can share photos with groups, and users
          can securely view & download them. Photographers can also subscribe to
          premium plans to grow their business.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>

      {/* Right Image */}
      <div className="flex justify-center">
        <img
          src="/images/hero.jpg"
          alt="Klickshare Hero"
          className="rounded-xl shadow-lg max-w-md w-full"
        />
      </div>
    </section>
  );
}
