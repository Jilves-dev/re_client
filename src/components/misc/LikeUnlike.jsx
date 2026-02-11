import { useAuth } from '../../context/auth';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LikeUnlike({ ad }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate('/login', {
          state: `/ad/${ad.slug}`,
        });
        return;
      }

      console.log('Liking ad:', ad._id);

      const { data } = await axios.post('/wishlist', { adId: ad._id });

      console.log('Like response:', data);

      // ✅ KORJAUS: Päivitä auth oikein
      const updatedAuth = {
        ...auth,
        user: data.user, // Backend palauttaa { user, ad }
      };

      setAuth(updatedAuth);

      // Päivitä localStorage
      localStorage.setItem('auth', JSON.stringify(updatedAuth));

      toast.success('Added to wishlist ❤️');
    } catch (err) {
      console.error('Like error:', err);
      toast.error('Failed to add to wishlist');
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate('/login', {
          state: `/ad/${ad.slug}`,
        });
        return;
      }

      console.log('Unliking ad:', ad._id);

      const { data } = await axios.delete(`/wishlist/${ad._id}`);

      console.log('Unlike response:', data);

      // ✅ KORJAUS: Päivitä auth oikein
      const updatedAuth = {
        ...auth,
        user: data.user, // Backend palauttaa { user, ad }
      };

      setAuth(updatedAuth);

      // Päivitä localStorage
      localStorage.setItem('auth', JSON.stringify(updatedAuth));

      toast.success('Removed from wishlist');
    } catch (err) {
      console.error('Unlike error:', err);
      toast.error('Failed to remove from wishlist');
    }
  };

  // Debug: Näytä onko tykkäys aktiivinen
  const isLiked = auth.user?.wishlist?.includes(ad?._id);
  console.log('LikeUnlike - Ad ID:', ad?._id);
  console.log('LikeUnlike - User wishlist:', auth.user?.wishlist);
  console.log('LikeUnlike - Is liked:', isLiked);

  return (
    <>
      {isLiked ? (
        <span
          className="text-3xl cursor-pointer mr-4"
          title="Remove from wishlist"
        >
          <FcLike onClick={handleUnlike} />
        </span>
      ) : (
        <span className="text-3xl cursor-pointer mr-4" title="Add to wishlist">
          <FcLikePlaceholder onClick={handleLike} />
        </span>
      )}
    </>
  );
}

/*import { useAuth } from "../../context/auth";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LikeUnlike({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      //   console.log("handle like => ", data);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Added to wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      //   console.log("handle unlike => ", data);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {auth.user?.wishlist?.includes(ad?._id) ? (
      <span className="text-3xl cursor-pointer mr-4">
        <FcLike onClick={handleUnlike} />
      </span>
    ) : (
      <span className="text-3xl cursor-pointer mr-4">
        <FcLikePlaceholder onClick={handleLike} />
      </span>
    )}
  </>
  );
}*/
