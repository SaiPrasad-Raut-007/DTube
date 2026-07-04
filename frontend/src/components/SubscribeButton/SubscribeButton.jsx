import { useEffect, useState } from "react";
import "./SubscribeButton.css";
import toast from "react-hot-toast";

export default function SubscribeButton({ channel }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const token = localStorage.getItem("dtube_token");
        const response = await fetch(
          `/api/user/check-subscription/${channel}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setIsSubscribed(data.isSubscribed);
        }
      } catch (error) {
        console.error("Failed to fetch initial subscription status", error);
      }
    };

    fetchInitialStatus();
  }, [channel]);

  const handleSubscribeToggle = async (e) => {
    e.stopPropagation();

    setLoading(true);

    try {
      const token = localStorage.getItem("dtube_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`/api/user/subscribe/${channel}`, {
        method: "POST",
        headers: headers,
      });

      if (response.ok) {
        setIsSubscribed(!isSubscribed);
      } else {
        console.error("Failed to update subscription status");
      }
    } catch (error) {
      console.error("Network error while subscribing:", error);
      toast.error("Error subscribing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribeToggle}
      disabled={loading}
      className={`subscribe-button ${isSubscribed ? "subscribed" : "unsubscribe"}`}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}
