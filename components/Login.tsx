import { FormEvent } from 'react'

const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }
  return (
    <form className="h-screen flex items-center justify-center" onSubmit={handleSubmit}>
      <div className="container flex flex-col md:flex-row items-center mx-auto p-5 md:px-8 lg:px-48">
        <input
          placeholder="Enter the password"
          className="md:w-3/4 w-full m-1 border border-current shadow rounded-md py-2 px-3 bg-black text-grey-500 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-green-500 focus:border-green-500"
          name="password"
          type="password"
        />
        <button className="flex-1 md:w-1/5 w-full m-1 border border-current shadow rounded-md py-2 px-3 bg-black text-grey-500 hover:bg-green-500 hover:text-black hover:border-green-500 focus:outline-none focus:bg-green-500 focus:text-black focus:border-green-500">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
