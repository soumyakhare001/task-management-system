
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../App';
import { FiBookOpen } from "react-icons/fi";
import { Navigate, useNavigate } from 'react-router';
import { FaCheck } from "react-icons/fa";
function ShowTask() {
  const navigation = useNavigate();
  const [tasks, settasks] = useState([]);

  const gettask = async () => {
    try {
      const response = await axios.get(
        serverurl + "/api/alltask",
        { withCredentials: true }
      );

      settasks(response.data);
    } catch (error) {
      console.log(error.name, error.message);
    }
  };

  useEffect(() => {
    gettask();
  }, []);

  const DeleteHandeler = async (id) => {
    try {
      const deletetask = await axios.delete(serverurl + `/api/deletetask/${id}`, { withCredentials: true });
      console.log(deletetask);
    } catch (error) {
      console.log(error.name, error.message);
    }

  }

  const StatusHandeler = async (id) => {
    try {
      const taskstatus = await axios.patch(serverurl + `/api/status/${id}`, {}, { withCredentials: true });
      console.log(taskstatus);
      settasks((prevTasks)=>
        prevTasks.map((task)=>
          task._id===id?{...task,status:"completed"}:
          task
        )
      );

    } catch (error) {
      console.log(error.name, error.message);
    }

  }

  return (
    <div className="min-h-screen w-full bg-purple-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p>Your Workspace</p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              All Tasks
            </h1>
            <p className="text-sm sm:text-base">
              Every little steps takes you closer to your goals
            </p>
          </div>
          <form action="" onSubmit={(e) => { e.preventDefault(); navigation('/addTask') }}> <button type='submit' className="w-fit rounded-xl bg-purple-200 px-4 py-3 text-purple-800 hover:bg-purple-300 cursor-pointer">
            + Add New Task
          </button></form>

        </div>

        {/* Search */}
        <div className="my-6">
          <input
            type="text"
            placeholder="Search your task"
            className="w-full rounded-xl border border-purple-100 bg-white p-3 outline-none focus:border-purple-400"
          />
        </div>

        {/* Task List */}
        <div>
          <p className="mb-4 text-lg font-semibold">
            Your Task list
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex h-[360px] min-w-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg"
              >
                {/* Icon and Priority */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-purple-200">
                    <FiBookOpen
                      className="text-purple-600"
                      size={22}
                    />
                  </div>

                  <div className="max-w-[120px] rounded-xl bg-amber-100 px-3 py-2 text-center text-sm break-words">
                    {task.periority}
                  </div>
                </div>

                {/* Title */}
                <div className='flex min-w-0 items-start gap-2 justify-between'> <h2 className="line-clamp-2 break-words text-xl font-bold">
                  {task.TaskTittle}
                
                 

                </h2> 
                     {task.status === "completed" && (
                    <FaCheck className="shrink-0 text-xl text-green-500" />
                  )}
                  </div>


                <hr className="border-fuchsia-100" />

                {/* Description */}
                <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
                  <p className="line-clamp-4 break-words text-base text-[#5e5c5c]">
                    {task.discription}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
                  <button type='button' onClick={() => { StatusHandeler(task._id) }} className="min-h-[40px] flex-1 rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300 cursor-pointer">
                    Complete
                  </button>

                  <button onClick={()=>{navigation(`/edittask/${task._id}`)}} className="min-h-[40px] flex-1 rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300 cursor-pointer">
                    Edit
                  </button>

                  <button type='button' onClick={() => { DeleteHandeler(task._id) }} className="min-h-[40px] flex-1 rounded-xl bg-purple-200 px-2 py-2 text-sm text-purple-800 hover:bg-purple-300 cursor-pointer">
                    Delete
                  </button>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default ShowTask;
