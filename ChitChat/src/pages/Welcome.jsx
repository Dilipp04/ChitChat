import { useLocation } from 'react-router-dom';
const Welcome = () => {
  const data = JSON.parse(localStorage.getItem("userData"))
  let location = useLocation();
  return (

    <section className={`ml-2 grow ${location.pathname == "/app" ? "hidden" : "flex"} flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-950 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20 md:flex`} >
      <div className='relative mb-8 flex h-40 w-40 items-center justify-center rounded-[2rem] bg-gradient-to-br from-cyan-100 to-indigo-100 shadow-inner dark:from-cyan-900/40 dark:to-indigo-900/40'>
        <img className='h-28 w-28 object-contain drop-shadow-xl' src="https://imgs.search.brave.com/iEk2wxUdOjyqLsfhnxiEcuDhqSIfdJ5JQIEm4LUugtM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNy9MaXZl/LUNoYXQtUE5HLUNs/aXBhcnQucG5n" alt="Live chat" />
      </div>
      <p className='text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-400'>Welcome back</p>
      <h1 className='mt-3 text-3xl font-semibold text-slate-950 dark:text-white'>Hi {data.username}</h1>
      <p className='mt-3 max-w-md text-base text-slate-600 dark:text-slate-300'>Pick a conversation from the inbox or start a new chat with someone online.</p>
    </section>
  )
}

export default Welcome
