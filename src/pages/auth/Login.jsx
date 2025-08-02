import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { loginFromControls } from "../../config";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFromData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login
        </h1>
      </div>
      <CommonForm
        formControls={loginFromControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFromData={setFromData}
        onSubmit={onSubmit}
      />
      <div className="w-full text-center">
        <p className="mt-2">
          Create new account ?
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
