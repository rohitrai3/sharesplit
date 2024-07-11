import Image from "next/image";

export default function Home() {
  return (
    <div className="w-dvw h-dvh place-content-center">
      <div>
        <div className="flex justify-center mb-10">
          <Image
            src="/sharesplit_logo.svg"
            alt="ShareSplit logo"
            width={128}
            height={128}
          />
        </div>
        <div className="flex justify-center mb-10">
          <h1>Welcome to</h1>
        </div>
        <div className="flex justify-center mb-5">
          <Image
            src="/sharesplit_text.svg"
            alt="ShareSplit text"
            width={360}
            height={36}
          />
        </div>
        <div className="flex justify-center mb-20">
          <h1>Split your shares with your friends</h1>
        </div>
        <div className="flex justify-center">
          <a href="/api/auth/login">
            <button className="bg-gold-dark text-black px-6 py-3 rounded-xl font-black">
              Login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
