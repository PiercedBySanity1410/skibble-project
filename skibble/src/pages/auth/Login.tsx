import { useState } from "react";
import User from "../../icons/User";
import View from "../../icons/View";
import ViewDisabled from "../../icons/ViewDisabled";
import { useNavigate } from "react-router";

interface FormState {
  username: string;
  password: string;
  errors: {
    username?: string;
    password?: string;
  };
  showPassword: boolean;
  isSubmitting: boolean;
  loginError: string| null;
}

function validateForm(state: FormState) {
  const errors: FormState['errors'] = {};

  if (!state.username.trim()) {
    errors.username = "Username is required.";
  } else if (/\s/.test(state.username)) {
    errors.username = "Spaces not allowed.";
  }

  if (!state.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
}

function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
    errors: {},
    showPassword: false,
    isSubmitting: false,
    loginError: null,
  });

  const { username, password, errors, showPassword, isSubmitting, loginError } = formState;

  const updateField = (field: keyof Omit<FormState, 'errors' | 'showPassword' | 'isSubmitting' | 'loginError'>, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: "" },
      loginError: null,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setFormState((prev) => ({ ...prev, errors: validationErrors }));
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, loginError: null }));

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("jwt_token", data.access_token);
        localStorage.setItem("current_user_data",JSON.stringify(data.user_data));
        navigate("/chat");
      } else {
        setFormState((prev) => ({ ...prev, loginError: data.message }));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="auth-wrapper">
      <h4>Login</h4>
      <h6>
        Don’t have an Account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </h6>

      {loginError && <p>{loginError}</p>}
      {isSubmitting && <p className="wait">Please Wait...</p>}

      {/* Username Field */}
      <div className="input-wrapper">
        <div className="input-label">
          <h5>Username</h5>
          <p>{errors.username}</p>
        </div>
        <div className="input-container">
          <User size={16} color="var(--grey)" />
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => updateField("username", e.target.value)}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="input-wrapper">
        <div className="input-label">
          <h5>Password</h5>
          <p>{errors.password}</p>
        </div>
        <div className="input-container">
          <div
            className="svg-wrap"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                showPassword: !prev.showPassword,
              }))
            }
          >
            {showPassword ? (
              <View size={16} color="var(--grey)" />
            ) : (
              <ViewDisabled size={16} color="var(--grey)" />
            )}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => updateField("password", e.target.value)}
          />
        </div>
      </div>

      <div className="button-wrapper">
        <div onClick={handleSubmit} className={`submit ${isSubmitting ? "disabled" : ""}`}>
          {isSubmitting ? "Logging in..." : "Login"}
        </div>
      </div>
    </div>
  );
}

export default Login;
