import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFromControls } from "../../config";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFromData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControls={registerFromControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFromData={setFromData}
        onSubmit={onSubmit}
      />
      <div className="w-full text-center">
        <p className="mt-2">
          Already have account ?
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
