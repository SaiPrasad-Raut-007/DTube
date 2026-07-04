import { useState } from "react";
import "./StudioPage.css";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="studio-page">
      <div className="top-bar-navigation">
        <button
          className={`navigation-button ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Video Upload
        </button>
        <button
          className={`navigation-button ${activeTab === "manage" ? "active" : ""}`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Videos
        </button>
        <button
          className={`navigation-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Manage Channel Info
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "upload" && <VideoUploadPage />}
        {activeTab === "manage" && <ManageVideoPage />}
        {activeTab === "info" && <ManageChannelInfo />}
      </div>
    </div>
  );
}

const VideoUploadPage = () => {
  const [userInfo, setUserInfo] = useState({ username: "Creator" });
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
          setUserInfo(data);
        } else {
          console.error("Failed to fetch profile for studio");
        }
      } catch (error) {
        console.error("Networrk error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [duration, setDuration] = useState("");

  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const thumbInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleVideoSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !videoFile || !thumbnailFile) {
      setUploadStatus("Error: Title, Video, and Thumbnail are required!");
      return;
    }

    setIsUploading(true);

    try {
      setUploadStatus("Step 1/3: Uploading heavy video file to AWS...");
      const videoFormData = new FormData();
      videoFormData.append("videoFile", videoFile);

      const videoRes = await fetch("/api/videos/upload-video", {
        method: "POST",
        body: videoFormData,
      });
      const videoData = await videoRes.json();
      if (!videoRes.ok)
        throw new Error(videoData.error || "Video upload failed");
      const finalVideoUrl = videoData.videoUrl;

      setUploadStatus("Step 2/3: Uploading thumbnail image...");
      const thumbFormData = new FormData();
      thumbFormData.append("thumbnail", thumbnailFile);

      const thumbRes = await fetch("/api/videos/upload-thumbnail", {
        method: "POST",
        body: thumbFormData,
      });
      const thumbData = await thumbRes.json();
      if (!thumbRes.ok)
        throw new Error(thumbData.error || "Thumbnail upload failed");
      const finalThumbnailUrl = thumbData.url;

      setUploadStatus("Step 3/3: Saving everything to database...");
      const token = localStorage.getItem("dtube_token");

      const infoRes = await fetch("/api/videos/upload-video-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          duration: duration,
          videoUrl: finalVideoUrl,
          thumbnailUrl: finalThumbnailUrl,
        }),
      });

      const infoData = await infoRes.json();
      if (!infoRes.ok)
        throw new Error(infoData.error || "Failed to save video info");

      setUploadStatus("Video published successfully!");

      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnailFile(null);
      setDuration("");
    } catch (error) {
      console.error(error);
      setUploadStatus(`⚠️ ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="studio-page-layout fade-in">
      <div className="upload-header">
        <h2>Welcome, {userInfo.username || "Sai"}!</h2>
        <p>Upload a new video to your channel.</p>
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        {uploadStatus && (
          <div
            className={`status-banner ${uploadStatus.includes("⚠️") ? "error" : ""}`}
          >
            {uploadStatus}
          </div>
        )}

        <div className="form-group">
          <label>Video Title</label>
          <input
            type="text"
            className="video-title"
            placeholder="Catchy Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="video-description"
            placeholder="Tell viewers about your video..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            rows="4"
          />
        </div>

        <div className="file-inputs-row">
          <div className="form-group file-group">
            <label>Thumbnail Image</label>
            <input
              type="file"
              ref={thumbInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                setThumbnailFile(e.target.files[0]);
                setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <div
              className="preview-container"
              onClick={() => thumbInputRef.current.click()}
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="preview-image"
                />
              ) : (
                <div className="upload-placeholder">
                  <span className="material-symbols-rounded">image</span>
                  <p>Click to upload thumbnail</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-group file-group">
            <label>Video File</label>
            <input
              type="file"
              ref={videoInputRef}
              style={{ display: "none" }}
              accept="video/*"
              onChange={handleVideoSelection}
            />
            <button
              type="button"
              className="custom-file-btn"
              onClick={() => videoInputRef.current.click()}
            >
              <span className="material-symbols-rounded">movie</span>
              {videoFile ? videoFile.name : "Select Video File"}
            </button>
            {duration && <p className="duration-hint">Detected: {duration}</p>}
          </div>
        </div>

        <button type="submit" className="upload-button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Publish Video"}
        </button>
      </form>
    </div>
  );
};

const ManageVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editThumbnailFile, setEditThumbnailFile] = useState(null);
  const [editThumbnailPreview, setEditThumbnailPreview] = useState(null);
  const editThumbRef = useRef(null);

  const [playlistModalVideo, setPlaylistModalVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("dtube_token");
      const headers = { Authorization: `Bearer ${token}` };

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.id;

      try {
        const [videoRes, playlistRes] = await Promise.all([
          fetch(`/api/videos/channel-videos/${userId}`, { headers }),
          fetch(`/api/playlists/channel-playlists/${userId}`, { headers }),
        ]);

        if (videoRes.ok) setVideos(await videoRes.json());
        if (playlistRes.ok) {
          const data = await playlistRes.json();

          setPlaylists(Array.isArray(data) ? data : data.playlists || []);
        }
      } catch (error) {
        console.error("Error fetching studio data", error);
      }
    };
    fetchData();
  }, []);

  const openEditModal = (video) => {
    setEditingVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description);
    setEditThumbnailPreview(video.thumbnail);
    setEditThumbnailFile(null);
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    const token = localStorage.getItem("dtube_token");
    try {
      const response = await fetch(`/api/videos/delete/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setVideos(videos.filter((v) => v._id !== videoId));
        toast.success("successfully deleted the video.");
      } else {
        console.error("Failed to delete video");
        toast.error("Failed to delete the video.");
      }
    } catch (error) {
      console.error("Error deleting video", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dtube_token");

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    if (editThumbnailFile) {
      formData.append("thumbnail", editThumbnailFile);
    }

    try {
      const response = await fetch(
        `/api/videos/edit-video-details/${editingVideo._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setVideos(
          videos.map((v) => (v._id === editingVideo._id ? data.video : v)),
        );
        setEditingVideo(null);
      } else {
        console.error("Failed to update video");
      }
    } catch (error) {
      console.error("Network error during update", error);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dtube_token");

    const res = await fetch("/api/playlists/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newPlaylistName }),
    });

    if (res.ok) {
      const data = await res.json();
      setPlaylists([...playlists, data.playlist]);
      setNewPlaylistName("");
    }
  };

  const handlePlaylistToggle = async (playlistId, videoId, action) => {
    const token = localStorage.getItem("dtube_token");
    const res = await fetch(`/api/playlists/toggle-video?action=${action}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playlistId, videoId }),
    });

    if (res.ok) {
      setPlaylists(
        playlists.map((pl) => {
          if (pl._id === playlistId) {
            let updatedVideos = [...(pl.videos || [])];
            if (action === "add") {
              updatedVideos.push({ _id: videoId });
            } else {
              updatedVideos = updatedVideos.filter(
                (v) => (v._id || v) !== videoId,
              );
            }
            return { ...pl, videos: updatedVideos };
          }
          return pl;
        }),
      );
    }
  };

  return (
    <div className="studio-page-layout manage-layout fade-in">
      {editingVideo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Video Details</h3>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group file-group">
                <label>Thumbnail Image</label>
                <input
                  type="file"
                  ref={editThumbRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    setEditThumbnailFile(e.target.files[0]);
                    setEditThumbnailPreview(
                      URL.createObjectURL(e.target.files[0]),
                    );
                  }}
                />
                <div
                  className="preview-container"
                  onClick={() => editThumbRef.current.click()}
                >
                  {editThumbnailPreview ? (
                    <img
                      src={editThumbnailPreview}
                      alt="Preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <span className="material-symbols-rounded">image</span>
                      <p>Click to change thumbnail</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="video-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="video-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="navigation-button"
                  onClick={() => setEditingVideo(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="upload-button inline-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {playlistModalVideo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Save to Playlist</h3>
            <p className="modal-subtitle">
              Add or remove "{playlistModalVideo.title}"
            </p>

            <div className="playlist-toggle-list">
              {playlists.length === 0 ? (
                <p className="empty-state-text">
                  You haven't created any playlists yet.
                </p>
              ) : (
                playlists.map((playlist) => {
                  const isInPlaylist = playlist.videos?.some(
                    (v) => (v._id || v) === playlistModalVideo._id,
                  );

                  return (
                    <div key={playlist._id} className="playlist-toggle-row">
                      <span className="playlist-name">{playlist.name}</span>
                      <button
                        className={`toggle-btn ${isInPlaylist ? "remove" : "add"}`}
                        onClick={() =>
                          handlePlaylistToggle(
                            playlist._id,
                            playlistModalVideo._id,
                            isInPlaylist ? "remove" : "add",
                          )
                        }
                      >
                        {isInPlaylist ? "Remove" : "Add"}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="modal-actions center-actions">
              <button
                className="navigation-button"
                onClick={() => setPlaylistModalVideo(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="manage-header">
        <h2>Manage Content</h2>
        <p>Edit your videos and organize them into playlists.</p>
      </div>

      <div className="manage-grid">
        <div className="manage-section videos-section">
          <h3>Your Videos</h3>
          <div className="video-list">
            {videos.map((video) => (
              <div key={video._id} className="manage-video-card">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="manage-thumb"
                />
                <div className="manage-video-info">
                  <h4>{video.title}</h4>
                  <p className="views-text">{video.view_count || 0} views</p>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(video)}
                    >
                      <span className="material-symbols-rounded">edit</span>{" "}
                      Details
                    </button>
                    <button
                      className="edit-btn secondary"
                      onClick={() => setPlaylistModalVideo(video)}
                    >
                      <span className="material-symbols-rounded">
                        playlist_add
                      </span>{" "}
                      Playlists
                    </button>

                    <button
                      className="edit-btn secondary"
                      onClick={() => handleDeleteVideo(video._id)}
                      style={{ color: "#ff4d4d", borderColor: "#303030" }}
                    >
                      <span className="material-symbols-rounded">delete</span>{" "}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="manage-section playlists-section">
          <h3>Your Playlists</h3>

          <form
            onSubmit={handleCreatePlaylist}
            className="create-playlist-form"
          >
            <input
              type="text"
              className="video-title"
              placeholder="New Playlist Name..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              required
            />
            <button type="submit" className="upload-button inline-btn">
              Create
            </button>
          </form>

          <div className="playlist-list">
            {playlists.map((playlist) => (
              <div key={playlist._id} className="playlist-card">
                <h4>{playlist.name}</h4>
                <p className="views-text">
                  {playlist.videos?.length || 0} videos
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageChannelInfo = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatarInputRef = useRef(null);

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const bannerInputRef = useRef(null);

  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("dtube_token");
      if (!token) return;

      try {
        const response = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || "");
          setBio(data.user_bio || "");
          setAvatarPreview(data.user_pfp || "");

          setBannerPreview(data.user_banner || "");
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus("Saving changes... Please wait.");

    const token = localStorage.getItem("dtube_token");
    let finalAvatarUrl = avatarPreview;
    let finalBannerUrl = bannerPreview;

    try {
      if (avatarFile) {
        setStatus("Uploading new profile picture...");
        const avatarData = new FormData();
        avatarData.append("avatar", avatarFile);

        const avatarRes = await fetch("/api/user/update-avatar", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: avatarData,
        });
        const parsedAvatar = await avatarRes.json();
        if (avatarRes.ok) finalAvatarUrl = parsedAvatar.url;
      }

      if (bannerFile) {
        setStatus("Uploading new channel banner...");
        const bannerData = new FormData();
        bannerData.append("banner", bannerFile);

        const bannerRes = await fetch("/api/user/update-banner", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: bannerData,
        });
        const parsedBanner = await bannerRes.json();
        if (bannerRes.ok) finalBannerUrl = parsedBanner.url;
      }

      setStatus("Updating database...");
      const profileRes = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          user_bio: bio,
          user_pfp: finalAvatarUrl,
          user_banner: finalBannerUrl,
        }),
      });

      if (profileRes.ok) {
        setStatus("✅ Channel profile updated successfully!");
      } else {
        const errData = await profileRes.json();
        setStatus(`❌ Error: ${errData.error}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Network error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="studio-page-layout fade-in">
      <div className="upload-header">
        <h2>Channel Customization</h2>
        <p>Customize your channel's branding and basic info.</p>
      </div>

      <form onSubmit={handleSave} className="upload-form">
        {status && (
          <div
            className={`status-banner ${status.includes("❌") ? "error" : ""}`}
          >
            {status}
          </div>
        )}

        <div className="branding-section">
          <div className="form-group">
            <label>Channel Banner</label>
            <p className="hint-text">
              This image will appear across the top of your channel.
            </p>
            <input
              type="file"
              ref={bannerInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                setBannerFile(e.target.files[0]);
                setBannerPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div
              className="banner-preview-container"
              onClick={() => bannerInputRef.current.click()}
            >
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="banner-preview-image"
                />
              ) : (
                <div className="upload-placeholder">
                  <span className="material-symbols-rounded">panorama</span>
                  <p>Click to upload 16:9 banner</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <p className="hint-text">
              Your profile picture will appear where your channel is presented
              on DTube.
            </p>
            <input
              type="file"
              ref={avatarInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                setAvatarFile(e.target.files[0]);
                setAvatarPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div
              className="avatar-preview-container"
              onClick={() => avatarInputRef.current.click()}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="avatar-preview-image"
                />
              ) : (
                <div className="upload-placeholder">
                  <span className="material-symbols-rounded">
                    account_circle
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="form-group">
          <label>Channel Name</label>
          <input
            type="text"
            className="video-title"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isSaving}
          />
        </div>

        <div className="form-group">
          <label>Description (Bio)</label>
          <textarea
            className="video-description"
            placeholder="Tell viewers about your channel..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isSaving}
            rows="5"
          />
        </div>

        <button type="submit" className="upload-button" disabled={isSaving}>
          {isSaving ? "Publishing Changes..." : "Publish Changes"}
        </button>
      </form>
    </div>
  );
};
