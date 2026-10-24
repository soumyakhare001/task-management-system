
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../App';
import { FiBookOpen } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function ShowTask() {
  const navigation = useNavigate();

  const [tasks, settasks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const gettask = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const response = await axios.get(
        `${serverurl}/api/alltask`,
        { withCredentials: true }
      );

      if (Array.isArray(response.data)) {
        settasks(response.data);
      } else if (
        response.data &&
        typeof response.data === 'object' &&
        typeof response.data.message === 'string' &&
        response.data.message.toLowerCase().includes('do not have any task')
      ) {
        // The backend uses a message to indicate an empty task list.
        settasks([]);
        setErrorMessage('');
      } else {
        console.error('Unexpected tasks response:', response.data);
        settasks([]);
        setErrorMessage('Unable to read your task list. Please try again.');
      }
    } catch (error) {
      console.error(
        'Fetch tasks error:',
        error.response?.data || error.message
      );

      settasks([]);

      if (error.response?.status === 401) {
        setErrorMessage('Please log in to view your tasks.');
      } else {
        setErrorMessage(
          error.response?.data?.message ||
          'Unable to load tasks. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gettask();
  }, []);

  const DeleteHandeler = async (id) => {
    try {
      await axios.delete(
        `${serverurl}/api/deletetask/${id}`,
        { withCredentials: true }
      );

      settasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error(
        'Delete task error:',
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        'Unable to delete task.'
      );
    }
  };

  const StatusHandeler = async (id) => {
    try {
      const response = await axios.patch(
        `${serverurl}/api/status/${id}`,
        {},
        { withCredentials: true }
      );

      const updatedTask = response.data;

      if (
        updatedTask &&
        typeof updatedTask === 'object' &&
        updatedTask._id
      ) {
        settasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, ...updatedTask } : task
          )
        );
      } else {
        await gettask();
      }
    } catch (error) {
      console.error(
        'Update status error:',
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        'Unable to update task status.'
      );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const query = search.trim().toLowerCase();

    return (
      String(task.TaskTittle || '').toLowerCase().includes(query) ||
      String(task.discription || '').toLowerCase().includes(query) ||
      String(task.periority || '').toLowerCase().includes(query) ||
      String(task.status || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen w-full bg-purple-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p>Your Workspace</p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              All Tasks
            </h1>
            <p className="text-sm sm:text-base">
              Every little step takes you closer to your goals
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigation('/home')}
              className="w-fit cursor-pointer rounded-xl bg-purple-200 px-4 py-3 text-purple-800 hover:bg-purple-300"
            >
              ← Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigation('/addTask')}
              className="w-fit cursor-pointer rounded-xl bg-purple-200 px-4 py-3 text-purple-800 hover:bg-purple-300"
            >
              + Add New Task
            </button>
          </div>
        </div>

        <div className="my-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, priority or status"
            aria-label="Search tasks"
            className="w-full rounded-xl border border-purple-100 bg-white p-3 outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <p className="mb-4 text-lg font-semibold">
            Your Task List ({filteredTasks.length})
          </p>

          {loading ? (
            <p className="rounded-xl bg-white p-6 text-center text-gray-500">
              Loading your tasks...
            </p>
          ) : errorMessage ? (
            <div className="rounded-xl bg-white p-6 text-center">
              <p className="text-red-600">{errorMessage}</p>
              <button
                type="button"
                onClick={gettask}
                className="mt-4 cursor-pointer rounded-xl bg-purple-200 px-4 py-2 text-purple-800 hover:bg-purple-300"
              >
                Try Again
              </button>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-gray-500">
              <p>You do not have any task.</p>
              <button
                type="button"
                onClick={() => navigation('/addTask')}
                className="mt-4 cursor-pointer rounded-xl bg-purple-200 px-4 py-2 text-purple-800 hover:bg-purple-300"
              >
                + Add Task
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-center text-gray-500">
              No tasks match your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex h-[360px] min-w-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-purple-200">
                      <FiBookOpen className="text-purple-600" size={22} />
                    </div>
                    <div className="max-w-[120px] break-words rounded-xl bg-amber-100 px-3 py-2 text-center text-sm">
                      {task.periority || 'No priority'}
                    </div>
                  </div>

                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <h2 className="line-clamp-2 break-words text-xl font-bold">
                      {task.TaskTittle || 'Untitled task'}
                    </h2>

                    {String(task.status || '').trim().toLowerCase() === 'completed' && (
                      <FaCheck
                        className="shrink-0 text-xl text-green-500"
                        aria-label="Completed"
                      />
                    )}
                  </div>

                  <hr className="border-fuchsia-100" />

                  <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
                    <p className="line-clamp-4 break-words text-base text-[#5e5c5c]">
                      {task.discription || 'No description provided.'}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => StatusHandeler(task._id)}
                      className="min-h-[40px] flex-1 cursor-pointer rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300"
                    >
                      {String(task.status || '').trim().toLowerCase() === 'completed'
                        ? 'Update Status'
                        : 'Complete'}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigation(`/edittask/${task._id}`)}
                      className="min-h-[40px] flex-1 cursor-pointer rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => DeleteHandeler(task._id)}
                      className="min-h-[40px] flex-1 cursor-pointer rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowTask;
