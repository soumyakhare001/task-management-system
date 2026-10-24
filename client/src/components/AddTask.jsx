
import axios from "axios";
import { useState } from "react";
import { serverurl } from "../App";
import { useNavigate } from "react-router";

function AddTask() {
  const navigate = useNavigate();

  const [TaskTittle, settittle] = useState("");
  const [discription, setdicription] = useState("");
  const [subject, setsubject] = useState("");
  const [periority, setperiority] = useState("medium");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const AddTaskHandeler = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!TaskTittle.trim()) {
      setErrorMessage("Please enter a task title.");
      return;
    }

    if (TaskTittle.trim().length > 100) {
      setErrorMessage("Task title cannot exceed 100 characters.");
      return;
    }

    if (discription.length > 200) {
      setErrorMessage("Description cannot exceed 200 characters.");
      return;
    }

    try {
      setSaving(true);

      await axios.post(
        `${serverurl}/api/addtask`,
        {
          TaskTittle: TaskTittle.trim(),
          discription: discription.trim(),
          subject: subject.trim(),
          periority,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/show");
    } catch (error) {
      console.error(
        "Add task error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        setErrorMessage("Your session may have expired. Please log in again.");
      } else {
        setErrorMessage(
          error.response?.data?.message ||
          "Unable to create task. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5edff] flex items-center justify-center p-5">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_15px_50px_rgba(90,60,150,0.12)]">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#816bf1] to-[#a78bfa] px-8 py-8 sm:px-10">
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 right-24 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative z-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-sm backdrop-blur-sm">
              ✨
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create a New Task
            </h1>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/85 sm:text-base">
              One small step at a time. Add a task and make today count! 💜
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={AddTaskHandeler}
          className="space-y-6 px-6 py-8 sm:px-10"
        >
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
              required
              maxLength={100}
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
              rows={4}
              maxLength={200}
              placeholder="Add a few details about what you want to accomplish..."
              value={discription}
              onChange={(e) => setdicription(e.target.value)}
              className="w-full resize-none rounded-xl border border-[#e8e2f5] bg-[#fcfaff] px-4 py-3.5 text-sm text-[#30284b] outline-none transition placeholder:text-[#aaa2bd] focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
            />

            <p className="mt-1 text-right text-xs text-[#9689b1]">
              {discription.length}/200
            </p>
          </div>

          {/* Subject and Priority */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-[#30284b]"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                maxLength={100}
                placeholder="e.g. Data Structures & Algorithms"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
                className="w-full rounded-xl border border-[#e8e2f5] bg-[#fcfaff] px-4 py-3.5 text-sm text-[#30284b] outline-none transition placeholder:text-[#aaa2bd] focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
              />
            </div>

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-[#30284b]"
              >
                Task Priority
              </label>

              <select
                id="priority"
                value={periority}
                onChange={(e) => setperiority(e.target.value)}
                className="w-full rounded-xl border border-[#e8e2f5] bg-[#fcfaff] px-4 py-3.5 text-sm text-[#6d6486] outline-none transition focus:border-[#927cf5] focus:ring-4 focus:ring-[#927cf5]/10"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>
          </div>

          {/* Reminder */}
          <div className="flex items-start gap-3 rounded-xl border border-[#eee7ff] bg-[#f8f5ff] p-4">
            <span className="text-xl">💡</span>

            <div>
              <p className="text-sm font-semibold text-[#5c46a5]">
                A little reminder
              </p>

              <p className="mt-1 text-xs leading-5 text-[#82779e]">
                Break big goals into smaller tasks. Every completed task is progress!
              </p>
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#f0ebf8] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={() => navigate("/show")}
              className="rounded-xl border border-[#e8e2f5] px-6 py-3 text-sm font-semibold text-[#766b91] transition hover:bg-[#f8f5ff] disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-[#816bf1] to-[#9b83fa] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#816bf1]/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#816bf1]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Creating..." : "+ Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
