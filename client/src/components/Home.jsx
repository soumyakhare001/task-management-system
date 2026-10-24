
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { serverurl } from "../App";
import { FiBookOpen } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the latest tasks from the existing API
  const getTasks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${serverurl}/api/alltask`,
        { withCredentials: true }
      );

      // Same response structure as ShowTask.jsx
      if (Array.isArray(response.data)) {
        setTasks(response.data);
        setError("");
      } else {
        setTasks([]);
        setError("Unexpected task data received from server.");
      }
    } catch (err) {
      console.error(
        "Fetch tasks failed:",
        err.response?.data || err.message
      );
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch whenever the dashboard route becomes active
  useEffect(() => {
    if (location.pathname === "/home") {
      getTasks();
    }
  }, [location.pathname, getTasks]);

  // Match the status saved by the backend completeTask controller
  const isCompleted = (task) =>
    String(task.status ?? "").trim().toLowerCase() === "completed";

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(isCompleted).length;
  const pendingTasks = tasks.filter((task) => !isCompleted(task)).length;

  // Show only pending High and Medium priority tasks
  const priorityTasks = tasks
    .filter(
      (task) =>
        !isCompleted(task) &&
        ["high", "medium"].includes(
          String(task.periority ?? "").trim().toLowerCase()
        )
    )
    .sort((a, b) => {
      const priority = { high: 0, medium: 1 };
      return (
        priority[String(a.periority).trim().toLowerCase()] -
        priority[String(b.periority).trim().toLowerCase()]
      );
    })
    .slice(0, 5);

  const summaryCards = [
    {
      title: "Total Tasks",
      count: totalTasks,
      icon: <FiBookOpen size={22} />,
      style: "bg-violet-100 text-violet-700",
    },
    {
      title: "Pending Tasks",
      count: pendingTasks,
      icon: <span className="text-2xl">◷</span>,
      style: "bg-amber-100 text-amber-700",
    },
    {
      title: "Completed Tasks",
      count: completedTasks,
      icon: <FaCheck size={22} />,
      style: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9ff] px-4 py-7 text-[#292443] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[2px] text-violet-500">
              YOUR PERSONAL STUDY SPACE
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Welcome back! <span className="text-violet-500">✦</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              A little progress every day adds up.
            </p>
          </div>

          <button
            onClick={() => navigate("/addTask")}
            className="self-start rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 sm:self-auto"
          >
            + Add Task
          </button>
        </header>

        {/* Summary Cards */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
            >
              <div
                className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${card.style}`}
              >
                {card.icon}
              </div>

              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="mt-1 text-3xl font-bold">{card.count}</h2>
            </article>
          ))}
        </section>

        {/* Focus List */}
        <section className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Your Focus List{" "}
                <span className="text-violet-500">✧</span>
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your high and medium priority tasks
              </p>
            </div>

            <button
              onClick={() => navigate("/show")}
              className="self-start rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
            >
              View All Tasks →
            </button>
          </div>

          {loading ? (
            <p className="py-10 text-center text-gray-500">
              Loading tasks...
            </p>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-red-500">{error}</p>
              <button
                onClick={getTasks}
                className="mt-3 rounded-lg bg-violet-100 px-4 py-2 text-violet-700"
              >
                Try Again
              </button>
            </div>
          ) : priorityTasks.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-4xl">🌷</p>
              <h3 className="mt-3 font-semibold">
                No pending high or medium priority tasks
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your focus list will show your next priorities here.
              </p>
            </div>
          ) : (
            <div>
              {priorityTasks.map((task) => {
                const isHigh =
                  String(task.periority).trim().toLowerCase() === "high";

                return (
                  <div
                    key={task._id}
                    className="flex items-center gap-3 border-b border-gray-100 px-1 py-5 sm:gap-4"
                  >
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${
                        isHigh ? "bg-rose-400" : "bg-amber-400"
                      }`}
                    />

                    <button
                      onClick={() => navigate(`/edittask/${task._id}`)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="block truncate text-sm font-semibold text-gray-800">
                        {task.TaskTittle}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {task.subject || "General"}
                      </span>
                    </button>

                    <span
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize ${
                        isHigh
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {task.periority}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => navigate("/show")}
            className="mt-6 w-full rounded-xl border border-dashed border-violet-300 bg-violet-50/70 px-4 py-3 font-semibold text-violet-700 transition hover:bg-violet-100"
          >
            View All Tasks →
          </button>
        </section>

        <footer className="py-7 text-center text-xs text-gray-400">
          Made for your little wins{" "}
          <span className="text-violet-400">♡</span>
        </footer>
      </div>
    </main>
  );
}

export default Home;
