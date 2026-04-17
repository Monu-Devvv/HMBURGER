export default function Footer() {
    return (
       
        <footer className="mt-10 mb-16 md:mb-0
      bg-white/80 dark:bg-gray-900/80
      backdrop-blur-xl
      border-t border-orange-100 dark:border-white/10
      shadow-[0_-2px_20px_rgba(0,0,0,0.05)]">

            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center gap-2 text-center">

                {/* Brand */}
                <h2 className="text-lg font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    🍔 HMBurger
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hot. Fresh. Fast. Always.
                </p>

                {/* Divider */}
                <div className="w-16 h-px bg-gradient-to-r from-orange-400 to-red-400 rounded-full my-1" />

                {/* Credit line */}
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Designed &amp; Developed with ❤️ by{" "}
                    <span className="font-semibold text-orange-500">Harsh</span>
                    {" "}&amp;{" "}
                    <span className="font-semibold text-orange-500">Monu</span>
                </p>

                <p className="text-[10px] text-gray-300 dark:text-gray-600">
                    © {new Date().getFullYear()} HMBurger. All rights reserved.
                </p>

            </div>
        </footer>
    );
}