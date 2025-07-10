import { useState } from "react";
import Camera from "../../icons/Camera";
import User from "../../icons/User";
import View from "../../icons/View";
import ViewDisabled from "../../icons/ViewDisabled";
import { useNavigate } from "react-router";

interface FormState {
  username: string;
  first: string;
  last: string;
  password: string;
  errors: {
    username?: string;
    first?: string;
    last?: string;
    password?: string;
    file?: string;
  };
  selectedFile: File | null;
  previewUrl: string;
  showPassword: boolean;
  isSubmitting: boolean;
  submissionError: string;
}

function validateForm(state: FormState) {
  const errors: FormState["errors"] = {};

  if (!state.username.trim()) {
    errors.username = "Username is required.";
  } else if (/\s/.test(state.username)) {
    errors.username = "Spaces not allowed.";
  }

  if (!state.first.trim()) {
    errors.first = "Empty!";
  }

  if (!state.password.trim()) {
    errors.password = "Password is required.";
  }
  return errors;
}

function Register() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>({
    username: "",
    first: "",
    last: "",
    password: "",
    errors: {},
    selectedFile: null,
    previewUrl: "",
    showPassword: false,
    isSubmitting: false,
    submissionError: "",
  });

  const {
    username,
    first,
    last,
    password,
    errors,
    selectedFile,
    previewUrl,
    showPassword,
    isSubmitting,
    submissionError,
  } = formState;

  const updateField = (
    field: keyof Omit<
      FormState,
      "errors" | "selectedFile" | "previewUrl" | "showPassword" | "isSubmitting"
    >,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: "" },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setFormState((prev) => ({
          ...prev,
          selectedFile: null,
          previewUrl: "",
          errors: { ...prev.errors, file: "Images only." },
        }));
        return;
      }

      setFormState((prev) => ({
        ...prev,
        selectedFile: file,
        previewUrl: URL.createObjectURL(file),
        errors: { ...prev.errors, file: "" },
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setFormState((prev) => ({ ...prev, errors: validationErrors }));
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("first", first);
    formDataToSend.append("last", last);
    formDataToSend.append("password", password);
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("jwt_token", data.access_token);
        localStorage.setItem("current_user_data",JSON.stringify(data.user_data));
        navigate("/chat");
      } else {
        if (data.exist) {
          setFormState((prev) => ({
            ...prev,
            errors: { ...prev.errors, username: "Username already exists." },
          }));
        } else {
          setFormState((prev) => ({
            ...prev,
            errors: { ...prev.errors, submissionError: data.message },
          }));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="auth-wrapper">
      <h4>Create Account</h4>
      <h6>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </h6>

      <div className={`upload-file ${selectedFile ? "uploaded" : ""}`}>
        {selectedFile && (
          <div className="image-wrapper">
            <img src={previewUrl} alt="Avatar" />
            <div className="layer-filter"></div>
          </div>
        )}
        <Camera size={24} color="var(--white)" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {errors.file && <p>{errors.file}</p>}
      {submissionError != "" && <p>{submissionError}</p>}
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

      {/* Name Fields */}
      <div className="two-section">
        <div className="input-wrapper">
          <div className="input-label">
            <h5>First Name</h5>
            <p>{errors.first}</p>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="John"
              value={first}
              onChange={(e) => updateField("first", e.target.value)}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <div className="input-label">
            <h5>Last Name</h5>
            <p>{errors.last}</p>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Doe"
              value={last}
              onChange={(e) => updateField("last", e.target.value)}
            />
          </div>
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
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => updateField("password", e.target.value)}
          />
        </div>
      </div>

      <div className="button-wrapper">
        <div
          onClick={handleSubmit}
          className={`submit ${isSubmitting ? "disabled" : ""}`}
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </div>
      </div>
    </div>
  );
}

export default Register;
