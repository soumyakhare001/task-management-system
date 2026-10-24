import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FiEdit3,
  FiArrowLeft,
  FiSave,
  FiBookOpen,
  FiFlag,
} from "react-icons/fi";
import axios from "axios";
import { serverurl } from "../App";

function EditTask() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [TaskTittle, settittle] = useState("");
  const [discription, setdisription] = useState("");
  const [subject, setsubject] = useState("");
  const [periority, setperiority] = useState("medium");



  const UpdateHandeler = async (e) => {
    e.preventDefault();

    if (!TaskTittle.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!id) {
      alert("Task ID missing. Editing cannot continue yet.");
      return;
    }

    try {
      const response = await axios.patch(
        `${serverurl}/api/update/${id}`,
        {
          TaskTittle,
          discription,
          subject,
          periority,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/show");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Unable to update task.");
    }
  };
  return (
    <div className="min-h-screen bg-[#f5edff] px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/show")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#766b91] transition hover:text-violet-600"
        >
          <FiArrowLeft size={18} />
          Back to All Tasks
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_15px_50px_rgba(90,60,150,0.12)]">

          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#816bf1] to-[#a78bfa] px-8 py-8 sm:px-10">
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 right-24 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative z-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl text-white shadow-sm backdrop-blur-sm">
                <FiEdit3 size={27} />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-white/75">
                Refine your plans
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Edit Your Task
              </h1>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/85 sm:text-base">
                Plans can change, and that's okay. Make your task work for you. 💜
              </p>
            </div>
          </div>

          {/* Form UI */}
          <div className="space-y-6 px-6 py-8 sm:px-10">

            {/* Task Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#30284b]"
              >
                Task Title <span className="text-[#816bf1]">*</span>
              </label>

              <input
                id="title"
                type="text"
                placeholder="e.g. Complete React assignment"
                value={TaskTittle}
                onChange={(e) => settittle(e.target.value)}
                className="w-full rounded-xl border border-[#e8e2f5] bg-[#fcfaff] px-4 py-3.5 text-sm text-[#30284b] outline-none transition placeholder:text-[#aaa2bd] focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#30284b]"
              >
                Description
                <span className="ml-2 font-normal text-[#aaa2bd]">
                  (Optional)
                </span>
              </label>

              <textarea
                id="description"
                rows="4"
                maxLength={200}
                placeholder="Update the details of your task..."
                value={discription}
                onChange={(e) => setdisription(e.target.value)}
                className="w-full resize-none rounded-xl border border-[#e8e2f5] bg-[#fcfaff] px-4 py-3.5 text-sm text-[#30284b] outline-none transition placeholder:text-[#aaa2bd] focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
              /><p>{discription.length}/200</p>
            </div>

            {/* Subject and Priority */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-[#30284b]"
                >
                  Subject
                </label>

                <div className="relative">
                  <FiBookOpen
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a78bfa]"
                  />

                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Data Structures"
                    value={subject}
                    onChange={(e) => setsubject(e.target.value)}
                    className="w-full rounded-xl border border-[#e8e2f5] bg-[#fcfaff] py-3.5 pl-11 pr-4 text-sm text-[#30284b] outline-none transition placeholder:text-[#aaa2bd] focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-semibold text-[#30284b]"
                >
                  Task Priority
                </label>

                <div className="relative">
                  <FiFlag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a78bfa]"
                  />

                  <select
                    id="priority"
                    value={periority}
                    onChange={(e) => setperiority(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#e8e2f5] bg-[#fcfaff] py-3.5 pl-11 pr-4 text-sm text-[#6d6486] outline-none transition focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reminder */}
            <div className="flex items-start gap-3 rounded-xl border border-[#eee7ff] bg-[#f8f5ff] p-4">
              <span className="text-xl">💡</span>

              <div>
                <p className="text-sm font-semibold text-[#5c46a5]">
                  Keep moving forward
                </p>

                <p className="mt-1 text-xs leading-5 text-[#82779e]">
                  Update your priorities as you grow. Your plan should support your progress, not limit it.
                </p>
              </div>
            </div>

            {/* Buttons — UI Only */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#f0ebf8] pt-6 sm:flex-row sm:justify-end">
              <form
                onSubmit={UpdateHandeler}
                className="space-y-6 px-6 py-8 sm:px-10"
              >
                {/* Tumhare saare existing input fields aur reminder yahin rahenge */}

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#f0ebf8] pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/show")}
                    className="rounded-xl border border-[#e8e2f5] px-6 py-3 text-sm font-semibold text-[#766b91] transition hover:bg-[#f8f5ff]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#816bf1] to-[#9b83fa] px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                  >
                    <FiSave size={17} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#9689b1]">
          Small improvements lead to big achievements. ✨
        </p>
      </div>
    </div>
  );
}

export default EditTask;