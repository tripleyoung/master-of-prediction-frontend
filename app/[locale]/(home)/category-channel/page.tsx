"use client";
import React, { useState } from 'react';
import StickyTabsWrapper from '@components/StickyTabs';
import Search from '@ui/CustomSearch';
import CategoryChannelCard from '@ui/CategoryChannelCard';
import Header from '@ui/Header';
import Account from '@ui/Account';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import apiClient from '@api/axios'
import Link from 'next/link';
import { useDebounce } from "@uidotdev/usehooks";
import useUserStore from '@store/useUserStore';
import { stat } from 'fs';



// Fetch search results
const fetchSearchResults = async (queryKey: string) => {
  const response = await apiClient.get(`/search/displayName?q=${queryKey}`);
  return response.data;
};

export default function Page() {
  const tabs = ["내 카테고리", "탐색"];
  const [activeTab, setActiveTab] = useState(0);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [flag, setFlag] = useState('ALL'); // Default to "ALL"
  const userInfo = useUserStore(state=>state.userInfo);

    // Fetch categories b ased on the flag
const fetchMyCategories = async (flag: string) => {


  const response = await apiClient.get(`/subscriptions/user/${userInfo?.id}/following`, {
    params: { flag, isUserChannel:true  }  // Send flag as a query param
  });


  return response.data;
};
  // Toggle search bar visibility
  const handleSearchToggle = () => {
    setHeaderVisible((prev) => !prev);
    setIsSearching((prev) => !prev);
  };

  // Handle search input with debounce
  const handleSearchInput = debounce((input: string) => {
    setSearchQuery(input);
  }, 300);

  // React Query to fetch search results
  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['searchResults', debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
    staleTime: 5 * 60 * 1000,
  });

  // React Query to fetch categories for "My Category" tab with the flag
  const { data: myCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['myCategories', flag],  // Add flag to the query key
    queryFn: () => fetchMyCategories(flag), 
    enabled: !!userInfo, // Fetch categories with flag
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Tab change handler
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Change the flag based on the selected tab
    if (index === 0) {
      setFlag('ALL');  // Example: Set to "ALL" for "내 카테고리"
    } else {
      setFlag('USER');  // Example: Change to a different flag
    }
  };

  return (
    <>
      <main className="col-span-5 w-full border-x border-slate-200">
        {/* 검색 상태에 따라 헤더와 검색창 고정 */}
        <div>
          <Header title="카테고리 채널" hide={!isHeaderVisible}>
            <Search onSearchToggle={handleSearchToggle} onInput={handleSearchInput} />
          </Header>
          {!isHeaderVisible && (
            <div className="p-4 mt-2 w-full flex justify-center items-center">
              <Search onSearchToggle={handleSearchToggle} initialIsOpen={!isHeaderVisible} onInput={handleSearchInput} />
            </div>
          )}
        </div>

        {/* 검색 중이 아닐 때만 탭을 표시 */}
        {!isSearching && (
          <>
            <StickyTabsWrapper tabNames={tabs} onTabChange={handleTabChange} />

            {/* 탭에 따른 조건부 렌더링 */}
            <div className="p-4">
              {activeTab === 0 && (
                <div>
                  {isLoadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    myCategories?.content.map((category: any) => (
                      <CategoryChannelCard
                        key={category.channelId}
                        href={`/category-channel/${category.channelId}`}
                        categoryChannelName={category.channelName}
                        badge={category.isUserChannel ? 'User Channel' : 'Category'}
                        avatars={[category.channelImageUrl]} // Assuming you have a channel image
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  {/* 탐색 탭 내용 */}
                </div>
              )}
            </div>
          </>
        )}

        {/* 검색 중일 때 검색 결과 표시 */}
        {isSearching && (
          <div className="p-4">
            {isLoading ? (
              <p>검색 중...</p>
            ) : error ? (
              <p>에러 발생: {error.message}</p>
            ) : (
              searchResults?.content.map((result: any) => (
                <Link key={result.userId} href={`/channel/${result.user_id}`}>
                  <Account
                    className="px-2 py-2"
                    userName={result.user_name}
                    avatarUrl={result.avatar_img}
                    displayName={result.display_name}
                    tier={result.tier}
                  />
                </Link>
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
}