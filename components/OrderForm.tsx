"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function OrderForm() {
  return (
    <>
      <Tabs.Root
        className="flex flex-col w-full shadow-[0_2px_10px] shadow-blackA2"
        defaultValue="tab1"
      >
        <Tabs.List
          className="shrink-0 flex border-b border-mauve6"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11  data-[state=active]:shadow-current data-[state=active]:focus:relative   outline-none cursor-default data-[state=active]:bg-[#00632b] data-[state=inactive]:text-green-600  data-[state=active]:text-white"
            value="tab1"
          >
            Buy
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11  data-[state=active]:shadow-current data-[state=active]:focus:relative  outline-none cursor-default data-[state=active]:bg-[#b9554d] data-[state=inactive]:text-red-500 data-[state=active]:text-white"
            value="tab2"
          >
            Sell
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 bg-white rounded-b-md outline-none  "
          value="tab1"
        >
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="name"
            >
              Price
            </label>
            <input
              type="number"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="name"
              placeholder="0"
            />
          </fieldset>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="username"
            >
              Amount
            </label>
            <input
              type="number"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="username"
              placeholder="0"
            />
          </fieldset>
          <div className="flex w-full h-[25px] justify-between items-center relative z-[36] mt-[48.473px] mr-0 mb-0 ">
            <span className="h-[25px] shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#5a6689] relative text-left whitespace-nowrap z-[36]">
              Total
            </span>
            <div className="flex w-[77px] h-[25px] justify-between items-center shrink-0 relative z-[32]">
              <span className="h-[20px] shrink-0 font-['Inter'] text-[14px] font-semibold leading-[20px] text-[#303648] relative text-left whitespace-nowrap z-[31]">
                0.00
              </span>
              <span className="h-[20px] shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#76809d] relative text-left whitespace-nowrap z-[32]">
                point
              </span>
            </div>
          </div>
          <div className="flex w-full h-[17px] justify-between items-center relative z-[37] mt-[-4px] mr-0 mb-0 ">
            <span className="h-[15px] shrink-0 font-['Inter'] text-[12px] font-medium leading-[15px] text-[#5a6689] relative text-left whitespace-nowrap z-[37]">
              보유포인트
            </span>
            <div className="flex w-[73px] h-[17px] justify-between items-center shrink-0 relative z-[35]">
              <span className="flex w-[38px] h-[16px] justify-end items-start shrink-0 font-['Inter'] text-[12px] font-medium leading-[16px] text-[#303648] relative text-right whitespace-nowrap z-[34]">
                27000
              </span>
              <span className="flex w-[33px] h-[16px] justify-end items-start shrink-0 font-['Inter'] text-[12px] font-medium leading-[16px] text-[#76809d] relative text-right whitespace-nowrap z-[35]">
                point
              </span>
            </div>
          </div>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <div className="flex justify-end mt-1 ">
                <button className="flex w-full h-[40.215px] justify-center items-center bg-[#00632b] rounded-[4px] border-none relative z-40 pointer mt-[11.254px] mr-0 mb-0 ">
                  <span className="flex w-full h-[40.215px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#e7fbf0] relative text-center z-40">
                    Buy
                  </span>
                </button>
              </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-center">
                  주문확인
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal text-center">
                  바이든 300p 투자하시겠습니까?
                </AlertDialog.Description>
                <div className="flex justify-center gap-[25px]">
                  <AlertDialog.Cancel asChild>
                    <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Yes, delete account
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 bg-white rounded-b-md outline-none "
          value="tab2"
        >
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="name"
            >
              Price
            </label>
            <input
              type="number"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="name"
              defaultValue="0"
            />
          </fieldset>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="username"
            >
              Amount
            </label>
            <input
              type="number"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="username"
              defaultValue="0"
            />
          </fieldset>
          <div className="flex w-full h-[25px] justify-between items-center relative z-[36] mt-[48.473px] mr-0 mb-0 ">
            <span className="h-[25px] shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#5a6689] relative text-left whitespace-nowrap z-[36]">
              Total
            </span>
            <div className="flex w-[77px] h-[25px] justify-between items-center shrink-0 relative z-[32]">
              <span className="h-[20px] shrink-0 font-['Inter'] text-[14px] font-semibold leading-[20px] text-[#303648] relative text-left whitespace-nowrap z-[31]">
                0.00
              </span>
              <span className="h-[20px] shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#76809d] relative text-left whitespace-nowrap z-[32]">
                point
              </span>
            </div>
          </div>
          <div className="flex w-full h-[17px] justify-between items-center relative z-[37] mt-[-4px] mr-0 mb-0 ">
            <span className="h-[15px] shrink-0 font-['Inter'] text-[12px] font-medium leading-[15px] text-[#5a6689] relative text-left whitespace-nowrap z-[37]">
              보유포인트
            </span>
            <div className="flex w-[73px] h-[17px] justify-between items-center shrink-0 relative z-[35]">
              <span className="flex w-[38px] h-[16px] justify-end items-start shrink-0 font-['Inter'] text-[12px] font-medium leading-[16px] text-[#303648] relative text-right whitespace-nowrap z-[34]">
                27000
              </span>
              <span className="flex w-[33px] h-[16px] justify-end items-start shrink-0 font-['Inter'] text-[12px] font-medium leading-[16px] text-[#76809d] relative text-right whitespace-nowrap z-[35]">
                point
              </span>
            </div>
          </div>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <div className="flex justify-end mt-1 ">
                <button className="flex w-full h-[40.215px] justify-center items-center bg-[#b9554d] rounded-[4px] border-none relative z-40 pointer mt-[11.254px] mr-0 mb-0 ">
                  <span className="flex w-full h-[40.215px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#e7fbf0] relative text-center z-40">
                    Sell
                  </span>
                </button>
              </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-center">
                  주문확인
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal text-center">
                  바이든 300p 투자철회하시겠습니까?
                </AlertDialog.Description>
                <div className="flex justify-center gap-[25px]">
                  <AlertDialog.Cancel asChild>
                    <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Yes
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}