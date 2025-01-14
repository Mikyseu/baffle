import { logger } from '../utils';

import logic from '../logic';

import { useContext } from '../context.js';

function Register({ onUserRegistered, onLoginClick }) {
  const { showFeedback } = useContext();

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;

    try {
      logic
        .registerUser(name, email, username, password)
        .then(() => {
          form.reset();

          onUserRegistered();
        })
        .catch(error => showFeedback(error, 'error'));
    } catch (error) {
      showFeedback(error);
    }
  };

  const handleLoginClick = event => {
    event.preventDefault();

    onLoginClick();
  };

  logger.debug('Register -> render');

  return (
    <main className="flex justify-center items-center h-screen bg-[#1B1F47]">
      <div>
        <div className="flex justify-center items-center">
          <img
            className="w-[200px] absolute top-20 animate-fade-down animate-once animate-duration-[1500ms]"
            src="../../public/Logo-letras-blanco.png"
            alt="BAFFLE"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-10"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-white mb-1">
              Name
            </label>
            <input type="text" id="name" className="rounded-lg px-2 py-1" />

            <label htmlFor="email" className="text-white mb-1 mt-2">
              E-mail
            </label>
            <input type="email" id="email" className="rounded-lg px-2 py-1" />

            <label htmlFor="username" className="text-white mb-1 mt-2">
              Username
            </label>
            <input id="username" className="rounded-lg px-2 py-1" />

            <label htmlFor="password" className="text-white mb-1 mt-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg px-2 py-1"
            />
          </div>

          <button
            className="bg-[#4C5D8B] hover:bg-[#6B99C3] animate-jump animate-once text-white font-bold py-2 px-4 rounded mt-2 w-full"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      <div className="fixed bottom-8 items-center">
        <a
          href=""
          onClick={handleLoginClick}
          className="text-[#F7C815] mt-2 font-bold"
        >
          Login
        </a>
      </div>
    </main>
  );
}

export default Register;
