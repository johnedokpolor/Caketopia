import React, { useState } from "react";
import Logo from "../assets/bmalogo.jpg";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        text: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
        width: "300",
        timerProgressBar: true,
        position: "top-right",
      }).then(() => {
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setLogin(true);
        navigate("/");
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        text: "Login Error",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        icon: "error",
      });
      setLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (data) => {
          try {
            setDoc(doc(db, "Users", data.user.uid), {
              email: data.user.email,
              name: name,
              password: password,
            });
            Swal.fire({
              text: "Sign Up Successful",
              showConfirmButton: false,
              timer: 1000,
              width: "300",

              timerProgressBar: true,
              position: "top-right",
            }).then(() => {
              setLoading(false);
              setName("");
              setEmail("");
              setPassword("");
              setLogin(true);
            });
          } catch (error) {
            Swal.fire({
              text: "Unknown Error",
              showConfirmButton: false,
              timer: 1000,
              width: "200",
              timerProgressBar: true,
            });
          }
          console.log(data);
        },
      );
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        text: "Unknown Error",
        showConfirmButton: false,
        timer: 1000,
        width: "200",
        timerProgressBar: true,
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="dark flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-[85%] max-w-[400px]">
        <img className="w-16 rounded-full" src={Logo} alt="" />
        <h1 className="title mt-3 text-[45px]">Beema</h1>
        <p className="mt-2">
          <span className="opacity-70">
            {login ? "Don't have an account?" : "Already have an account?"}
          </span>

          <span
            onClick={() => {
              setLoading(false);
              setLogin((prev) => !prev);
            }}
            className="pl-[5px] text-[#4b90ff] md:cursor-pointer"
          >
            {login ? "Sign Up" : "Login"}
          </span>
        </p>
        <form onSubmit={login ? handleLogin : handleRegister}>
          {!login && (
            <div>
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              id="email"
              placeholder="johndoe@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="*****"
              required
            />
          </div>
          {!login && (
            <p className="mt-8 text-center text-sm">
              By signing up, you agree to our
              <span className="mx-[4px] underline md:cursor-pointer">
                Terms of Use
              </span>
              and
              <span className="mx-[4px] underline md:cursor-pointer">
                Privacy Policy.
              </span>
            </p>
          )}
          <button className="mx-auto mt-6 w-full rounded-md bg-[#386bbd] p-2">
            {loading ? (
              <ImSpinner9 className="mx-auto animate-spin" />
            ) : (
              <p>{login ? "Login" : "Sign Up"}</p>
            )}
          </button>
        </form>
      </div>
      <p className="mt-5 hidden text-center md:block">Made with 💓 by GLtech</p>
    </div>
  );
};

export default Auth;
