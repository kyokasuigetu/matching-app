import Image from "next/image";
import { UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

export function Post() {
  return (
    <div className="rounded-lg border-[1px] border-gray-200">
      {/* 社名とユーザー名 */}
      <div className="p-5 bg-black text-white rounded-t-lg">
        <div className="flex items-center gap-5">
          <Image
            className="rounded-full shadow-inner"
            src="/company-image.png"
            alt="company-image"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <h3>株式会社　架空</h3>
            <span className="text-gray-400 text-sm">仮置　太郎 / CEO</span>
          </div>
        </div>
      </div>
      {/* 本文とリンク */}
      <div className="flex flex-col gap-5 rounded-b-lg">
        <div className="p-5 space-y-5">
          <div>
            <h3 className="font-bold text-lg text-center pt-3 pb-5">
              Buy(買いたい商材・サービス)
            </h3>
            <p>
              今月中に購入したい商材やサービスを探しています。ご提案お待ちしております。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-center pt-3 pb-5">
              Sell(売りたい商材・サービス)
            </h3>
            <p>
              今月中に購入したい商材やサービスを探しています。ご提案お待ちしております。
            </p>
          </div>
        </div>
        <div className="flex w-full mt-5 rounded-b-lg overflow-hidden">
          <button className="bg-gray-400 w-full p-5 flex flex-col items-center">
            <UserIcon className="w-8 h-8" />
            <span className="mt-2">プロフィール</span>
          </button>
          <button className="bg-gray-700 w-full p-5 flex flex-col items-center text-white">
            <ChatBubbleLeftIcon className="w-8 h-8" />
            <span className="mt-2">返信する</span>
          </button>
        </div>
      </div>
    </div>
  );
}
