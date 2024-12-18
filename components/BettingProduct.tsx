"use client";

import { BettingProductType } from "@/types/BettingTypes";
import Image from "next/image";
import PostStatsNav from "./PostStatsNav";
import Avatar from "@rd/Avatar";
import UserInfo from "./UserInfo";
import { useRouter } from "next/navigation";

interface BettingProductProps {
  info: BettingProductType;
}

const BettingProduct = ({ info }: BettingProductProps) => {
  const {
    userID,
    userName,
    displayName,
    userImg,
    title,
    imgUrls,
    tierName,
    bettingId,
    blindName,
    postStats,
    createdAt,
    channel,
    isAdmin,
  } = info;
  const router = useRouter();

  const handleBettingClick = () => {
    router.push(`/betting/` + bettingId);
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent post click event from firing
    // Navigate to user's channel if userId exists
    if (userID) {
      router.push(`/channel/${userID}`);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (channel && channel.channelType === "CATEGORYCHANNEL") {
      router.push(`/category-channel/${channel.channelId}`);
    }
  };

  return (
    <>
      <div
        className="flex flex-1 gap-x-4 mb-4 border-b border-gray-200 pb-4 px-4 cursor-pointer"
        onClick={handleBettingClick}
      >
        <div
          className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleAvatarClick}
        >
          {blindName === null ? (
            <Avatar
              src={userImg || undefined}
              alt={userName || "사용자"}
              initials={userName ? userName[0].toUpperCase() : "U"}
            />
          ) : (
            <Avatar
              src={"/images/logo.png"}
              alt={blindName || "사용자"}
              initials={blindName ? blindName[0].toUpperCase() : "U"}
            />
          )}
        </div>
        {/* <div className="flex flex-1 items-center gap-x-2 px-4"> */}

        <div className="w-full">
          {channel?.channelType === "CATEGORYCHANNEL" && (
            <div
              className="text-xs text-gray-500 border-2 border-gray-300 rounded-full px-3 py-1 w-fit cursor-pointer mb-1"
              onClick={handleCategoryClick}
            >
              {channel.channelName}
            </div>
          )}
          <div>
            {blindName === null ? (
              <UserInfo
                name={userName}
                username={displayName}
                date={createdAt}
                tierName={tierName}
                isAdmin={isAdmin}
              />
            ) : (
              <UserInfo name={blindName} date={createdAt} />
            )}
          </div>
          <p>{title}</p>
          {/* <div className="flex w-full"> */}
          <div
            className="
    w-full h-32
    flex pt-[10px] pr-[10px] pb-[10px] gap-[10px] items-start self-stretch shrink-0 flex-nowrap
    bg-[#ffffff] 
    overflow-x-auto overflow-y-hidden whitespace-nowrap scrolling-touch ms-overflow-none 
    scroll-snap-type-x mandatory scroll-smooth"
          >
            {/* TODO: 확대 미리보기 */}
            {imgUrls.map((url) => (
              <div
                key={url}
                className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 my-4 scroll-snap-align-start"
              >
                {url && (
                  <Image
                    alt=""
                    src={url}
                    // layout="fill" // 반드시 추가: div 크기에 맞게 이미지를 꽉 채움
                    objectFit="fill" // 이미지 비율을 유지하면서 div를 채움
                    className="rounded-md h-full"
                    // className="h-full w-full object-scale-down object-center"
                    width={500}
                    height={500}
                  />
                )}
              </div>
            ))}
          </div>
          <ul className="mt-4 mb-4 px-4 flex justify-between gap-x-10 xl:gap-x-14 text-xs text-slate-700  [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3">
            {postStats && (
              <PostStatsNav
                viewCount={postStats.viewCount}
                commentsCount={postStats.commentsCount}
                feedId={postStats.id.toString()}
                isShare={postStats.isShare}
                shareCount={postStats.shareCount}
                isLike={postStats.isLike}
                likesCount={postStats.likesCount}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BettingProduct;
