import { useState, useEffect } from "react";
import "./Settings.css";
import toast from "react-hot-toast";
import { useRef } from "react";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    username: "",
    user_handle: "",
    user_pfp: "",
    user_bio: "",
  });

  const avatarInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("dtube_token");

      if (!token) return;
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Network error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...profileData, [name]: value };

    if (
      name === "username" &&
      profileData.user_pfp?.includes("ui-avatars.com")
    ) {
      const formattedName = value.split(" ").join("+");
      updatedData.user_pfp = `https://ui-avatars.com/api/?name=${formattedName}&background=30A645&color=000&size=256`;
    }

    setProfileData(updatedData);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dtube_token");
    let finalAvatarUrl = profileData.user_pfp;

    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadRes = await fetch("/api/user/update-avatar", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const data = await uploadRes.json();
          finalAvatarUrl = data.url;
        } else {
          throw new Error("Avatar upload failed");
        }
      }

      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...profileData, user_pfp: finalAvatarUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend rejected the request", data.error);
        toast.error(data.error);
      } else {
        console.log("Settings Saved!", { profileData });
        toast.success("Settings Saved!");
      }
    } catch (error) {
      console.error("Network or server connection failed: ", error);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your account preferences and channel details.
        </p>
      </div>

      <form className="settings-content" onSubmit={handleSave}>
        <div className="settings-card">
          <h2 className="card-title">Channel Profile</h2>
          <hr className="card-divider" />

          <div className="profile-edit-section">
            <input
              type="file"
              ref={avatarInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setAvatarFile(file);
                  setProfileData({
                    ...profileData,
                    user_pfp: URL.createObjectURL(file),
                  });
                }
              }}
            />

            <img
              src={
                profileData?.user_pfp ||
                "https://ui-avatars.com/api/?name=User&background=30A645&color=fff"
              }
              alt="Profile"
              className="settings-profile-pic"
              onClick={() => avatarInputRef.current.click()}
              style={{ cursor: "pointer" }}
            />
            <button
              type="button"
              className="change-pic-btn"
              onClick={() => avatarInputRef.current.click()}
            >
              Change Avatar
            </button>
          </div>

          <div className="input-group">
            <label>Channel Name</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Handle</label>
            <input
              type="text"
              name="user_handle"
              value={profileData.user_handle}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Bio / Description</label>
            <textarea
              name="user_bio"
              rows="4"
              value={profileData.user_bio}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="settings-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
