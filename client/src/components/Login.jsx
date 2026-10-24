
import { useState } from 'react';
import { serverurl } from '../App';
import studyImg from '../assets/studyImg.png';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
  const navigate=useNavigate();
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const Loginhandeler=async(e)=>{
  e.preventDefault();
   try {
      const user=await axios.post(serverurl+'/api/login',{email,password},{withCredentials: true})
      console.log(user);
      navigate('/home');
    } catch (error) {
      console.log(error.name,error.message);
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
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Form Panel */}
        <div className="flex w-full flex-col justify-center gap-4 p-6 sm:p-10 md:w-1/2 md:p-8 lg:p-12">

          {/* Heading */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold leading-tight text-[#252525] sm:text-4xl">
              Login To Your Account
            </h1>

            <p className="mt-3 text-base leading-relaxed text-[#777777] sm:text-lg">
              “Welcome back! Every small step brings you closer to your goals.” ✨
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#383838] sm:text-base"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-[#e5e1e1] bg-[#fdfcfd] px-4 text-base outline-none placeholder:text-[#999999] focus:border-[#b9b0c9] focus:ring-2 focus:ring-[#b9b0c9]/20"
         value={email}  onChange={(e)=>setemail(e.target.value)} />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#383838] sm:text-base"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-[#e5e1e1] bg-[#fdfcfd] px-4 text-base outline-none placeholder:text-[#999999] focus:border-[#b9b0c9] focus:ring-2 focus:ring-[#b9b0c9]/20"
       value={password}  onChange={(e)=>setpassword(e.target.value)}      />
          </div>

          {/* Login Button - UI Only */}
            <form action="" onSubmit={Loginhandeler}>
              <button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-[#816bf1] text-base font-semibold text-white shadow-sm shadow-[#816bf1]/20 hover:bg-[#725be0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#816bf1]"
          >
            Login
          </button>
            </form>
          

          {/* Signup Link - UI Only */}
          <p className="text-center text-sm text-[#777777]">
            Don't have an account?{' '}
            <span className="font-semibold text-[#725be0] underline-offset-4 hover:underline cursor-pointer">
              <a href="/signin" className="font-semibold text-[#725be0] underline-offset-4 hover:underline">Sign Up</a>  
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;