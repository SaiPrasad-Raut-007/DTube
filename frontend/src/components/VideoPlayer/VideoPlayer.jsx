import './VideoPlayer.css'
import { Link } from 'react-router-dom';
import videoExample from "../../../example_video/example-video.webm";
import { useRef, useState } from 'react';

export default function VideoPlayer() {
	const video_title = "Building a Complete YouTube Clone in React & CSS";
	const creator_name = "Code with Sai";
	const creator_pic = "https://picsum.photos/seed/face1/48/48";
	const creator_subs = "1.05M subscribers";
	const video_description = "In this video, we are building a fully functional YouTube clone using React, CSS Grid, and Flexbox. We will cover components, state management, and responsive design techniques. Drop a like if you enjoy!";
	const thumbnail_placeholder = "https://picsum.photos/seed/mainvid/1280/720";

	return (
		<div className="video-player-container">
			<VideoComponent video_src={videoExample} video_title={video_title} creator_name={creator_name} />

			<div className="video-player-info">
				<h3 className="video-title">{video_title}</h3>

				<div className="video-primary-details">
					<div className="creator-details-section">
						<Link to="/channel" className='creator-link'><img className="creator-pic" src={creator_pic} alt={creator_name} /></Link>
						<Link to="/channel" className='creator-link'>
							<div className="creator-text-info">
								<h4 className="video-creator-name">{creator_name}</h4>
								<h5 className="video-creator-subs">{creator_subs}</h5>
							</div>
						</Link>
						<button className="subscribe-button">Subscribe</button>
					</div>

					<div className="video-actions-section">
						<div className="action-pill like-dislike-pill">
							<button className="action-button like-button">
								<span className="material-symbols-rounded">thumb_up</span>
								<strong>12K</strong>
							</button>
							<div className="divider"></div>
							<button className="action-button dislike-button">
								<span className="material-symbols-rounded">thumb_down</span>
							</button>
						</div>

						<div className="action-pill">
							<button className="action-button share-button">
								<span className="material-symbols-rounded">share</span>
								<strong>Share</strong>
							</button>
						</div>
					</div>
				</div>

				<div className="video-description-box">
					<p>{video_description}</p>
				</div>
			</div>
		</div>
	);
}

const VideoComponent = ({ video_src, video_title, creator_name }) => {

	const videoRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);
	const [currentTime, setCurrentTime] = useState("0:00");
	const [duration, setDuration] = useState("0:00");
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [speed, setSpeed] = useState(1);

	const formatTime = (timeInSeconds) => {
		if (isNaN(timeInSeconds)) return "0:00";
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	const togglePlay = () => {
		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	}

	const handleTimeUpdate = () => {
		const current = videoRef.current.currentTime;
		const total = videoRef.current.duration;

		const progressPercentage = (current / total) * 100;
		setProgress(progressPercentage);
		setCurrentTime(formatTime(current));
	};

	const handleLoadedMetaData = () => {
		setDuration(formatTime(videoRef.current.duration));
	}

	const handleProgressClick = (e) => {
		const barWidth = e.currentTarget.offsetWidth;
		const clickPosition = e.nativeEvent.offsetX;
		const clickPercentage = clickPosition / barWidth;
		videoRef.current.currentTime = clickPercentage * videoRef.current.duration;
	}

	const handleVolumeChange = (e) => {
		const newVolume = e.target.value;
		videoRef.current.volume = newVolume;
		setVolume(newVolume);
	};

	const toggleMute = () => {
		if (volume > 0) {
			videoRef.current.volume = 0;
			setVolume(0);
		} else {
			videoRef.current.volume = 1;
			setVolume(1);
		}
	}

	const handleFullScreen = () => {
		const container = videoRef.current.parentElement;
		if (!document.fullscreenElement) {
			container.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	return (
		<div className='video-wrapper'>
			<video
				className="dtube-video-player"
				src={video_src}
				ref={videoRef}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetaData}
				onClick={togglePlay}
				onEnded={() => setIsPlaying(false)}
			/>
			<div className="video-overlay-header">
				<div className="overlay-info">
					<h3 className="overlay-title">{video_title}</h3>
					<p className="overlay-creator">{creator_name}</p>
				</div>
			</div>

			<div className='custom-controls-container'>

				<div className='progress-bar-bg' onClick={handleProgressClick}>
					<div className='progress-bar-fill' style={{ width: `${progress}%` }}></div>
				</div>

				<div className='controls-row'>
					<button className='play-pause-btn' onClick={togglePlay}>
						<span className='material-symbols-rounded'>{isPlaying ? 'pause' : 'play_arrow'}</span>
					</button>

					<div className='volume-container'>
						<button className='volume-btn' onClick={toggleMute}>
							<span className='material-symbols-rounded'>
								{volume == 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
							</span>
						</button>
						<input
							type="range"
							min="0"
							max="1"
							step="0.05"
							value={volume}
							onChange={handleVolumeChange}
							className='volume-slider'
						/>
					</div>
					<div className="time-display">
						{currentTime} / {duration}
					</div>

					<div className="settings-container">
						<button className="settings-btn" onClick={() => setSettingsOpen(!settingsOpen)}>
							<span className="material-symbols-rounded">settings</span>
						</button>

						{settingsOpen && (
							<div className="settings-dropdown">
								<div className="dropdown-section">
									<p>Speed</p>
									<select value={speed} onChange={(e) => {
										const newSpeed = parseFloat(e.target.value);
										videoRef.current.playbackRate = newSpeed;
										setSpeed(newSpeed);
									}}>
										<option value="0.5">0.5x</option>
										<option value="1">1x</option>
										<option value="1.5">1.5x</option>
										<option value="2">2x</option>
									</select>
								</div>
							</div>
						)}
					</div>

					<div style={{ flexGrow: 1 }}></div>

					<button className="fullscreen-btn" onClick={handleFullScreen}>
						<span className="material-symbols-rounded">fullscreen</span>
					</button>
				</div>
			</div>
		</div>
	)
}