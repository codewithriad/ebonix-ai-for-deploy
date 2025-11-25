import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadProfilePhoto = async (user: any): Promise<string> => {
  let firebasePhotoURL = user.photoURL || "";

  if (user.photoURL && user.photoURL.includes("googleusercontent.com")) {
    try {
      console.log("📸 Uploading profile photo to Firebase Storage...");
      const response = await fetch(user.photoURL);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `profile-images/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      firebasePhotoURL = await getDownloadURL(storageRef);
      console.log("✅ Photo uploaded successfully:", firebasePhotoURL);
    } catch (uploadError) {
      console.error("❌ Photo upload error:", uploadError);
      firebasePhotoURL = user.photoURL;
    }
  }
  return firebasePhotoURL;
};

export const ADMIN_EMAIL = "tapplix@gmail.com";
