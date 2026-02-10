import { auth } from "../firebase";
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

const provider = new GithubAuthProvider();

export function loginWithGitHub() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}
