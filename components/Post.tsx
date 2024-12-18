"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DropdownMenuDemo from "@rd/DropdownMenu";
import HoverCard from "@rd/HoverCard";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Userinfo from "@components/UserInfo";
import MediaGrid from "@components/MediaGrid";
import useUserStore from "@store/useUserStore";
import axios from "@handler/fetch/axios";
import DropdownMenuMyDemo from "./radix/DropdownMyMenu";
import ReuploadMenu from "./ReuploadMenu";
import QuotePost from "./QuotePost";
import {
  UserDTO,
  GuestDTO,
  ChannelDTO,
} from "@components/types/feedResponseDTO";
import GuestAuthModal from "@components/GuestAuthModal";
import Avatar from "@rd/Avatar";
import { Button } from "@nextui-org/button";
import { TierDTO } from "./types/feedsResponseDTO";

export interface PostItem {
  id: string;
  content: string;
  name: string;
  username: string;
  date: string;
  src: string;
  initials: string;
  followers: string;
  following: string;
  description: string;
  viewCount: string;
  mediaFiles?: string[];
  youtubeUrls?: string[];
  children?: React.ReactNode;
  commentsCount: number;
  likesCount: number;
  shareCount: number;
  onClick: () => void;
  isLike: boolean;
  userId?: number;
  isShare: boolean;
  quoteFeed?: {
    quoteId: number;
    quoteContent: string;
    quoteCreateAt: string;
    quoteUser: UserDTO | null;
    quoteGuest: GuestDTO | null;
    mediaFileUrls: string[];
    youtubeUrls: string[];
  };
  isQuote?: boolean;
  guest?: GuestDTO | null;
  channel?: ChannelDTO | null;
  tier?: TierDTO | null;
}

