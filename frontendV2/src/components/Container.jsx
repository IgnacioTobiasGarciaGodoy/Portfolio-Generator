import React from 'react'

const Container = ({children}) => {
  return (
    <div className="min-h-[calc(100svh-4rem)] bg-white dark:bg-[#24272C] flex items-center justify-center p-6">
      <div
        className="
                    w-[min(92vw,1100px)] border-transparent  p-8 sm:p-12 flex flex-col items-center text-center rounded-[58px]
                    bg-slate-50 
                    dark:bg-[#24272C]
                    shadow-[-5px_-5px_15px_#b8b8b8,5px_5px_15px_#ffffff]
                    dark:shadow-[-18px_-18px_36px_rgba(255,255,255,0.25),18px_18px_36px_rgba(0,0,0,0.25)]
                  "
      >
        {children}
      </div>
    </div>
  )
}

export default Container