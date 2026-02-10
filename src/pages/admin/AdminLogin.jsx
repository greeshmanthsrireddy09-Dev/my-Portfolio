import { loginWithGitHub } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      await loginWithGitHub();
      navigate("/admin");
    } catch (err) {
      alert("GitHub login failed");
      console.error(err);
    }
  };

  return (
    <section className="max-w-sm">
      <h1 className="text-2xl text-white mb-6">
        Admin Login
      </h1>

      <button
        onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center gap-3
        bg-neutral-900 border border-neutral-800
        hover:bg-neutral-800 transition
        py-3 rounded-xl text-white"
      >
        <span>Login with GitHub</span>
      </button>
    </section>
  );
}

export default AdminLogin;
