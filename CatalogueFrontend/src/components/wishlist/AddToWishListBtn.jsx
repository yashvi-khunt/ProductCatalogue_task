import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { addToList, removeFromList } from "../../store/wishListSlice";

const message = {
  add: "Add to Wishlist",
  remove: "Remove from Wishlist",
};

function AddToWishListBtn({ productId, text = false, className = "" }) {
  const wishList = useSelector((state) => state.wishlist.list);
  const dispatch = useDispatch();
  const [isWishListed, setIsWishListed] = useState(false);

  const handleAdd = () => {
    dispatch(addToList({ id: productId }));
  };

  const handleRemove = () => {
    dispatch(removeFromList({ id: productId }));
  };
  useEffect(() => {
    if (wishList.includes(productId)) {
      setIsWishListed(true);
    } else {
      setIsWishListed(false);
    }
  }, [wishList, productId]);

  return (
    <div
      className={`flex gap-1 cursor-pointer items-center ${className}`}
      onClick={isWishListed ? handleRemove : handleAdd}
    >
      {isWishListed ? (
        <>
          <IoIosHeart size={"22px"} />
          {text ? <label>{message.remove}</label> : null}
        </>
      ) : (
        <>
          <IoIosHeartEmpty size={"22px"} />
          {text ? <label>{message.add}</label> : null}
        </>
      )}
    </div>
  );
}

export default AddToWishListBtn;
