import { auth } from "./../config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';

const getCurrentUserIdToken = async (): Promise<string> => {
  let userIdToken : string = "";
  await onAuthStateChanged(auth, async (user) => {
      if (!user) throw "No user found";
      userIdToken = await user.getIdToken(true);
      return userIdToken;
  });
  return userIdToken;
}

export { getCurrentUserIdToken };


