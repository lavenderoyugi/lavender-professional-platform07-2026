export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-white dark:bg-black">
      <h1 className="text-5xl font-bold mb-6">
        Lavender Oyugi
      </h1>

      <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300 mb-8">
        Business Operations | Entrepreneurship | Process Improvement | Data & Digital Solutions
      </h2>

      <p className="max-w-3xl text-lg leading-8 mb-10">
        I transform ideas into practical solutions.
        <br /><br />
        My career has taken me from entrepreneurship and business development in Kenya
        to operations, retail, and data analytics in France.
        <br /><br />
        Today, my mission is to help organisations grow through efficient operations,
        better processes, data-informed decisions, and exceptional customer service.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button className="rounded-lg bg-black text-white px-6 py-3 hover:bg-gray-800">
          Download CV
        </button>

        <button className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          View Portfolio
        </button>

        <button className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          My Journey
        </button>

        <button className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          Contact
        </button>
      </div>
    </main>
  );
}