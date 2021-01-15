import { useForm } from 'react-hook-form';

interface LoginProps {
  status: 'loading' | 'error' | null;
  onLoginTry: (pwd: string) => void;
}

interface FormModel {
  password: string;
}

const Login = ({ status, onLoginTry }: LoginProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormModel) => {
    onLoginTry(data.password);
  };

  return (
    <div>
      <form
        className="h-screen flex items-center justify-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="container flex flex-col md:flex-row items-center mx-auto p-5 md:px-8 lg:px-48">
          <input
            ref={register}
            name="password"
            type="password"
            placeholder="Enter the password"
            className="md:w-4/5 w-full m-1 border border-current shadow rounded-md py-2 px-3 bg-black text-grey-500 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-green-500 focus:border-green-500"
          />
          <button className="flex-1 md:w-1/5 w-full m-1 border border-current shadow rounded-md py-2 px-3 bg-black text-grey-500 hover:bg-green-500 hover:text-black hover:border-green-500 focus:outline-none focus:bg-green-500 focus:text-black focus:border-green-500">
            {status === 'loading' ? 'Loading...' : 'Submit'}
          </button>
        </div>
        <div className={`text-red-500 ${status !== 'error' && 'invisible'}`}>
          Try Again.
        </div>
      </form>
    </div>
  );
};

export default Login;
