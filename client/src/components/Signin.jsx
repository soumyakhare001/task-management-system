import { useState } from 'react';
import studyImg from '../assets/studyImg.png'
import axios from 'axios';
import { serverurl } from '../App';
import { useNavigate } from 'react-router';

function Signin() {
  const navigate = useNavigate();
  const [Username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Siginhandler = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(serverurl + '/api/signin', { Username, email, password }, { withCredentials: true });
      console.log(user)

      navigate('/home');

    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div className="min-h-screen bg-[#f5edff] flex items-center justify-center p-3 sm:p-6">

      {/* Main Card */}
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_35px_rgba(0,0,0,0.08)] md:min-h-[650px] md:flex-row">

        {/* Left Image Panel */}
        <div
          className="relative hidden min-h-[300px] bg-cover bg-center bg-no-repeat sm:block md:min-h-[650px] md:w-1/2"
          style={{ backgroundImage: `url(${studyImg})` }}
        >
          {/* Soft overlay for a polished look */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Form Panel */}
        <div className="flex w-full flex-col justify-center gap-4 p-6 sm:p-10 md:w-1/2 md:p-8 lg:p-12">

          <div className="mb-2">
            <h1 className="text-3xl font-bold leading-tight text-[#252525] sm:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-3 text-base leading-relaxed text-[#777777] sm:text-lg">
              Join us and start managing your tasks the smart way.
            </p>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-semibold text-[#383838] sm:text-base">
              User name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your User name"
              autoComplete="name"
              className="h-12 w-full rounded-xl border border-[#e5e1e1] bg-[#fdfcfd] px-4 text-base outline-none placeholder:text-[#999999] focus:border-[#b9b0c9] focus:ring-2 focus:ring-[#b9b0c9]/20"
              value={Username} onChange={(e) => setusername(e.target.value)} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#383838] sm:text-base">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-[#e5e1e1] bg-[#fdfcfd] px-4 text-base outline-none placeholder:text-[#999999] focus:border-[#b9b0c9] focus:ring-2 focus:ring-[#b9b0c9]/20"
              value={email} onChange={(e) => setemail(e.target.value)} />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-[#383838] sm:text-base">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-[#e5e1e1] bg-[#fdfcfd] px-4 text-base outline-none placeholder:text-[#999999] focus:border-[#b9b0c9] focus:ring-2 focus:ring-[#b9b0c9]/20"
              value={password} onChange={(e) => setpassword(e.target.value)} />
          </div>

          {/* Sign Up Button */}
          <form action="" onSubmit={Siginhandler}>
            <button
              type="submit"
              className="mt-2 h-12 w-full rounded-xl bg-[#816bf1] text-base font-semibold text-white shadow-sm shadow-[#816bf1]/20 hover:bg-[#725be0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#816bf1]"
            >
              Sign Up
            </button>
          </form>


          <p className="text-center text-sm text-[#777777]">
            Already have an account?{''}
            <a href="/login" className="font-semibold text-[#725be0] underline-offset-4 hover:underline">
              Sign in
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signin