const Post: React.FC<PostItem> = ({
  id,
  content,
  name,
  username,
  date,
  children,
  src,
  initials,
  followers,
  following,
  description,
  viewCount,
  mediaFiles,
  youtubeUrls,
  commentsCount = 0,
  likesCount: initialLikesCount = 0,
  shareCount = 0,
  onClick = () => {},
  isLike = false,
  isShare = false,
  userId,
  quoteFeed,
  isQuote = false,
  guest,
  channel,
  tier,
}) => {
  const [isLiked, setIsLiked] = useState(isLike);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isShared, setIsShared] = useState(isShare);
  const [currentShareCount, setCurrentShareCount] = useState(shareCount);
  const userInfo = useUserStore((state) => state?.userInfo);
  const [isGuestAuthModalOpen, setIsGuestAuthModalOpen] = useState(false);
  const router = useRouter();

  // Add function to handle avatar click
  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent post click event from firing
    // Navigate to user's channel if userId exists
    if (userId) {
      router.push(`/channel/${userId}`);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (channel && channel.channelType === "CATEGORYCHANNEL") {
      router.push(`/category-channel/${channel.channelId}`);
    }
  };

  useEffect(() => {
    setIsLiked(isLike);
    setLikesCount(initialLikesCount);
    setIsShared(isShare);
    setCurrentShareCount(shareCount);
  }, [isLike, initialLikesCount, isShare, shareCount]);

  const toggleReupload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userInfo?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (!isShared) {
        setIsShared(true);
        setCurrentShareCount((prev) => prev + 1);
        const response = await axios.post(`feeds/${id}/reupload`);
        if (response.status !== 200) {
          setIsShared(false);
          setCurrentShareCount((prev) => prev - 1);
        }
      } else {
        setIsShared(false);
        setCurrentShareCount((prev) => prev - 1);
        const response = await axios.delete(`feeds/${id}/reupload`);
        if (response.status !== 200) {
          setIsShared(true);
          setCurrentShareCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      setIsShared(!isShared);
      setCurrentShareCount((prev) => (isShared ? prev + 1 : prev - 1));
      console.error("Error toggling reupload:", error);
      alert("재업로드 처리 중 오류가 발생했습니다.");
    }
  };
  const handleQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userInfo?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    router.push(`/hot-topic/create-feed?quoteId=${id}`);
  };

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userInfo?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const likeDTO = {
        likeType: "FEED",
        viewType: "HOTTOPICCHANNEL",
        userId: userInfo.id,
        targetId: id,
      };

      const response = await axios.post("/like", likeDTO);

      if (response.data.message === "좋아요") {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      } else if (response.data.message === "좋아요 취소") {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };
  // Post.tsx의 handleGuestAuth 함수 수정
  const handleGuestAuth = async (guestId: string, guestPassword: string) => {
    try {
      // 게스트 인증 요청
      const response = await axios.post(`/feeds/${id}/verify-guest`, {
        guestId,
        guestPassword,
      });

      if (response.status === 200) {
        // 인증 성공 시에만 수정 페이지로 이동
        setIsGuestAuthModalOpen(false); // 모달 닫기
        router.push(
          `/edit-feed/${id}?guestId=${guestId}&guestPassword=${guestPassword}`
        );
      }
    } catch (error) {
      console.error("Error during guest authentication:", error);
      // 서버에서 반환한 에러 메시지가 있다면 그것을 사용
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "게스트 인증에 실패했습니다.";
      alert(errorMessage);
    }
  };
  // handleEdit 함수가 제대로 작동하는지 디버깅용 로그 추가
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit clicked, guest:", guest); // 디버깅 로그
    if (guest?.guestId) {
      // guest 객체의 guestId 존재 여부 확인
      console.log("Opening guest auth modal"); // 디버깅 로그
      setIsGuestAuthModalOpen(true);
    } else if (userInfo?.id) {
      router.push(`/edit-feed/${id}`);
    }
  };

  return (
    <>
      <div
        className="flex flex-1 gap-x-4 mb-4 border-b border-gray-200 pb-4 px-4 cursor-pointer"
        onClick={onClick}
      >
        <div
          className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleAvatarClick}
        >
          <Avatar
            src={src || undefined}
            alt={username || "사용자"}
            initials={username ? username[0].toUpperCase() : "U"}
          />
        </div>
        <div className="flex flex-col flex-1">
          {channel?.channelType === "CATEGORYCHANNEL" && (
            <div
              className="text-xs text-gray-500 border-2 border-gray-300 rounded-full px-3 py-1 w-fit cursor-pointer mb-1"
              onClick={handleCategoryClick}
            >
              {channel.channelName}
            </div>
          )}
          <div className="flex flex-1">
            <Userinfo
              name={name}
              username={username}
              date={date}
              tierName={tier?.name}
            />
            <div>
              {userInfo?.id === userId || guest ? (
                <DropdownMenuMyDemo
                  feedId={id}
                  onEdit={handleEdit}
                  isGuest={!!guest?.guestId}
                />
              ) : (
                <DropdownMenuDemo />
              )}
            </div>
          </div>

          <div className="text-sm text-slate-900 mb-4">{content}</div>

          {((mediaFiles && mediaFiles.length > 0) ||
            (youtubeUrls && youtubeUrls.length > 0)) && (
            <div className="mb-4">
              <MediaGrid
                mediaFiles={mediaFiles || []}
                youtubeUrls={youtubeUrls || []}
                id={id}
              />
            </div>
          )}

          {isQuote && quoteFeed && (
            <QuotePost
              quoteId={quoteFeed.quoteId}
              quoteContent={quoteFeed.quoteContent}
              quoteCreateAt={quoteFeed.quoteCreateAt}
              quoteUser={quoteFeed.quoteUser}
              quoteGuest={quoteFeed.quoteGuest}
              mediaFileUrls={quoteFeed.mediaFileUrls}
              youtubeUrls={quoteFeed.youtubeUrls}
              onClick={() => {
                if (quoteFeed.quoteId < 0) {
                  router.push(`/betting/${-quoteFeed.quoteId}`);
                } else {
                  router.push(`/feed/${quoteFeed.quoteId}`);
                }
              }}
            />
          )}

          {children}

          <div>
            <ul className="flex justify-between gap-x-10 xl:gap-x-14 text-xs text-slate-700  [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3">
              <li>
                <ChartBarSquareIcon className="w-5 h-5" />
                {viewCount}
              </li>
              <li>
                <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                {commentsCount}
              </li>
              <li>
                <ReuploadMenu
                  feedId={id}
                  isShare={isShared}
                  shareCount={currentShareCount}
                  onToggleReupload={toggleReupload}
                  onQuote={handleQuote}
                />
              </li>
              <li onClick={toggleLike}>
                {isLiked ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                {likesCount}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <GuestAuthModal
        isOpen={isGuestAuthModalOpen}
        onClose={() => setIsGuestAuthModalOpen(false)}
        onConfirm={handleGuestAuth}
      />
    </>
  );
};

export default Post;
